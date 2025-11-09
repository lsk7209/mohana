/**
 * Cloudflare Workers 환경 타입 정의
 */

export interface Env {
  // D1 Database
  DB: D1Database

  // KV Namespaces
  CACHE: KVNamespace
  RATE_LIMIT: KVNamespace

  // Queues
  EMAIL_QUEUE: Queue
  SMS_QUEUE: Queue
  RETRY_QUEUE: Queue

  // Durable Objects
  SEQUENCE_SCHEDULER: DurableObjectNamespace
  RATE_LIMITER: DurableObjectNamespace

  // Environment Variables
  ENVIRONMENT: string
  HMAC_SECRET: string
  
  // Email Service (Resend/MailChannels/Mailgun)
  RESEND_API_KEY?: string
  MAILCHANNELS_API_KEY?: string
  MAILGUN_API_KEY?: string
  FROM_EMAIL: string
  FROM_NAME: string

  // SMS Service (Solapi)
  SOLAPI_API_KEY?: string
  SOLAPI_API_SECRET?: string
  SOLAPI_SENDER?: string

  // Cloudflare Access
  ACCESS_AUD?: string
  ACCESS_TEAM?: string
}

export interface Lead {
  id: string
  created_at: number
  company?: string
  name?: string
  email: string
  phone?: string
  headcount?: number
  theme?: string
  memo?: string
  status: 'new' | 'in_progress' | 'quoted' | 'won' | 'lost' | 'on_hold'
  tags?: string
  owner?: string
  last_activity_at?: number
}

export interface Message {
  id: string
  lead_id: string
  channel: 'email' | 'sms'
  template_id?: string
  subject?: string
  body_rendered: string
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced'
  error?: string
  created_at: number
  sent_at?: number
}

export interface MessageEvent {
  id: string
  message_id: string
  type: 'open' | 'click' | 'bounce' | 'delivery' | 'reply'
  meta?: string
  ts: number
  ip_address?: string
  user_agent?: string
}

export interface SequenceStep {
  delay_hours: number
  template_id: string
  channel: 'email' | 'sms'
  conditions?: {
    if_not_opened?: boolean
    if_not_clicked?: boolean
  }
}

export interface Sequence {
  id: string
  name: string
  steps: SequenceStep[]
  created_at: number
  updated_at: number
}

