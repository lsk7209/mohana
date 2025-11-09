/**
 * Next.js API Route - 템플릿 상세
 */

export const dynamic = 'force-static'
export const runtime = 'edge'

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

