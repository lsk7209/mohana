/**
 * Cloudflare Workers Entry Point
 * API 라우트 및 크론 작업 처리
 */

import { Router } from 'itty-router'
import { handleLeads } from './routes/leads'
import { handleMessages } from './routes/messages'
import { handleSequences } from './routes/sequences'
import { handleTracking } from './routes/tracking'
import { handleAdmin } from './routes/admin'
import { handleTemplates } from './routes/templates'
import { handleStats } from './routes/stats'
import * as handlePrograms from './routes/programs'
import { handleWebhooks } from './routes/webhooks'
import { handleABTests } from './routes/ab-tests'
import { handleCron } from './cron'
import { handleEmailQueue } from './queues/email'
import { handleSMSQueue } from './queues/sms'
import { SequenceScheduler } from './durable-objects/sequence-scheduler'
import type { Env } from './types'

interface EmailQueueMessage {
  messageId: string
  to: string
  subject: string
  body: string
}

interface SMSQueueMessage {
  messageId: string
  to: string
  body: string
}

const router = Router()

// API Routes
router.post('/api/leads', handleLeads)
router.get('/api/leads/:id', handleAdmin.getLead)
router.get('/api/admin/leads', handleAdmin.listLeads)
router.get('/api/admin/leads/:id', handleAdmin.getLead)
router.put('/api/admin/leads/:id', handleAdmin.updateLead)

router.get('/api/templates', handleTemplates.list)
router.get('/api/templates/:id', handleTemplates.get)
router.post('/api/templates', handleTemplates.create)
router.put('/api/templates/:id', handleTemplates.update)
router.delete('/api/templates/:id', handleTemplates.delete)

router.get('/api/admin/stats/daily', handleStats.daily)
router.get('/api/admin/stats/overview', handleStats.overview)

router.get('/api/admin/programs', handlePrograms.listPrograms)
router.get('/api/admin/programs/:slug', handlePrograms.getProgram)
router.post('/api/admin/programs', handlePrograms.createProgram)
router.post('/api/admin/programs/new', handlePrograms.createProgram)
router.put('/api/admin/programs/:slug', handlePrograms.updateProgram)
router.delete('/api/admin/programs/:slug', handlePrograms.deleteProgram)

router.post('/api/webhooks/bounce', handleWebhooks.bounce)
router.post('/api/webhooks/delivery', handleWebhooks.delivery)

router.get('/api/admin/ab-tests', handleABTests.list)

// Seed (개발용)
router.post('/api/seed', async (request, env) => {
  const { handleSeed } = await import('./routes/seed')
  return handleSeed(request, env)
})

router.post('/api/messages/send-email', handleMessages.sendEmail)
router.post('/api/messages/send-sms', handleMessages.sendSMS)
router.get('/api/messages/lead/:leadId', handleMessages.getMessages)
router.get('/api/messages/:messageId', handleMessages.getMessage)

router.post('/api/sequences/run', handleSequences.run)
router.get('/api/sequences', handleSequences.list)
router.get('/api/sequences/:id', handleSequences.getSequence)
router.post('/api/sequences', handleSequences.create)
router.put('/api/sequences/:id', handleSequences.update)
router.get('/api/admin/sequences/performance', handleSequences.getPerformance)

// Tracking Routes
router.get('/t/o', handleTracking.open)
router.get('/t/c', handleTracking.click)
router.get('/unsubscribe', handleTracking.unsubscribe)

// Health Check
router.get('/health', () => new Response('OK', { status: 200 }))

// 404
router.all('*', () => new Response('Not Found', { status: 404 }))

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return router.handle(request, env, ctx).catch((err) => {
      console.error('Unhandled error:', err)
      return new Response('Internal Server Error', { status: 500 })
    })
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    await handleCron(event, env, ctx)
  },

  async queue(batch: MessageBatch, env: Env): Promise<void> {
    const { logError } = await import('./lib/error-handler')
    
    try {
      // 큐 이름으로 분기
      if (batch.queue === 'email-dispatch') {
        await handleEmailQueue(batch as MessageBatch<EmailQueueMessage>, env)
      } else if (batch.queue === 'sms-dispatch') {
        await handleSMSQueue(batch as MessageBatch<SMSQueueMessage>, env)
      } else {
        console.warn(`Unknown queue: ${batch.queue}`)
      }
    } catch (error) {
      logError('queue handler', error, {
        queue: batch.queue,
        messageCount: batch.messages.length,
      })
      // 에러를 다시 throw하지 않음 - 개별 메시지 처리는 이미 완료됨
    }
  },
}

// Durable Objects Export
export { SequenceScheduler }

