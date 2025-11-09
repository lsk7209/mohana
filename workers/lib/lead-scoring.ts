/**
 * 리드 스코어링 자동화 로직
 */

import type { Env } from '../types'

export async function updateLeadScore(env: Env, leadId: string, delta: number): Promise<void> {
  await env.DB.prepare(
    `UPDATE lead_scores SET score = score + ?, updated_at = ? WHERE lead_id = ?`
  ).bind(delta, Date.now(), leadId).run()

  // 핫리드 체크 (10점 이상)
  const score = await env.DB.prepare('SELECT score FROM lead_scores WHERE lead_id = ?')
    .bind(leadId)
    .first<{ score: number }>()

  if (score && score.score >= 10) {
    // 핫리드 태그 추가
    const lead = await env.DB.prepare('SELECT tags FROM leads WHERE id = ?')
      .bind(leadId)
      .first<{ tags: string | null }>()

    const tags = lead?.tags ? lead.tags.split(',') : []
    if (!tags.includes('hot')) {
      tags.push('hot')
      await env.DB.prepare('UPDATE leads SET tags = ? WHERE id = ?')
        .bind(tags.join(','), leadId).run()

      // TODO: Slack 알림 (webhook)
      // await notifyHotLead(env, leadId)
    }
  }
}

export async function checkInactiveLeads(env: Env): Promise<void> {
  // 7일 이상 활동이 없는 리드 스코어 감소
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000

  const inactive = await env.DB.prepare(
    `SELECT id FROM leads 
     WHERE last_activity_at < ? 
     AND status IN ('new', 'in_progress')`
  ).bind(sevenDaysAgo).all()

  for (const lead of inactive.results as any[]) {
    await env.DB.prepare(
      `UPDATE lead_scores SET score = GREATEST(score - 2, 0), updated_at = ? WHERE lead_id = ?`
    ).bind(Date.now(), lead.id).run()
  }
}

export async function checkUnopenedEmails(env: Env): Promise<void> {
  // 48시간 이상 오픈하지 않은 이메일 리마인더
  const twoDaysAgo = Date.now() - 48 * 60 * 60 * 1000

  const unopened = await env.DB.prepare(
    `SELECT DISTINCT m.lead_id, l.email, l.phone
     FROM messages m
     JOIN leads l ON m.lead_id = l.id
     WHERE m.channel = 'email'
     AND m.status = 'sent'
     AND m.sent_at < ?
     AND m.id NOT IN (
       SELECT message_id FROM message_events WHERE type = 'open'
     )
     AND m.lead_id NOT IN (
       SELECT lead_id FROM messages 
       WHERE channel = 'sms' 
       AND created_at > m.sent_at
       AND body_rendered LIKE '%리마인더%'
     )`
  ).bind(twoDaysAgo).all()

  // SMS 리마인더 발송 (큐에 추가)
  for (const item of unopened.results as any[]) {
    if (item.phone) {
      const messageId = crypto.randomUUID()
      await env.DB.prepare(
        `INSERT INTO messages (id, lead_id, channel, body_rendered, status, created_at)
         VALUES (?, ?, 'sms', ?, 'pending', ?)`
      ).bind(
        messageId,
        item.lead_id,
        `안녕하세요. 이전에 보내드린 이메일을 확인해주시면 감사하겠습니다. 문의사항이 있으시면 언제든 연락주세요.`,
        Date.now()
      ).run()

      await env.SMS_QUEUE.send({
        messageId,
        to: item.phone,
        body: `안녕하세요. 이전에 보내드린 이메일을 확인해주시면 감사하겠습니다. 문의사항이 있으시면 언제든 연락주세요.`,
      })
    }
  }
}

