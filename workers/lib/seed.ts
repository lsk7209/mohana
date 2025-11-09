/**
 * 초기 데이터 시드 (기본 템플릿 및 웰컴 시퀀스)
 */

import type { Env } from '../types'

export async function seedInitialData(env: Env): Promise<void> {
  // 기본 템플릿이 이미 있는지 확인
  const existingTemplates = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM templates WHERE name LIKE '웰컴%'"
  ).first<{ count: number }>()

  if (existingTemplates && existingTemplates.count > 0) {
    console.log('Initial templates already exist, skipping seed')
    return
  }

  const now = Date.now()

  // 웰컴 이메일 템플릿
  const welcomeEmailId = crypto.randomUUID()
  await env.DB.prepare(
    `INSERT INTO templates (id, channel, name, subject, body, created_at, updated_at)
     VALUES (?, 'email', ?, ?, ?, ?, ?)`
  ).bind(
    welcomeEmailId,
    '웰컴 이메일',
    '{{company}}님, 힐링워크에 관심을 가져주셔서 감사합니다!',
    `안녕하세요 {{lead.name | '담당자'}}님,

{{company}}에서 힐링워크에 관심을 가져주셔서 진심으로 감사드립니다.

저희는 조직의 성장과 팀원들의 웰빙을 위한 맞춤형 힐링·워크샵 프로그램을 제공하고 있습니다.

곧 전문 컨설턴트가 연락드려 최적의 프로그램을 제안해드리겠습니다.

감사합니다.
힐링워크 팀`,
    now,
    now
  ).run()

  // 리마인더 SMS 템플릿
  const reminderSMSId = crypto.randomUUID()
  await env.DB.prepare(
    `INSERT INTO templates (id, channel, name, body, created_at, updated_at)
     VALUES (?, 'sms', ?, ?, ?, ?)`
  ).bind(
    reminderSMSId,
    '리마인더 SMS',
    `안녕하세요. 이전에 보내드린 이메일을 확인해주시면 감사하겠습니다. 문의사항이 있으시면 언제든 연락주세요.`,
    now,
    now
  ).run()

  // 웰컴 시퀀스
  const welcomeSequenceId = crypto.randomUUID()
  const sequenceSteps = JSON.stringify([
    {
      delay_hours: 0,
      template_id: welcomeEmailId,
      channel: 'email',
    },
    {
      delay_hours: 48,
      template_id: reminderSMSId,
      channel: 'sms',
      conditions: {
        if_not_opened: true,
      },
    },
  ])

  await env.DB.prepare(
    `INSERT INTO sequences (id, name, steps, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(
    welcomeSequenceId,
    '웰컴 시퀀스',
    sequenceSteps,
    now,
    now
  ).run()

  console.log('Initial data seeded successfully')
}

