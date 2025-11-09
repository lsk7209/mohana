/**
 * 시드 데이터 생성 API (개발/초기 설정용)
 */

import { seedInitialData } from '../lib/seed'
import type { Env } from '../types'

export async function handleSeed(request: Request, env: Env): Promise<Response> {
  // 프로덕션에서는 보호 필요
  if (env.ENVIRONMENT === 'production') {
    return new Response(
      JSON.stringify({ error: 'Seed is not available in production' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    await seedInitialData(env)
    return new Response(
      JSON.stringify({ success: true, message: 'Initial data seeded' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error seeding data:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

