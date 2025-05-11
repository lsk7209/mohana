import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { date: "desc" } })
    return Response.json(inquiries)
  } catch (e) {
    return new Response(JSON.stringify({ error: "문의 조회 실패" }), { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // 필수값 체크
    if (!data.company || !data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "필수 항목 누락" }), { status: 400 })
    }
    const inquiry = await prisma.inquiry.create({
      data: {
        company: data.company,
        name: data.name,
        email: data.email,
        message: data.message,
        status: data.status || "미처리",
      },
    })
    return Response.json(inquiry)
  } catch (e) {
    return new Response(JSON.stringify({ error: "문의 등록 실패" }), { status: 500 })
  }
} 