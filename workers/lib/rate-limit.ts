/**
 * Rate Limiting 헬퍼 (KV 기반)
 */

import type { Env } from '../types'

const RATE_LIMIT_WINDOW = 60 // 1분
const MAX_REQUESTS_PER_WINDOW = 10

export async function checkRateLimit(
  env: Env,
  key: string,
  maxRequests: number = MAX_REQUESTS_PER_WINDOW,
  windowSeconds: number = RATE_LIMIT_WINDOW
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Math.floor(Date.now() / 1000)
  const windowStart = Math.floor(now / windowSeconds) * windowSeconds
  const rateLimitKey = `rate:${key}:${windowStart}`

  const count = await env.RATE_LIMIT.get(rateLimitKey, 'json') as number | null

  if (count === null) {
    await env.RATE_LIMIT.put(rateLimitKey, '1', { expirationTtl: windowSeconds + 1 })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: windowStart + windowSeconds,
    }
  }

  if (count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: windowStart + windowSeconds,
    }
  }

  await env.RATE_LIMIT.put(rateLimitKey, String(count + 1), { expirationTtl: windowSeconds + 1 })

  return {
    allowed: true,
    remaining: maxRequests - count - 1,
    resetAt: windowStart + windowSeconds,
  }
}

export function getRateLimitKey(request: Request): string {
  // IP 주소 기반 (Cloudflare의 CF-Connecting-IP 헤더 사용)
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  return ip
}

