/**
 * Next.js API Route - 템플릿 상세
 * 
 * Note: API 라우트는 정적 내보내기에서 지원되지 않습니다.
 * 이 파일은 Cloudflare Workers로 프록시되므로 빌드에서 제외됩니다.
 */

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return []
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const { id } = await params

  const response = await fetch(`${workerUrl}/api/templates/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const { id } = await params
  const body = await request.json()

  const response = await fetch(`${workerUrl}/api/templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const { id } = await params

  const response = await fetch(`${workerUrl}/api/templates/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}
