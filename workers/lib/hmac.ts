/**
 * HMAC 서명 검증 (트래킹 링크 보안)
 */

import type { Env } from '../types'

export async function signMessageId(env: Env, messageId: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.HMAC_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(messageId))
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export async function verifySignature(env: Env, messageId: string, signature: string): Promise<boolean> {
  const expected = await signMessageId(env, messageId)
  return expected === signature
}

