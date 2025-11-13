/**
 * 시퀀스 관리 API
 */

import type { Env } from '../types'

export async function run(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as {
      lead_id: string
      sequence_id: string
    }

    // 시퀀스 조회
    const sequence = await env.DB.prepare('SELECT * FROM sequences WHERE id = ?')
      .bind(body.sequence_id)
      .first()

    if (!sequence) {
      return new Response(
        JSON.stringify({ error: 'Sequence not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const steps = JSON.parse(sequence.steps as string) as Array<{
      delay_hours: number
      template_id: string
      channel: 'email' | 'sms'
    }>

    // 첫 번째 스텝 즉시 실행
    if (steps.length > 0) {
      const firstStep = steps[0]
      const runId = crypto.randomUUID()
      const scheduledAt = Date.now()

      await env.DB.prepare(
        `INSERT INTO sequence_runs (id, lead_id, sequence_id, step_index, status, scheduled_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(runId, body.lead_id, body.sequence_id, 0, 'pending', scheduledAt, scheduledAt).run()

      // Durable Object로 스케줄링 (타임아웃 30초)
      const schedulerId = env.SEQUENCE_SCHEDULER.idFromName('scheduler')
      const scheduler = env.SEQUENCE_SCHEDULER.get(schedulerId)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30초 타임아웃

      try {
        const response = await scheduler.fetch('http://internal/schedule', {
          method: 'POST',
          body: JSON.stringify({
            runId,
            leadId: body.lead_id,
            sequenceId: body.sequence_id,
            stepIndex: 0,
            delayHours: 0,
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error')
          throw new Error(`Scheduler returned ${response.status}: ${errorText}`)
        }
      } catch (fetchError) {
        clearTimeout(timeoutId)
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          throw new Error('Scheduler request timeout after 30 seconds')
        }
        throw fetchError
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error running sequence:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function list(request: Request, env: Env): Promise<Response> {
  try {
    const sequences = await env.DB.prepare('SELECT * FROM sequences ORDER BY created_at DESC').all()

    return new Response(
      JSON.stringify({ sequences: sequences.results }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing sequences:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function create(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as {
      name: string
      steps: Array<{
        delay_hours: number
        template_id: string
        channel: 'email' | 'sms'
        conditions?: {
          if_not_opened?: boolean
          if_not_clicked?: boolean
        }
      }>
    }

    const id = crypto.randomUUID()
    const now = Date.now()

    await env.DB.prepare(
      `INSERT INTO sequences (id, name, steps, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      id,
      body.name,
      JSON.stringify(body.steps),
      now,
      now
    ).run()

    const sequence = await env.DB.prepare('SELECT * FROM sequences WHERE id = ?')
      .bind(id)
      .first()

    return new Response(
      JSON.stringify({ success: true, sequence }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating sequence:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function update(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Sequence ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json() as {
      name?: string
      steps?: Array<{
        delay_hours: number
        template_id: string
        channel: 'email' | 'sms'
        conditions?: {
          if_not_opened?: boolean
          if_not_clicked?: boolean
        }
      }>
    }

    const updates: string[] = []
    const params: (string | number | null)[] = []

    if (body.name !== undefined) {
      updates.push('name = ?')
      params.push(body.name)
    }
    if (body.steps !== undefined) {
      updates.push('steps = ?')
      params.push(JSON.stringify(body.steps))
    }

    if (updates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No fields to update' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    updates.push('updated_at = ?')
    params.push(Date.now())
    params.push(id)

    await env.DB.prepare(
      `UPDATE sequences SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run()

    const sequence = await env.DB.prepare('SELECT * FROM sequences WHERE id = ?')
      .bind(id)
      .first()

    return new Response(
      JSON.stringify({ success: true, sequence }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error updating sequence:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getSequence(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Sequence ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const sequence = await env.DB.prepare('SELECT * FROM sequences WHERE id = ?')
      .bind(id)
      .first()

    if (!sequence) {
      return new Response(
        JSON.stringify({ error: 'Sequence not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(sequence),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching sequence:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getPerformance(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url)
    const sequenceId = url.searchParams.get('sequence_id')

    let query = `
      SELECT 
        s.id as sequence_id,
        s.name as sequence_name,
        COUNT(DISTINCT sr.id) as total_runs,
        COUNT(DISTINCT CASE WHEN sr.status = 'completed' THEN sr.id END) as completed,
        COUNT(DISTINCT m.id) as total_messages,
        COUNT(DISTINCT CASE WHEN me.type = 'open' THEN me.id END) as opened,
        COUNT(DISTINCT CASE WHEN me.type = 'click' THEN me.id END) as clicked
      FROM sequences s
      LEFT JOIN sequence_runs sr ON sr.sequence_id = s.id
      LEFT JOIN messages m ON m.lead_id = sr.lead_id AND m.template_id IN (
        SELECT json_extract(value, '$.template_id')
        FROM json_each(s.steps)
      )
      LEFT JOIN message_events me ON me.message_id = m.id
    `

    const params: string[] = []

    if (sequenceId) {
      query += ' WHERE s.id = ?'
      params.push(sequenceId)
    }

    query += ' GROUP BY s.id, s.name ORDER BY total_runs DESC'

    const results = await env.DB.prepare(query).bind(...params).all()

    interface PerformanceRow {
      sequence_id: string
      sequence_name: string
      total_runs: number
      completed: number
      total_messages: number
      opened: number
      clicked: number
    }

    const performance = (results.results as unknown as PerformanceRow[]).map((row) => {
      const totalRuns = row.total_runs || 0
      const completed = row.completed || 0
      const totalMessages = row.total_messages || 0
      const opened = row.opened || 0
      const clicked = row.clicked || 0

      // 전환율 계산: 클릭한 리드 수 / 총 실행 수
      const conversionRate = totalRuns > 0 ? (clicked / totalRuns) * 100 : 0

      return {
        sequence_id: row.sequence_id,
        sequence_name: row.sequence_name,
        total_runs: totalRuns,
        completed,
        total_messages: totalMessages,
        opened,
        clicked,
        conversion_rate: Math.round(conversionRate * 10) / 10,
      }
    })

    return new Response(
      JSON.stringify({ performance }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching sequence performance:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleSequences = {
  run,
  list,
  create,
  update,
  getSequence,
  getPerformance,
}

