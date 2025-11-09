/**
 * Next.js API Route - 시퀀스 관리
 */

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const response = await fetch(`${workerUrl}/api/sequences`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

export async function POST(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const body = await request.json()

  const response = await fetch(`${workerUrl}/api/sequences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

