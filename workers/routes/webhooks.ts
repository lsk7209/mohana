/**
 * 웹훅 처리 (바운스, 전달 등)
 */

import type { Env } from '../types'

export async function handleBounce(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json<{
      messageId?: string
      email?: string
      reason?: string
      type?: 'bounce' | 'complaint' | 'delivery'
    }>()

    // 메시지 ID로 찾기
    let messageId = body.messageId

    if (!messageId && body.email) {
      const message = await env.DB.prepare(
        'SELECT id FROM messages WHERE body_rendered LIKE ? ORDER BY created_at DESC LIMIT 1'
      ).bind(`%${body.email}%`).first<{ id: string }>()

      messageId = message?.id
    }

    if (messageId) {
      // 메시지 상태 업데이트
      await env.DB.prepare(
        `UPDATE messages SET status = 'bounced', error = ? WHERE id = ?`
      ).bind(body.reason || 'Bounced', messageId).run()

      // 이벤트 기록
      await env.DB.prepare(
        `INSERT INTO message_events (id, message_id, type, meta, ts)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(
        crypto.randomUUID(),
        messageId,
        'bounce',
        JSON.stringify({ reason: body.reason, type: body.type }),
        Date.now()
      ).run()

      // 리드 이메일 구독 해지 (hard bounce인 경우)
      if (body.type === 'bounce' && body.email) {
        const lead = await env.DB.prepare(
          'SELECT id FROM leads WHERE email = ? LIMIT 1'
        ).bind(body.email.toLowerCase()).first<{ id: string }>()

        if (lead) {
          await env.DB.prepare(
            `INSERT OR REPLACE INTO unsubscribes (email, reason, unsubscribed_at)
             VALUES (?, ?, ?)`
          ).bind(body.email.toLowerCase(), 'bounced', Date.now()).run()
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error handling bounce:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function handleDelivery(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json<{
      messageId?: string
      email?: string
    }>()

    let messageId = body.messageId

    if (!messageId && body.email) {
      const message = await env.DB.prepare(
        'SELECT id FROM messages WHERE body_rendered LIKE ? ORDER BY created_at DESC LIMIT 1'
      ).bind(`%${body.email}%`).first<{ id: string }>()

      messageId = message?.id
    }

    if (messageId) {
      // 메시지 상태 업데이트
      await env.DB.prepare(
        `UPDATE messages SET status = 'delivered' WHERE id = ?`
      ).bind(messageId).run()

      // 이벤트 기록
      await env.DB.prepare(
        `INSERT INTO message_events (id, message_id, type, ts)
         VALUES (?, ?, 'delivery', ?)`
      ).bind(crypto.randomUUID(), messageId, Date.now()).run()
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error handling delivery:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export const handleWebhooks = {
  bounce: handleBounce,
  delivery: handleDelivery,
}

