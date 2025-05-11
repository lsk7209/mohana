import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({ orderBy: { createdAt: "desc" } })
    return Response.json(workshops)
  } catch (e) {
    return new Response(JSON.stringify({ error: "워크샵 조회 실패" }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // 필수값 체크
    if (!data.title || !data.summary || !data.type || !data.duration || !data.participants || !data.price || !data.description || !data.seller) {
      return new Response(JSON.stringify({ error: "필수 항목 누락" }), { status: 400 })
    }
    const workshop = await prisma.workshop.create({
      data: {
        title: data.title,
        summary: data.summary,
        image: data.image,
        type: data.type,
        duration: data.duration,
        participants: data.participants,
        price: data.price,
        description: data.description,
        seller: data.seller,
        status: data.status || "검수요청",
      },
    })
    return Response.json(workshop)
  } catch (e) {
    return new Response(JSON.stringify({ error: "워크샵 등록 실패" }), { status: 500 })
  }
} 