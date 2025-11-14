/**
 * 트래킹 엔드포인트 (오픈/클릭)
 */

import { recordMessageEvent, isUnsubscribed, unsubscribe } from '../lib/db'
import { verifySignature } from '../lib/hmac'
import type { Env } from '../types'

export async function open(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const messageId = url.searchParams.get('m')
  const signature = url.searchParams.get('s')

  if (!messageId || !signature) {
    return new Response('Invalid parameters', { status: 400 })
  }

  // 서명 검증
  const isValid = await verifySignature(env, messageId, signature)
  if (!isValid) {
    return new Response('Invalid signature', { status: 403 })
  }

  // 중복 체크 (3초 내 동일 IP/UA 무시)
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const ua = request.headers.get('User-Agent') || 'unknown'
  const cacheKey = `open:${messageId}:${ip}:${ua}`
  const cached = await env.CACHE.get(cacheKey)

  if (cached) {
    // 1x1 투명 픽셀 반환
    return new Response(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      {
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    )
  }

  // 3초 캐시
  await env.CACHE.put(cacheKey, '1', { expirationTtl: 3 })

  // 이벤트 기록
  await recordMessageEvent(env, {
    message_id: messageId,
    type: 'open',
    ip_address: ip,
    user_agent: ua,
  })

  // 1x1 투명 픽셀 반환
  return new Response(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  )
}

export async function click(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const messageId = url.searchParams.get('m')
  const encodedUrl = url.searchParams.get('u')
  const signature = url.searchParams.get('s')

  if (!messageId || !encodedUrl || !signature) {
    return new Response('Invalid parameters', { status: 400 })
  }

  // 서명 검증
  const isValid = await verifySignature(env, messageId, signature)
  if (!isValid) {
    return new Response('Invalid signature', { status: 403 })
  }

  // 원본 URL 디코딩
  let targetUrl: string
  try {
    targetUrl = decodeURIComponent(encodedUrl)
  } catch {
    return new Response('Invalid URL encoding', { status: 400 })
  }

  // 중복 체크
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const ua = request.headers.get('User-Agent') || 'unknown'
  const cacheKey = `click:${messageId}:${ip}:${ua}`
  const cached = await env.CACHE.get(cacheKey)

  if (!cached) {
    // 3초 캐시
    await env.CACHE.put(cacheKey, '1', { expirationTtl: 3 })

    // 이벤트 기록
    await recordMessageEvent(env, {
      message_id: messageId,
      type: 'click',
      meta: JSON.stringify({ url: targetUrl }),
      ip_address: ip,
      user_agent: ua,
    })
  }

  // UTM 파라미터 추가 (선택적)
  const targetUrlObj = new URL(targetUrl)
  targetUrlObj.searchParams.set('utm_source', 'email')
  targetUrlObj.searchParams.set('utm_medium', 'click')
  targetUrlObj.searchParams.set('utm_campaign', messageId)

  // 리디렉트
  return Response.redirect(targetUrlObj.toString(), 302)
}

export async function unsubscribeHandler(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')
  const token = url.searchParams.get('token')

  if (!email) {
    return new Response('Email parameter required', { status: 400 })
  }

  // HMAC 서명 검증 (선택적 - 토큰이 제공된 경우에만)
  if (token) {
    const isValid = await verifySignature(env, email, token)
    if (!isValid) {
      return new Response('Invalid token', { status: 403 })
    }
  }

  await unsubscribe(env, email, 'user_request')

  return new Response(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>구독 해지 완료</title>
    </head>
    <body>
      <h1>구독 해지가 완료되었습니다.</h1>
      <p>${email}로 발송되는 마케팅 메일을 더 이상 받지 않습니다.</p>
    </body>
    </html>
    `,
    {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }
  )
}

export const handleTracking = {
  open,
  click,
  unsubscribe: unsubscribeHandler,
}

