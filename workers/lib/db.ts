/**
 * D1 Database 헬퍼 함수
 */

import type { Env, Lead, Message, MessageEvent } from '../types'

export async function createLead(env: Env, lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
  const id = crypto.randomUUID()
  const created_at = Date.now()

  await env.DB.prepare(
    `INSERT INTO leads (id, created_at, company, name, email, phone, headcount, theme, memo, status, tags, owner, last_activity_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    created_at,
    lead.company || null,
    lead.name || null,
    lead.email,
    lead.phone || null,
    lead.headcount || null,
    lead.theme || null,
    lead.memo || null,
    lead.status || 'new',
    lead.tags || null,
    lead.owner || null,
    created_at
  ).run()

  // 초기 리드 스코어 생성
  await env.DB.prepare(
    `INSERT INTO lead_scores (lead_id, score, updated_at) VALUES (?, 0, ?)`
  ).bind(id, created_at).run()

  // 리드 이벤트 기록
  await env.DB.prepare(
    `INSERT INTO lead_events (id, lead_id, type, meta, ts) VALUES (?, ?, ?, ?, ?)`
  ).bind(crypto.randomUUID(), id, 'created', JSON.stringify({ source: 'form' }), created_at).run()

  return {
    id,
    created_at,
    ...lead,
    status: lead.status || 'new',
  }
}

export async function getLead(env: Env, id: string): Promise<Lead | null> {
  const result = await env.DB.prepare('SELECT * FROM leads WHERE id = ?').bind(id).first<Lead>()
  return result || null
}

export async function getLeadByEmail(env: Env, email: string): Promise<Lead | null> {
  const result = await env.DB.prepare('SELECT * FROM leads WHERE email = ? ORDER BY created_at DESC LIMIT 1')
    .bind(email)
    .first<Lead>()
  return result || null
}

export async function updateLeadStatus(
  env: Env,
  id: string,
  status: Lead['status'],
  owner?: string
): Promise<void> {
  await env.DB.prepare(
    `UPDATE leads SET status = ?, owner = ?, last_activity_at = ? WHERE id = ?`
  ).bind(status, owner || null, Date.now(), id).run()

  // 이벤트 기록
  await env.DB.prepare(
    `INSERT INTO lead_events (id, lead_id, type, meta, ts) VALUES (?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    id,
    'status_changed',
    JSON.stringify({ status, owner }),
    Date.now()
  ).run()
}

export async function createMessage(env: Env, message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
  const id = crypto.randomUUID()
  const created_at = Date.now()

  await env.DB.prepare(
    `INSERT INTO messages (id, lead_id, channel, template_id, subject, body_rendered, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    message.lead_id,
    message.channel,
    message.template_id || null,
    message.subject || null,
    message.body_rendered,
    message.status || 'pending',
    created_at
  ).run()

  return {
    id,
    created_at,
    ...message,
    status: message.status || 'pending',
  }
}

export async function recordMessageEvent(
  env: Env,
  event: Omit<MessageEvent, 'id' | 'ts'>
): Promise<void> {
  const id = crypto.randomUUID()
  const ts = Date.now()

  await env.DB.prepare(
    `INSERT INTO message_events (id, message_id, type, meta, ts, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    event.message_id,
    event.type,
    event.meta || null,
    ts,
    event.ip_address || null,
    event.user_agent || null
  ).run()

  // 리드 스코어 업데이트
  const message = await env.DB.prepare('SELECT lead_id FROM messages WHERE id = ?')
    .bind(event.message_id)
    .first<{ lead_id: string }>()

  if (message) {
    const scoreDelta = event.type === 'open' ? 1 : event.type === 'click' ? 3 : event.type === 'reply' ? 5 : 0
    if (scoreDelta > 0) {
      const { updateLeadScore } = await import('./lead-scoring')
      await updateLeadScore(env, message.lead_id, scoreDelta)
    }

    // 리드 활동 시간 업데이트
    await env.DB.prepare(
      `UPDATE leads SET last_activity_at = ? WHERE id = ?`
    ).bind(ts, message.lead_id).run()
  }
}

export async function isUnsubscribed(env: Env, email: string): Promise<boolean> {
  const result = await env.DB.prepare('SELECT email FROM unsubscribes WHERE email = ?')
    .bind(email.toLowerCase())
    .first<{ email: string }>()
  return !!result
}

export async function unsubscribe(env: Env, email: string, reason?: string): Promise<void> {
  await env.DB.prepare(
    `INSERT OR REPLACE INTO unsubscribes (email, reason, unsubscribed_at) VALUES (?, ?, ?)`
  ).bind(email.toLowerCase(), reason || null, Date.now()).run()
}

