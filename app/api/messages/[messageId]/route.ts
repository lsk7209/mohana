export const dynamic = 'force-static'

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
