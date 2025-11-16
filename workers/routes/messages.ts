/**
 * 메시지 발송 API
 */

import { createMessage, isUnsubscribed } from '../lib/db'
import type { Env } from '../types'

async function sendEmail(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as {
      lead_id: string
      template_id?: string
      subject: string
      body: string
      to: string
    }

    // 구독 해지 확인
    const unsubscribed = await isUnsubscribed(env, body.to)
    if (unsubscribed) {
      return new Response(
        JSON.stringify({ error: 'Email is unsubscribed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 메시지 생성
    const message = await createMessage(env, {
      lead_id: body.lead_id,
      channel: 'email',
      template_id: body.template_id,
      subject: body.subject,
      body_rendered: body.body,
      status: 'pending',
    })

    // 큐에 추가
    await env.EMAIL_QUEUE.send({
      messageId: message.id,
      to: body.to,
      subject: body.subject,
      body: body.body,
    })

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function sendSMS(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as {
      lead_id: string
      template_id?: string
      body: string
      to: string
    }

    // 메시지 생성
    const message = await createMessage(env, {
      lead_id: body.lead_id,
      channel: 'sms',
      template_id: body.template_id,
      body_rendered: body.body,
      status: 'pending',
    })

    // 큐에 추가
    await env.SMS_QUEUE.send({
      messageId: message.id,
      to: body.to,
      body: body.body,
    })

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending SMS:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function getMessages(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const leadId = url.pathname.split('/').pop()

  if (!leadId) {
    return new Response('Lead ID required', { status: 400 })
  }

  try {
    const messages = await env.DB.prepare(
      'SELECT * FROM messages WHERE lead_id = ? ORDER BY created_at DESC'
    ).bind(leadId).all()

    return new Response(
      JSON.stringify({ messages: messages.results }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function getMessage(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const messageId = url.pathname.split('/').pop()

  if (!messageId) {
    return new Response('Message ID required', { status: 400 })
  }

  try {
    const message = await env.DB.prepare(
      'SELECT * FROM messages WHERE id = ?'
    ).bind(messageId).first()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 이벤트 조회
    const events = await env.DB.prepare(
      'SELECT * FROM message_events WHERE message_id = ? ORDER BY ts DESC'
    ).bind(messageId).all()

    return new Response(
      JSON.stringify({
        message,
        events: events.results,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching message:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function listMessages(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const channelFilter = url.searchParams.get('channel')
  const statusFilter = url.searchParams.get('status')
  const searchQuery = url.searchParams.get('search')
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  try {
    let query = `
      SELECT m.*,
             l.name as lead_name,
             l.email as lead_email,
             l.company as lead_company,
             (SELECT COUNT(*) FROM message_events WHERE message_id = m.id AND type = 'open') as open_count,
             (SELECT COUNT(*) FROM message_events WHERE message_id = m.id AND type = 'click') as click_count
      FROM messages m
      LEFT JOIN leads l ON m.lead_id = l.id
      WHERE 1=1
    `
    const params: (string | number)[] = []

    if (channelFilter && channelFilter !== 'all') {
      query += ` AND m.channel = ?`
      params.push(channelFilter)
    }
    if (statusFilter && statusFilter !== 'all') {
      query += ` AND m.status = ?`
      params.push(statusFilter)
    }
    if (searchQuery) {
      query += ` AND (l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ? OR m.subject LIKE ? OR m.body_text LIKE ?)`
      const searchParam = `%${searchQuery}%`
      params.push(searchParam, searchParam, searchParam, searchParam, searchParam)
    }

    query += ` ORDER BY m.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const { results: messages } = await env.DB.prepare(query).bind(...params).all()

    // 전체 개수 조회
    let countQuery = `SELECT COUNT(*) as total FROM messages m LEFT JOIN leads l ON m.lead_id = l.id WHERE 1=1`
    const countParams: (string | number)[] = []
    if (channelFilter && channelFilter !== 'all') {
      countQuery += ` AND m.channel = ?`
      countParams.push(channelFilter)
    }
    if (statusFilter && statusFilter !== 'all') {
      countQuery += ` AND m.status = ?`
      countParams.push(statusFilter)
    }
    if (searchQuery) {
      countQuery += ` AND (l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ? OR m.subject LIKE ? OR m.body_text LIKE ?)`
      const searchParam = `%${searchQuery}%`
      countParams.push(searchParam, searchParam, searchParam, searchParam, searchParam)
    }
    const { results: countResult } = await env.DB.prepare(countQuery).bind(...countParams).first<{ total: number }>()
    const total = countResult?.total || 0

    return new Response(
      JSON.stringify({ messages, total }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing messages:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleMessages = {
  sendEmail,
  sendSMS,
  getMessages,
  getMessage,
  listMessages,
}

