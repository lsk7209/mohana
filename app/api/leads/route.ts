/**
 * Next.js API Route - 리드 생성
 * Cloudflare Workers로 프록시
 */

export const dynamic = 'force-static'

export async function POST(request: Request) {
  // Cloudflare Workers API로 프록시
  // 로컬 개발 시: http://localhost:8787/api/leads
  // 프로덕션: Workers URL
  
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const body = await request.json()

  try {
    const response = await fetch(`${workerUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Cloudflare Access 헤더 전달 (프로덕션)
        ...(request.headers.get('CF-Access-JWT-Assertion') && {
          'CF-Access-JWT-Assertion': request.headers.get('CF-Access-JWT-Assertion')!,
        }),
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return Response.json(data, { status: response.status })
  } catch (error) {
    console.error('Error proxying to worker:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

