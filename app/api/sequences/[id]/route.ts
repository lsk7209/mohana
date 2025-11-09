/**
 * Next.js API Route - 시퀀스 상세
 */

export const dynamic = 'force-static'

// 정적 내보내기를 위한 빈 generateStaticParams
export async function generateStaticParams() {
  return []
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const { id } = await params

  const response = await fetch(`${workerUrl}/api/sequences/${id}`, {
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

  const response = await fetch(`${workerUrl}/api/sequences/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

