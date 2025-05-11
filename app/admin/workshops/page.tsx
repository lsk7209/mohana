"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Workshop {
  id: number
  title: string
  seller: string
  status: string
  createdAt: string
  summary?: string
  description?: string
  image?: string
}

export default function AdminWorkshopsPage() {
  // TODO: 실제 전체 워크샵 데이터 연동
  const workshops = [
    { id: 1, title: "팀 빌딩 워크샵", seller: "김판매자", status: "공개", createdAt: "2024-05-01" },
    { id: 2, title: "창의력 개발 워크샵", seller: "이판매자", status: "비공개", createdAt: "2024-05-10" },
  ]
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const fetchWorkshops = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/workshops")
      if (!res.ok) throw new Error("워크샵 데이터를 불러오지 못했습니다.")
      const data = await res.json()
      setWorkshops(data)
    } catch (e: any) {
      setError(e.message || "에러 발생")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkshops()
  }, [])

  const handleStatusChange = async (id: number, status: string) => {
    setActionLoading(id)
    setError("")
    try {
      const res = await fetch(`/api/workshops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "상태 변경 실패")
      }
      // 성공 시 리스트 갱신
      await fetchWorkshops()
    } catch (e: any) {
      setError(e.message || "상태 변경 중 오류 발생")
    } finally {
      setActionLoading(null)
    }
  }

  const handleView = (id: number) => {
    const ws = workshops.find((w) => w.id === id)
    if (ws) {
      setSelectedWorkshop(ws)
      setDetailOpen(true)
    }
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setSelectedWorkshop(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">워크샵 관리</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">제목</th>
            <th className="p-2 border">판매자</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">등록일</th>
          </tr>
        </thead>
        <tbody>
          {workshops.map((ws) => (
            <tr key={ws.id} className="hover:bg-gray-50">
              <td className="p-2 border">{ws.id}</td>
              <td className="p-2 border">{ws.title}</td>
              <td className="p-2 border">{ws.seller}</td>
              <td className="p-2 border">{ws.status}</td>
              <td className="p-2 border">{ws.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 상세 모달 */}
      <Dialog open={detailOpen} onOpenChange={handleCloseDetail}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>워크샵 상세정보</DialogTitle>
          </DialogHeader>
          {selectedWorkshop && (
            <div className="space-y-2">
              {selectedWorkshop.image && (
                <img src={selectedWorkshop.image} alt="워크샵 썸네일" className="w-full h-40 object-cover rounded mb-2" />
              )}
              <div><span className="font-semibold">제목:</span> {selectedWorkshop.title}</div>
              <div><span className="font-semibold">강사:</span> {selectedWorkshop.seller}</div>
              <div><span className="font-semibold">상태:</span> {selectedWorkshop.status}</div>
              <div><span className="font-semibold">등록일:</span> {selectedWorkshop.createdAt}</div>
              {selectedWorkshop.summary && <div><span className="font-semibold">한줄 요약:</span> {selectedWorkshop.summary}</div>}
              {selectedWorkshop.description && (
                <div><span className="font-semibold">상세 설명:</span>
                  <div className="whitespace-pre-line border rounded p-2 bg-gray-50 mt-1">{selectedWorkshop.description}</div>
                </div>
              )}
              <Button className="w-full mt-4" onClick={handleCloseDetail} aria-label="닫기">닫기</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 