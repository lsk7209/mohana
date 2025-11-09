/**
 * Next.js API Route - 시퀀스 실행
 */

export async function POST(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const body = await request.json()

  const response = await fetch(`${workerUrl}/api/sequences/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

