/**
 * Admin API (리드 관리)
 */

import { getLead as getLeadFromDb, updateLeadStatus } from '../lib/db'
import type { Env, Lead } from '../types'

export async function getLead(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const leadId = url.pathname.split('/').pop()

  if (!leadId) {
    return new Response('Lead ID required', { status: 400 })
  }

  try {
    const lead = await getLeadFromDb(env, leadId)

    if (!lead) {
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 타임라인 조회 (이벤트 + 메시지)
    const events = await env.DB.prepare(
      `SELECT * FROM lead_events WHERE lead_id = ? ORDER BY ts DESC LIMIT 50`
    ).bind(leadId).all()

    const messages = await env.DB.prepare(
      `SELECT m.*, 
       (SELECT COUNT(*) FROM message_events WHERE message_id = m.id AND type = 'open') as open_count,
       (SELECT COUNT(*) FROM message_events WHERE message_id = m.id AND type = 'click') as click_count
       FROM messages m WHERE m.lead_id = ? ORDER BY m.created_at DESC`
    ).bind(leadId).all()

    const score = await env.DB.prepare(
      'SELECT * FROM lead_scores WHERE lead_id = ?'
    ).bind(leadId).first()

    return new Response(
      JSON.stringify({
        lead,
        timeline: {
          events: events.results,
          messages: messages.results,
        },
        score: score || { score: 0 },
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching lead:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function listLeads(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const search = url.searchParams.get('search')
  const limit = parseInt(url.searchParams.get('limit') || '50')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  try {
    let query = 'SELECT * FROM leads WHERE 1=1'
    const params: (string | number)[] = []

    if (status && status !== 'all') {
      query += ' AND status = ?'
      params.push(status)
    }

    if (search) {
      query += ' AND (company LIKE ? OR name LIKE ? OR email LIKE ?)'
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    // 전체 개수 조회 (페이징용)
    let countQuery = 'SELECT COUNT(*) as total FROM leads WHERE 1=1'
    const countParams: (string | number)[] = []

    if (status && status !== 'all') {
      countQuery += ' AND status = ?'
      countParams.push(status)
    }

    if (search) {
      countQuery += ' AND (company LIKE ? OR name LIKE ? OR email LIKE ?)'
      const searchPattern = `%${search}%`
      countParams.push(searchPattern, searchPattern, searchPattern)
    }

    const totalResult = await env.DB.prepare(countQuery).bind(...countParams).first<{ total: number }>()
    const total = totalResult?.total || 0

    const leads = await env.DB.prepare(query).bind(...params).all()

    return new Response(
      JSON.stringify({ leads: leads.results, total }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing leads:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: errorMessage,
        details: process.env.ENVIRONMENT === 'development' ? String(error) : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function updateLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const leadId = url.pathname.split('/').pop()

  if (!leadId) {
    return new Response('Lead ID required', { status: 400 })
  }

  try {
    const body = await request.json() as {
      status?: string
      owner?: string
      memo?: string
      tags?: string
    }

    if (body.status) {
      await updateLeadStatus(env, leadId, body.status as Lead['status'], body.owner)
    }

    if (body.memo || body.tags) {
      await env.DB.prepare(
        `UPDATE leads SET memo = COALESCE(?, memo), tags = COALESCE(?, tags), last_activity_at = ? WHERE id = ?`
      ).bind(body.memo || null, body.tags || null, Date.now(), leadId).run()
    }

    const updated = await getLeadFromDb(env, leadId)

    return new Response(
      JSON.stringify({ success: true, lead: updated }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error updating lead:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleAdmin = {
  getLead,
  listLeads,
  updateLead,
}

