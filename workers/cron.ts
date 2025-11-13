/**
 * Cron 작업 처리
 */

import type { Env, Message } from './types'
import { logError } from './lib/error-handler'

export async function handleCron(
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext
): Promise<void> {
  const cronPattern = event.cron

  try {
    if (cronPattern === '*/5 * * * *') {
      // Queue 재시도 (5분마다)
      await retryFailedMessages(env)
    } else if (cronPattern === '0 * * * *') {
      // 시퀀스 스텝 스케줄링 (시간당)
      await processSequenceSteps(env)
    } else if (cronPattern === '5 0 * * *') {
      // 집계 ETL (매일 00:05)
      await aggregateDailyStats(env)
    } else if (cronPattern === '15 0 * * 1') {
      // 링크 헬스 체크 (매주 월요일 00:15)
      await checkLinkHealth(env)
    } else {
      console.warn(`Unknown cron pattern: ${cronPattern}`)
    }
  } catch (error) {
    logError(`Cron job failed: ${cronPattern}`, error, {
      cronPattern,
      scheduledTime: event.scheduledTime,
    })
    // 에러를 다시 throw하지 않음 - 크론 작업이 실패해도 다음 실행에 영향 없도록
  }
}

async function retryFailedMessages(env: Env): Promise<void> {
  try {
    // 실패한 메시지 조회 (최근 1시간 내)
    const failed = await env.DB.prepare(
      `SELECT * FROM messages 
       WHERE status = 'failed' 
       AND created_at > ? 
       ORDER BY created_at ASC 
       LIMIT 100`
    ).bind(Date.now() - 60 * 60 * 1000).all()

    let retryCount = 0
    const maxRetries = 3

    for (const msgResult of failed.results) {
      const msg = msgResult as unknown as Message
      
      // KV에서 재시도 횟수 확인
      const retryKey = `retry_count:${msg.id}`
      let currentRetryCount = 0
      try {
        const retryData = await env.RATE_LIMIT.get(retryKey)
        if (retryData) {
          currentRetryCount = parseInt(retryData, 10) || 0
        }
      } catch (e) {
        console.warn(`Failed to get retry count for message ${msg.id}:`, e)
      }

      if (currentRetryCount >= maxRetries) {
        console.log(`Message ${msg.id} exceeded max retries (${currentRetryCount}), skipping`)
        continue
      }

      // 재시도 큐에 추가
      await env.RETRY_QUEUE.send({
        messageId: msg.id,
        channel: msg.channel,
        retryCount: currentRetryCount + 1,
      })

      // 재시도 횟수 업데이트 (24시간 TTL)
      await env.RATE_LIMIT.put(retryKey, String(currentRetryCount + 1), {
        expirationTtl: 24 * 60 * 60, // 24시간
      })

      retryCount++
    }

    if (retryCount > 0) {
      console.log(`Queued ${retryCount} failed messages for retry`)
    }
  } catch (error) {
    logError('retryFailedMessages', error)
    throw error
  }
}

async function processSequenceSteps(env: Env): Promise<void> {
  try {
    // 예약된 시퀀스 스텝 조회
    const scheduled = await env.DB.prepare(
      `SELECT * FROM sequence_runs 
       WHERE status = 'pending' 
       AND scheduled_at <= ? 
       ORDER BY scheduled_at ASC 
       LIMIT 100`
    ).bind(Date.now()).all()

    let processedCount = 0

    for (const runResult of scheduled.results) {
      const run = runResult as unknown as {
        id: string
        lead_id: string
        sequence_id: string
        step_index: number
      }

      try {
        // Durable Object로 처리 요청
        const schedulerId = env.SEQUENCE_SCHEDULER.idFromName('scheduler')
        const scheduler = env.SEQUENCE_SCHEDULER.get(schedulerId)
        
        const response = await scheduler.fetch('http://internal/execute', {
          method: 'POST',
          body: JSON.stringify({
            runId: run.id,
            leadId: run.lead_id,
            sequenceId: run.sequence_id,
            stepIndex: run.step_index,
          }),
        })

        if (!response.ok) {
          throw new Error(`Scheduler returned ${response.status}`)
        }

        processedCount++
      } catch (error) {
        logError('processSequenceSteps - individual step', error, {
          runId: run.id,
          leadId: run.lead_id,
          sequenceId: run.sequence_id,
        })
        // 개별 스텝 실패는 계속 진행
      }
    }

    if (processedCount > 0) {
      console.log(`Processed ${processedCount} sequence steps`)
    }

    // 리드 스코어링 자동화
    try {
      const { checkInactiveLeads, checkUnopenedEmails } = await import('./lib/lead-scoring')
      await checkInactiveLeads(env)
      await checkUnopenedEmails(env)
    } catch (error) {
      logError('processSequenceSteps - lead scoring', error)
      // 리드 스코어링 실패는 전체 작업을 중단하지 않음
    }
  } catch (error) {
    logError('processSequenceSteps', error)
    throw error
  }
}

