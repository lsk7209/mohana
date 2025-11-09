/**
 * Next.js API Route - 메시지 상세
 * 
 * Note: API 라우트는 정적 내보내기에서 지원되지 않습니다.
 * 이 파일은 Cloudflare Workers로 프록시되므로 빌드에서 제외됩니다.
 */

export const dynamic = 'force-static'

// Next.js 정적 내보내기에서 동적 라우트를 위해 필요 (빈 배열 반환)
export async function generateStaticParams() {
  return []
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ messageId: string }> }
) {
  const workerUrl = process.env.WORKER_URL || 'http://localhost:8787'
  const { messageId } = await params

  const response = await fetch(`${workerUrl}/api/messages/${messageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return Response.json(data, { status: response.status })
}
