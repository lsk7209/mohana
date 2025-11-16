/**
 * 프로그램 관리 API 라우트
 * 프로그램 CRUD 작업 처리
 */

import type { Env } from '../types'

// 정적 프로그램 데이터 (임시 - 실제로는 DB에서 가져와야 함)
const staticPrograms: Record<string, any> = {
  'communication-skill': {
    id: 'communication-skill',
    slug: 'communication-skill',
    title: '[소통 레벨업] 우리 팀을 하나로 만드는 커뮤니케이션 스킬',
    subtitle: '갈등을 해결하고 시너지를 만드는 대화법을 배웁니다.',
    description: '효과적인 커뮤니케이션 스킬을 배우고 조직 내 소통 문화를 개선합니다.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABHLbnc27KeCiOGP8b7tWeCEEREKV6iLBaT-DZSDELQmLjOqk6bdLpVmcAppaZDdg8veOmbkuycsSB0L13ZKfEJ8ikxKcjCxgnNn22IgWQ5hqUJK1GF7iKRZ9wYtDxtOA0vV09s8Bz3jBRjenruKUOS5pgEtuRm_MJIIvK2wT4tVqMUZ-QY1TaJcfu_pdxRdxQZe_HC8si3ys18y8gwwA2YfTegYhX8KCOTb8bby8Gf639rX279tqpC9mhui0MWcIbCzoFrERgtXQ_',
    duration: 4,
    headcount: '10-30명',
    price: '1인당 8만원 ~',
    theme: '소통',
    is_published: true,
    instructor_id: '김민준',
  },
  'leadership': {
    id: 'leadership',
    slug: 'leadership',
    title: '[리더십 강화] 성공하는 리더의 핵심 역량',
    subtitle: '변화의 시대, 팀을 이끄는 리더의 조건을 탐구합니다.',
    description: '리더십 역량 개발과 효과적인 팀 관리 방법을 학습합니다.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK',
    duration: 8,
    headcount: '10-20명',
    price: '1인당 15만원 ~',
    theme: '리더십',
    is_published: true,
    instructor_id: '이수진',
  },
  'teambuilding': {
    id: 'teambuilding',
    slug: 'teambuilding',
    title: '[팀빌딩 어드벤처] 함께 성장하는 우리 팀',
    subtitle: '도전적인 미션을 통해 최고의 팀워크를 구축합니다.',
    description: '다양한 팀 활동을 통해 협업 능력을 향상시키고 팀원 간 신뢰를 구축합니다.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMapGqJHe0gKAidOxHGP2FWEBKeh41Uh3GIXPUQkQVHr_4AX9KHUZRJ4_9Q1R6yxbiPiwW0wLf4NZb6aLOwZtfTtuNtZcA1WHNtOGmPiqt9Bd54CT_P_ypz3_KZrIokdAWt5da6IZKJtTXJ9go3Ej9WwFazubYl_3Z68A4p5YgmKufd5DJWXQpOrk0MKfAnOLrpx6_CzpKVPzKqic1FRzRXgaYIBI_jG6iDNLDtTCLq2As2PKVFw761XLSCfhAJitmHdCcKlxArIE3',
    duration: 6,
    headcount: '20-50명',
    price: '1인당 12만원 ~',
    theme: '팀워크',
    is_published: true,
    instructor_id: '박서준',
  },
  'self-discovery': {
    id: 'self-discovery',
    slug: 'self-discovery',
    title: '[나를 찾아가는 자기변화 레슨 – 명상·상담]',
    subtitle: '내면의 평화를 찾고 진정한 자아를 발견하는 여정',
    description: '명상과 상담을 통해 자기 이해를 높이고 내면의 평화를 찾는 프로그램입니다.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
    duration: 8,
    headcount: '5-15명',
    price: '1인당 20만원 ~',
    theme: '명상',
    is_published: true,
    instructor_id: '김상완',
  },
}

export async function listPrograms(request: Request, env: Env): Promise<Response> {
  try {
    // 현재는 정적 데이터 반환
    // 실제로는 DB에서 가져와야 함
    const programs = Object.values(staticPrograms).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      instructor_id: p.instructor_id,
      theme: p.theme,
      is_published: p.is_published ?? true,
    }))

    return new Response(
      JSON.stringify({ programs }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error listing programs:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function getProgram(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const slug = url.pathname.split('/').pop()

  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Program slug required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // 현재는 정적 데이터 반환
    // 실제로는 DB에서 가져와야 함
    const program = staticPrograms[slug]

    if (!program) {
      return new Response(
        JSON.stringify({ error: 'Program not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ program }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error getting program:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function createProgram(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const body = await request.json() as any

    // 슬러그 생성
    const slug = body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `program-${Date.now()}`
    
    // 프로그램 데이터 저장 (현재는 메모리에만 저장)
    // 실제로는 DB에 저장해야 함
    const program = {
      id: slug,
      slug,
      ...body,
      is_published: body.is_published ?? false,
      created_at: Date.now(),
      updated_at: Date.now(),
    }

    staticPrograms[slug] = program

    return new Response(
      JSON.stringify({ success: true, program }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating program:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function updateProgram(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'PUT') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const slug = url.pathname.split('/').pop()

  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Program slug required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json() as any

    // 현재는 정적 데이터 업데이트
    // 실제로는 DB에서 업데이트해야 함
    const existingProgram = staticPrograms[slug]

    if (!existingProgram) {
      return new Response(
        JSON.stringify({ error: 'Program not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const updatedProgram = {
      ...existingProgram,
      ...body,
      updated_at: Date.now(),
    }

    staticPrograms[slug] = updatedProgram

    return new Response(
      JSON.stringify({ success: true, program: updatedProgram }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error updating program:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function deleteProgram(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'DELETE') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const url = new URL(request.url)
  const slug = url.pathname.split('/').pop()

  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'Program slug required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // 현재는 정적 데이터 삭제
    // 실제로는 DB에서 삭제해야 함
    if (!staticPrograms[slug]) {
      return new Response(
        JSON.stringify({ error: 'Program not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    delete staticPrograms[slug]

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error deleting program:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

