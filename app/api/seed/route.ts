/**
 * Next.js API Route - 시드 데이터 생성 (개발용)
 */

export async function POST(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'

  const response = await fetch(`${workerUrl}/api/seed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

