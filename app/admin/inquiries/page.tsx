"use client"

import React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Inquiry {
  id: number
  company: string
  name: string
  email: string
  status: string
  date: string
  message: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/inquiries")
      if (!res.ok) throw new Error("문의 데이터를 불러오지 못했습니다.")
      const data = await res.json()
      setInquiries(data)
    } catch (e: any) {
      setError(e.message || "에러 발생")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleReply = async (id: number) => {
    setActionLoading(id)
    setError("")
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "처리완료" }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "상태 변경 실패")
      }
      await fetchInquiries()
    } catch (e: any) {
      setError(e.message || "상태 변경 중 오류 발생")
    } finally {
      setActionLoading(null)
    }
  }

  const handleView = (id: number) => {
    const inquiry = inquiries.find((inq) => inq.id === id)
    if (inquiry) {
      setSelectedInquiry(inquiry)
      setDetailOpen(true)
    }
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setSelectedInquiry(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">문의 접수 내역</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">이메일</th>
            <th className="p-2 border">문의 내용</th>
            <th className="p-2 border">접수일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id} className="hover:bg-gray-50">
              <td className="p-2 border">{inq.id}</td>
              <td className="p-2 border">{inq.name}</td>
              <td className="p-2 border">{inq.email}</td>
              <td className="p-2 border">{inq.message}</td>
              <td className="p-2 border">{inq.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 상세 모달 */}
      <Dialog open={detailOpen} onOpenChange={handleCloseDetail}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>문의 상세정보</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-2">
              <div><span className="font-semibold">회사명:</span> {selectedInquiry.company}</div>
              <div><span className="font-semibold">담당자:</span> {selectedInquiry.name}</div>
              <div><span className="font-semibold">이메일:</span> {selectedInquiry.email}</div>
              <div><span className="font-semibold">상태:</span> {selectedInquiry.status}</div>
              <div><span className="font-semibold">문의일:</span> {selectedInquiry.date}</div>
              <div><span className="font-semibold">문의 내용:</span>
                <div className="whitespace-pre-line border rounded p-2 bg-gray-50 mt-1">{selectedInquiry.message}</div>
              </div>
              <Button className="w-full mt-4" onClick={handleCloseDetail} aria-label="닫기">닫기</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 