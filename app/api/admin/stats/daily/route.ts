/**
 * Next.js API Route - 일별 통계
 */

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const url = new URL(request.url)
  
  const response = await fetch(`${workerUrl}/api/admin/stats/daily?${url.searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}

