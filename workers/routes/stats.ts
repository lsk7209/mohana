/**
 * 통계 API
 */

import type { Env } from '../types'

export async function getDailyStats(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const days = parseInt(url.searchParams.get('days') || '7')

    const now = Date.now()
    const startDate = now - days * 24 * 60 * 60 * 1000

    // 일별 리드 수
    const leadsByDate = await env.DB.prepare(
      `SELECT 
        DATE(created_at / 1000, 'unixepoch') as date,
        COUNT(*) as count
       FROM leads
       WHERE created_at >= ?
       GROUP BY date
       ORDER BY date ASC`
    ).bind(startDate).all()

    // 일별 메시지 발송 수
    const messagesByDate = await env.DB.prepare(
      `SELECT 
        DATE(created_at / 1000, 'unixepoch') as date,
        COUNT(*) as count
       FROM messages
       WHERE created_at >= ?
       GROUP BY date
       ORDER BY date ASC`
    ).bind(startDate).all()

    // 일별 오픈 수
    const opensByDate = await env.DB.prepare(
      `SELECT 
        DATE(ts / 1000, 'unixepoch') as date,
        COUNT(*) as count
       FROM message_events
       WHERE type = 'open' AND ts >= ?
       GROUP BY date
       ORDER BY date ASC`
    ).bind(startDate).all()

    // 일별 클릭 수
    const clicksByDate = await env.DB.prepare(
      `SELECT 
        DATE(ts / 1000, 'unixepoch') as date,
        COUNT(*) as count
       FROM message_events
       WHERE type = 'click' AND ts >= ?
       GROUP BY date
       ORDER BY date ASC`
    ).bind(startDate).all()

    // 날짜별로 데이터 병합
    const dateMap = new Map<string, {
      date: string
      leads: number
      emails: number
      opens: number
      clicks: number
    }>()

    // 모든 날짜 수집
    interface DateCountRow {
      date: string
      count: number
    }

    const allDates = new Set<string>()
    ;(leadsByDate.results as unknown as DateCountRow[]).forEach((r) => allDates.add(r.date))
    ;(messagesByDate.results as unknown as DateCountRow[]).forEach((r) => allDates.add(r.date))
    ;(opensByDate.results as unknown as DateCountRow[]).forEach((r) => allDates.add(r.date))
    ;(clicksByDate.results as unknown as DateCountRow[]).forEach((r) => allDates.add(r.date))

    // 날짜별 데이터 초기화
    allDates.forEach(date => {
      dateMap.set(date, {
        date,
        leads: 0,
        emails: 0,
        opens: 0,
        clicks: 0,
      })
    })

    // 데이터 채우기
    ;(leadsByDate.results as unknown as DateCountRow[]).forEach((r) => {
      const entry = dateMap.get(r.date)
      if (entry) entry.leads = r.count
    })

    ;(messagesByDate.results as unknown as DateCountRow[]).forEach((r) => {
      const entry = dateMap.get(r.date)
      if (entry) entry.emails = r.count
    })

    ;(opensByDate.results as unknown as DateCountRow[]).forEach((r) => {
      const entry = dateMap.get(r.date)
      if (entry) entry.opens = r.count
    })

    ;(clicksByDate.results as unknown as DateCountRow[]).forEach((r) => {
      const entry = dateMap.get(r.date)
      if (entry) entry.clicks = r.count
    })

    const data = Array.from(dateMap.values()).sort((a, b) => 
      a.date.localeCompare(b.date)
    )

    return new Response(
      JSON.stringify({ data }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching daily stats:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: errorMessage
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getOverviewStats(request: Request, env: Env): Promise<Response> {
  try {
    // 전체 리드 수
    const totalLeads = await env.DB.prepare('SELECT COUNT(*) as count FROM leads')
      .first<{ count: number }>()

    // 신규 리드 (오늘)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStart = today.getTime()
    const newLeads = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM leads WHERE created_at >= ?'
    ).bind(todayStart).first<{ count: number }>()

    // 핫리드 (스코어 10 이상)
    const hotLeads = await env.DB.prepare(
      `SELECT COUNT(*) as count 
       FROM lead_scores 
       WHERE score >= 10 
       AND lead_id IN (SELECT id FROM leads WHERE status IN ('new', 'in_progress'))`
    ).first<{ count: number }>()

    // 총 메시지 발송 수
    const totalMessages = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM messages WHERE status = 'sent'"
    ).first<{ count: number }>()

    // 오픈율 계산
    const openCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM message_events WHERE type = 'open'"
    ).first<{ count: number }>()

    const openRate = totalMessages && totalMessages.count > 0
      ? (openCount?.count || 0) / totalMessages.count * 100
      : 0

    // 클릭율 계산
    const clickCount = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM message_events WHERE type = 'click'"
    ).first<{ count: number }>()

    const clickRate = openCount && openCount.count > 0
      ? (clickCount?.count || 0) / openCount.count * 100
      : 0

    return new Response(
      JSON.stringify({
        totalLeads: totalLeads?.count || 0,
        newLeads: newLeads?.count || 0,
        hotLeads: hotLeads?.count || 0,
        totalMessages: totalMessages?.count || 0,
        openRate: Math.round(openRate * 10) / 10,
        clickRate: Math.round(clickRate * 10) / 10,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching overview stats:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: errorMessage
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleStats = {
  daily: getDailyStats,
  overview: getOverviewStats,
}

