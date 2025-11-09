/**
 * 오픈 트래킹 픽셀
 */

export async function GET(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const url = new URL(request.url)
  
  // 쿼리 파라미터 전달
  const response = await fetch(`${workerUrl}/t/o?${url.searchParams.toString()}`, {
    method: 'GET',
    headers: {
      ...Object.fromEntries(request.headers.entries()),
    },
  })

  return response
}

