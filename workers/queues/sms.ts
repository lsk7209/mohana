/**
 * SMS 발송 큐 워커
 */

import type { Env, Message } from '../types'
import { signMessageId } from '../lib/hmac'

interface SMSQueueMessage {
  messageId: string
  to: string
  body: string
}

export async function handleSMSQueue(
  batch: MessageBatch<SMSQueueMessage>,
  env: Env
): Promise<void> {
  for (const message of batch.messages) {
    try {
      await sendSMS(message.body, env)
      message.ack()
    } catch (error) {
      console.error('Error sending SMS:', error)
      const retryCount = message.attempts || 0
      if (retryCount < 3) {
        message.retry()
      } else {
        await markMessageAsFailed(env, message.body.messageId, String(error))
        message.ack()
      }
    }
  }
}

async function sendSMS(
  queueMessage: SMSQueueMessage,
  env: Env
): Promise<void> {
  const { messageId, to, body } = queueMessage

  if (!env.SOLAPI_API_KEY || !env.SOLAPI_API_SECRET) {
    throw new Error('Solapi credentials not configured')
  }

  // 메시지 조회
  const message = await env.DB.prepare('SELECT * FROM messages WHERE id = ?')
    .bind(messageId)
    .first<Message>()

  if (!message) {
    throw new Error('Message not found')
  }

  // 트래킹 링크 추가 (URL이 있는 경우)
  const trackedBody = await injectTrackingLinks(env, body, messageId)

  // Solapi API 호출
  const auth = btoa(`${env.SOLAPI_API_KEY}:${env.SOLAPI_API_SECRET}`)
  const response = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        to,
        from: env.SOLAPI_SENDER,
        text: trackedBody,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Solapi API error: ${error}`)
  }

  // 메시지 상태 업데이트
  await env.DB.prepare(
    `UPDATE messages SET status = 'sent', sent_at = ? WHERE id = ?`
  ).bind(Date.now(), messageId).run()
}

async function injectTrackingLinks(env: Env, body: string, messageId: string): Promise<string> {
  // URL 패턴 찾기 및 트래킹 링크로 변환
  const urlPattern = /(https?:\/\/[^\s]+)/g
  const baseUrl = env.ENVIRONMENT === 'production'
    ? 'https://yourdomain.com'
    : 'http://localhost:3000'

  let result = body
  const matches = body.match(urlPattern) || []

  for (const url of matches) {
    const encodedUrl = encodeURIComponent(url)
    const signature = await signMessageId(env, messageId)
    const trackingUrl = `${baseUrl}/t/c?m=${messageId}&u=${encodedUrl}&s=${signature}`
    result = result.replace(url, trackingUrl)
  }

  return result
}

async function markMessageAsFailed(env: Env, messageId: string, error: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE messages SET status = 'failed', error = ? WHERE id = ?`
  ).bind(error, messageId).run()
}

