/**
 * 리드 생성 API
 */

import { createLead, getLeadByEmail } from '../lib/db'
import { checkRateLimit, getRateLimitKey } from '../lib/rate-limit'
import { validateLeadData, sanitizeInput } from '../lib/validation'
import { handleError } from '../lib/error-handler'
import type { Env } from '../types'

export async function handleLeads(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(request)
  const rateLimit = await checkRateLimit(env, rateLimitKey, 5, 60) // 5 requests per minute

  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests', resetAt: rateLimit.resetAt }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetAt),
        },
      }
    )
  }

  try {
    const body = await request.json<{
      company?: string
      name?: string
      email: string
      phone?: string
      headcount?: number
      theme?: string
      memo?: string
    }>()

    // 입력 검증 및 정제
    try {
      validateLeadData({
        email: body.email,
        company: body.company,
        name: body.name,
        phone: body.phone,
      })
    } catch (error) {
      return handleError(error)
    }

    // 입력 정제
    const sanitizedData = {
      company: body.company ? sanitizeInput(body.company) : undefined,
      name: body.name ? sanitizeInput(body.name) : undefined,
      email: body.email.toLowerCase().trim(),
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      headcount: body.headcount,
      theme: body.theme ? sanitizeInput(body.theme) : undefined,
      memo: body.memo ? sanitizeInput(body.memo) : undefined,
    }

    // 중복 체크 (같은 이메일로 24시간 내 생성된 리드)
    const existing = await getLeadByEmail(env, sanitizedData.email)
    if (existing && Date.now() - existing.created_at < 24 * 60 * 60 * 1000) {
      return new Response(
        JSON.stringify({
          error: 'Lead already exists',
          leadId: existing.id,
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const lead = await createLead(env, {
      ...sanitizedData,
      status: 'new',
    })

    // 시퀀스 자동 시작 (웰컴 시퀀스)
    try {
      const welcomeSequence = await env.DB.prepare(
        "SELECT id FROM sequences WHERE name = '웰컴 시퀀스' LIMIT 1"
      ).first<{ id: string }>()

      if (welcomeSequence) {
        // 시퀀스 실행 (비동기로 처리하여 리드 생성 응답 지연 방지)
        const schedulerId = env.SEQUENCE_SCHEDULER.idFromName('scheduler')
        const scheduler = env.SEQUENCE_SCHEDULER.get(schedulerId)
        
        // 비동기 실행 (응답 지연 방지)
        scheduler.fetch('http://internal/sequences/run', {
          method: 'POST',
          body: JSON.stringify({
            lead_id: lead.id,
            sequence_id: welcomeSequence.id,
          }),
        }).catch((err) => {
          console.error('Error starting welcome sequence:', err)
        })
      }
    } catch (error) {
      console.error('Error starting welcome sequence:', error)
      // 시퀀스 시작 실패해도 리드 생성은 성공으로 처리
    }

    return new Response(
      JSON.stringify({ success: true, lead }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    )
  } catch (error) {
    return handleError(error)
  }
}

