import { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// inquiries 배열은 상위 route.ts에서 import 또는 require로 공유해야 함
const inquiriesModule = require("../route.ts")
let inquiries = inquiriesModule.inquiries

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const data = await req.json()
    if (!data.status) {
      return new Response(JSON.stringify({ error: "status 값이 필요합니다." }), { status: 400 })
    }
    const updated = await prisma.inquiry.update({
      where: { id: Number(id) },
      data: { status: data.status },
    })
    return Response.json({ success: true, inquiry: updated })
  } catch (e: any) {
    if (e.code === "P2025") {
      return new Response(JSON.stringify({ error: "문의를 찾을 수 없습니다." }), { status: 404 })
    }
    return new Response(JSON.stringify({ error: "서버 오류" }), { status: 500 })
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const inquiry = await prisma.inquiry.findUnique({ where: { id: Number(id) } })
    if (!inquiry) {
      return new Response(JSON.stringify({ error: "문의를 찾을 수 없습니다." }), { status: 404 })
    }
    return Response.json(inquiry)
  } catch (e) {
    return new Response(JSON.stringify({ error: "서버 오류" }), { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    await prisma.inquiry.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (e: any) {
    if (e.code === "P2025") {
      return new Response(JSON.stringify({ error: "문의를 찾을 수 없습니다." }), { status: 404 })
    }
    return new Response(JSON.stringify({ error: "서버 오류" }), { status: 500 })
  }
} 