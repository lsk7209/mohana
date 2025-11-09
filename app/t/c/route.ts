/**
 * 클릭 트래킹 리디렉트
 */

export async function GET(request: Request) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const url = new URL(request.url)
  
  // 쿼리 파라미터 전달
  const response = await fetch(`${workerUrl}/t/c?${url.searchParams.toString()}`, {
    method: 'GET',
    headers: {
      ...Object.fromEntries(request.headers.entries()),
    },
    redirect: 'manual',
  })

  // 리디렉트 응답 처리
  if (response.status === 302 || response.status === 301) {
    const location = response.headers.get('Location')
    if (location) {
      return Response.redirect(location, response.status)
    }
  }

  return response
}

