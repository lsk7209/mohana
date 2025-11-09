/**
 * Cron 작업 처리
 */

import type { Env } from './types'

export async function handleCron(
  event: ScheduledEvent,
  env: Env,
  ctx: ExecutionContext
): Promise<void> {
  const cronPattern = event.cron

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
  }
}

async function retryFailedMessages(env: Env): Promise<void> {
  // 실패한 메시지 조회 (최근 1시간 내)
  const failed = await env.DB.prepare(
    `SELECT * FROM messages 
     WHERE status = 'failed' 
     AND created_at > ? 
     ORDER BY created_at ASC 
     LIMIT 100`
  ).bind(Date.now() - 60 * 60 * 1000).all()

  for (const msg of failed.results as any[]) {
    // 재시도 큐에 추가
    await env.RETRY_QUEUE.send({
      messageId: msg.id,
      channel: msg.channel,
      retryCount: (msg.meta ? JSON.parse(msg.meta).retryCount : 0) + 1,
    })
  }
}

async function processSequenceSteps(env: Env): Promise<void> {
  // 예약된 시퀀스 스텝 조회
  const scheduled = await env.DB.prepare(
    `SELECT * FROM sequence_runs 
     WHERE status = 'pending' 
     AND scheduled_at <= ? 
     ORDER BY scheduled_at ASC 
     LIMIT 100`
  ).bind(Date.now()).all()

  for (const run of scheduled.results as any[]) {
    // Durable Object로 처리 요청
    const schedulerId = env.SEQUENCE_SCHEDULER.idFromName('scheduler')
    const scheduler = env.SEQUENCE_SCHEDULER.get(schedulerId)
    await scheduler.fetch('http://internal/execute', {
      method: 'POST',
      body: JSON.stringify({
        runId: run.id,
        leadId: run.lead_id,
        sequenceId: run.sequence_id,
        stepIndex: run.step_index,
      }),
    })
  }

  // 리드 스코어링 자동화
  const { checkInactiveLeads, checkUnopenedEmails } = await import('./lib/lead-scoring')
  await checkInactiveLeads(env)
  await checkUnopenedEmails(env)
}

async function aggregateDailyStats(env: Env): Promise<void> {
  // 일별 통계 집계 (간단한 예시)
  // 실제로는 별도 집계 테이블에 저장
  console.log('Aggregating daily stats...')
  // TODO: 구현
}

async function checkLinkHealth(env: Env): Promise<void> {
  // 링크 헬스 체크
  console.log('Checking link health...')
  // TODO: 구현
}

