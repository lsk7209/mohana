/**
 * 이메일 발송 큐 워커
 */

import type { Env, Message } from '../types'
import { signMessageId } from '../lib/hmac'

interface EmailQueueMessage {
  messageId: string
  to: string
  subject: string
  body: string
}

export async function handleEmailQueue(
  batch: MessageBatch<EmailQueueMessage>,
  env: Env
): Promise<void> {
  const { logError } = await import('../lib/error-handler')
  
  let successCount = 0
  let retryCount = 0
  let failureCount = 0

  for (const message of batch.messages) {
    try {
      await sendEmail(message.body, env)
      message.ack()
      successCount++
    } catch (error) {
      const retryAttempts = message.attempts || 0
      const maxRetries = 3

      logError('handleEmailQueue - sendEmail failed', error, {
        messageId: message.body.messageId,
        to: message.body.to,
        attempt: retryAttempts + 1,
        maxRetries,
      })

      if (retryAttempts < maxRetries) {
        message.retry()
        retryCount++
      } else {
        // 최대 재시도 횟수 초과 - 실패 상태로 업데이트
        const errorMessage = error instanceof Error ? error.message : String(error)
        await markMessageAsFailed(env, message.body.messageId, errorMessage)
        message.ack()
        failureCount++
        
        // Dead Letter Queue에 추가할 수 있음 (향후 구현)
        // await env.DLQ.send({ ...message.body, error: errorMessage, attempts: retryAttempts })
      }
    }
  }

  // 배치 처리 결과 로깅
  if (retryCount > 0 || failureCount > 0) {
    console.log(`Email queue batch processed: ${successCount} success, ${retryCount} retries, ${failureCount} failures`)
  }
}

async function sendEmail(
  queueMessage: EmailQueueMessage,
  env: Env
): Promise<void> {
  const { messageId, to, subject, body } = queueMessage

  // 메시지 조회
  const message = await env.DB.prepare('SELECT * FROM messages WHERE id = ?')
    .bind(messageId)
    .first<Message>()

  if (!message) {
    throw new Error('Message not found')
  }

  // 트래킹 링크 추가
  const trackingPixel = await generateTrackingPixel(env, messageId)
  const trackedBody = await injectTrackingLinks(env, body, messageId)
  const finalBody = `${trackedBody}\n\n<img src="${trackingPixel}" width="1" height="1" style="display:none" />`

  // 이메일 서비스 선택 (Resend 우선)
  let emailService: 'resend' | 'mailchannels' | 'mailgun' = 'resend'

  if (env.RESEND_API_KEY) {
    await sendViaResend(env, to, subject, finalBody)
  } else if (env.MAILCHANNELS_API_KEY) {
    await sendViaMailChannels(env, to, subject, finalBody)
  } else if (env.MAILGUN_API_KEY) {
    await sendViaMailgun(env, to, subject, finalBody)
  } else {
    throw new Error('No email service configured')
  }

  // 메시지 상태 업데이트
  await env.DB.prepare(
    `UPDATE messages SET status = 'sent', sent_at = ? WHERE id = ?`
  ).bind(Date.now(), messageId).run()
}

async function sendViaResend(env: Env, to: string, subject: string, body: string): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html: body,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${error}`)
  }
}

async function sendViaMailChannels(env: Env, to: string, subject: string, body: string): Promise<void> {
  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: {
        email: env.FROM_EMAIL,
        name: env.FROM_NAME,
      },
      subject,
      content: [
        {
          type: 'text/html',
          value: body,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`MailChannels API error: ${error}`)
  }
}

async function sendViaMailgun(env: Env, to: string, subject: string, body: string): Promise<void> {
  // Mailgun 구현 (필요 시)
  throw new Error('Mailgun not implemented yet')
}

async function generateTrackingPixel(env: Env, messageId: string): Promise<string> {
  const signature = await signMessageId(env, messageId)
  const baseUrl = env.ENVIRONMENT === 'production'
    ? 'https://yourdomain.com'
    : 'http://localhost:3000'
  return `${baseUrl}/t/o?m=${messageId}&s=${signature}`
}

async function injectTrackingLinks(env: Env, body: string, messageId: string): Promise<string> {
  // HTML 내의 모든 링크를 트래킹 링크로 변환
  const baseUrl = env.ENVIRONMENT === 'production'
    ? 'https://yourdomain.com'
    : 'http://localhost:3000'

  const linkPattern = /<a\s+href=["']([^"']+)["']/gi
  let result = body
  let match

  while ((match = linkPattern.exec(body)) !== null) {
    const url = match[1]
    const encodedUrl = encodeURIComponent(url)
    const signature = await signMessageId(env, messageId)
    const trackingUrl = `${baseUrl}/t/c?m=${messageId}&u=${encodedUrl}&s=${signature}`
    result = result.replace(match[0], `<a href="${trackingUrl}"`)
  }

  return result
}

async function markMessageAsFailed(env: Env, messageId: string, error: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE messages SET status = 'failed', error = ? WHERE id = ?`
  ).bind(error, messageId).run()
}

