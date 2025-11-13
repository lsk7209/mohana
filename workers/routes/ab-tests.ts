/**
 * A/B 테스트 통계 API
 */

import type { Env } from '../types'

export async function getABTests(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const abKey = url.searchParams.get('ab_key')

    let query = `
      SELECT 
        t.ab_key,
        t.id as template_id,
        COUNT(DISTINCT m.id) as sent,
        COUNT(DISTINCT CASE WHEN me.type = 'open' THEN me.id END) as opened,
        COUNT(DISTINCT CASE WHEN me.type = 'click' THEN me.id END) as clicked
      FROM templates t
      LEFT JOIN messages m ON m.template_id = t.id
      LEFT JOIN message_events me ON me.message_id = m.id
      WHERE t.ab_key IS NOT NULL
    `

    const params: string[] = []

    if (abKey) {
      query += ' AND t.ab_key = ?'
      params.push(abKey)
    }

    query += ' GROUP BY t.ab_key, t.id ORDER BY sent DESC'

    const results = await env.DB.prepare(query).bind(...params).all()

    interface ABTestRow {
      ab_key: string
      template_id: string
      sent: number
      opened: number
      clicked: number
    }

    const tests = (results.results as ABTestRow[]).map((row) => {
      const sent = row.sent || 0
      const opened = row.opened || 0
      const clicked = row.clicked || 0

      return {
        ab_key: row.ab_key,
        variant: row.template_id,
        sent,
        opened,
        clicked,
        open_rate: sent > 0 ? (opened / sent) * 100 : 0,
        click_rate: opened > 0 ? (clicked / opened) * 100 : 0,
      }
    })

    return new Response(
      JSON.stringify({ tests }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching AB tests:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleABTests = {
  list: getABTests,
}

