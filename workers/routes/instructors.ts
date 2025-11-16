/**
 * 강사 관리 API 라우트
 * 강사 CRUD 작업 처리
 */

import type { Env } from '../types'

// 정적 강사 데이터 (임시 - 실제로는 DB에서 가져와야 함)
const staticInstructors: Record<string, any> = {
  'kim-minjun': {
    id: 'kim-minjun',
    name: '김민준',
    title: '커뮤니케이션 전문가 | 조직개발 컨설턴트',
    bio: '20년 이상의 조직 개발 경험을 바탕으로 효과적인 커뮤니케이션 방법론을 개발했습니다.',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
    skills: '소통,갈등관리,팀빌딩',
    is_active: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
}

export async function listInstructors(request: Request, env: Env): Promise<Response> {
  try {
    // 현재는 정적 데이터 반환
    // 실제로는 DB에서 가져와야 함
    const instructors = Object.values(staticInstructors)

    return new Response(
      JSON.stringify({ instructors }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing instructors:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getInstructor(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Instructor ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // 현재는 정적 데이터 반환
    // 실제로는 DB에서 가져와야 함
    const instructor = staticInstructors[id]

    if (!instructor) {
      return new Response(
        JSON.stringify({ error: 'Instructor not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ instructor }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error getting instructor:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function createInstructor(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as any

    // ID 생성
    const id = body.id || body.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `instructor-${Date.now()}`
    
    // 강사 데이터 저장 (현재는 메모리에만 저장)
    // 실제로는 DB에 저장해야 함
    const instructor = {
      id,
      ...body,
      is_active: body.is_active ?? true,
      created_at: Date.now(),
      updated_at: Date.now(),
    }

    staticInstructors[id] = instructor

    return new Response(
      JSON.stringify({ success: true, instructor }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating instructor:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function updateInstructor(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Instructor ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json() as any

    // 현재는 정적 데이터 업데이트
    // 실제로는 DB에서 업데이트해야 함
    const existingInstructor = staticInstructors[id]

    if (!existingInstructor) {
      return new Response(
        JSON.stringify({ error: 'Instructor not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const updatedInstructor = {
      ...existingInstructor,
      ...body,
      updated_at: Date.now(),
    }

    staticInstructors[id] = updatedInstructor

    return new Response(
      JSON.stringify({ success: true, instructor: updatedInstructor }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error updating instructor:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function deleteInstructor(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const id = url.pathname.split('/').pop()

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'Instructor ID required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // 현재는 정적 데이터 삭제
    // 실제로는 DB에서 삭제해야 함
    if (!staticInstructors[id]) {
      return new Response(
        JSON.stringify({ error: 'Instructor not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    delete staticInstructors[id]

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error deleting instructor:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