async function aggregateDailyStats(env: Env): Promise<void> {
  try {
    console.log('Aggregating daily stats...')
    
    // 어제 날짜 계산
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)
    const yesterdayStart = yesterday.getTime()
    const yesterdayEnd = yesterdayStart + 24 * 60 * 60 * 1000 - 1

    // 어제 리드 수 집계
    const leadsCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM leads WHERE created_at >= ? AND created_at <= ?'
    ).bind(yesterdayStart, yesterdayEnd).first<{ count: number }>()

    // 어제 메시지 발송 수 집계
    const messagesCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM messages WHERE created_at >= ? AND created_at <= ? AND status = 'sent'"
    ).bind(yesterdayStart, yesterdayEnd).first<{ count: number }>()

    // 어제 오픈 수 집계
    const opensCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM message_events WHERE type = 'open' AND ts >= ? AND ts <= ?"
    ).bind(yesterdayStart, yesterdayEnd).first<{ count: number }>()

    // 어제 클릭 수 집계
    const clicksCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM message_events WHERE type = 'click' AND ts >= ? AND ts <= ?"
    ).bind(yesterdayStart, yesterdayEnd).first<{ count: number }>()

    // 통계를 KV에 캐시 (30일간 보관)
    const dateKey = yesterday.toISOString().split('T')[0]
    const stats = {
      date: dateKey,
      leads: leadsCount?.count || 0,
      messages: messagesCount?.count || 0,
      opens: opensCount?.count || 0,
      clicks: clicksCount?.count || 0,
      openRate: messagesCount && messagesCount.count > 0 
        ? ((opensCount?.count || 0) / messagesCount.count * 100).toFixed(2)
        : '0.00',
      clickRate: opensCount && opensCount.count > 0
        ? ((clicksCount?.count || 0) / opensCount.count * 100).toFixed(2)
        : '0.00',
    }

    await env.CACHE.put(`daily_stats:${dateKey}`, JSON.stringify(stats), {
      expirationTtl: 30 * 24 * 60 * 60, // 30일
    })

    console.log(`Daily stats aggregated for ${dateKey}:`, stats)
  } catch (error) {
    logError('aggregateDailyStats', error)
    throw error
  }
}

async function checkLinkHealth(env: Env): Promise<void> {
  try {
    console.log('Checking link health...')
    
    // 최근 30일간 클릭된 링크 조회 (meta 필드에서 URL 추출)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    
    const clickedEvents = await env.DB.prepare(
      `SELECT DISTINCT meta 
       FROM message_events 
       WHERE type = 'click' 
       AND meta IS NOT NULL
       AND ts >= ?
       LIMIT 100`
    ).bind(thirtyDaysAgo).all()

    const uniqueUrls = new Set<string>()

    // meta에서 URL 추출
    for (const eventResult of clickedEvents.results) {
      const event = eventResult as unknown as { meta: string }
      try {
        const meta = JSON.parse(event.meta) as { url?: string }
        if (meta.url && typeof meta.url === 'string') {
          uniqueUrls.add(meta.url)
        }
      } catch (e) {
        // JSON 파싱 실패는 무시
        console.warn('Failed to parse event meta:', e)
      }
    }

    let healthyCount = 0
    let brokenCount = 0
    const brokenLinks: string[] = []

    for (const url of uniqueUrls) {
      if (!url || url.startsWith('http://internal/')) {
        continue // 내부 링크는 체크하지 않음
      }

      try {
        // HEAD 요청으로 링크 상태 확인 (타임아웃 5초)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LinkHealthCheck/1.0)',
          },
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          healthyCount++
        } else {
          brokenCount++
          brokenLinks.push(url)
        }
      } catch (error) {
        // 네트워크 에러나 타임아웃은 broken으로 간주
        brokenCount++
        brokenLinks.push(url)
        console.warn(`Link health check failed for ${url}:`, error)
      }
    }

    if (brokenCount > 0) {
      console.warn(`Found ${brokenCount} broken links out of ${healthyCount + brokenCount} checked`)
      // 프로덕션에서는 알림 시스템으로 전송 (예: Slack, Email)
      // await sendAlert({ brokenLinks, count: brokenCount })
    } else if (uniqueUrls.size > 0) {
      console.log(`All ${healthyCount} checked links are healthy`)
    } else {
      console.log('No links to check')
    }
  } catch (error) {
    logError('checkLinkHealth', error)
    // 링크 헬스 체크 실패는 전체 시스템에 영향 없도록 에러를 throw하지 않음
  }
}

