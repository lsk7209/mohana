/**
 * Next.js API Route - 통계 개요
 */

export async function GET(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  
  const response = await fetch(`${workerUrl}/api/admin/stats/overview`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

