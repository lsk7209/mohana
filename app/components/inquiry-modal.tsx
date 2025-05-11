"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InquiryModalProps {
  open: boolean
  onClose: () => void
  workshopTitle: string
}

const InquiryModal = ({ open, onClose, workshopTitle }: InquiryModalProps) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name || !phone || !email || !message) {
      alert("모든 항목을 입력해 주세요.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: "미입력",
          name,
          email,
          message: `[${workshopTitle}] ${message}\n연락처: ${phone}`,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "문의 등록 실패")
      }
      alert("문의가 정상적으로 접수되었습니다. 운영진이 곧 연락드릴 예정입니다.")
      setName("")
      setPhone("")
      setEmail("")
      setMessage("")
      onClose()
    } catch (e: any) {
      setError(e.message || "문의 등록 중 오류 발생")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>워크샵 문의하기</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inquiry-workshop">워크샵</label>
            <Input id="inquiry-workshop" value={workshopTitle} disabled readOnly className="bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inquiry-name">이름</label>
            <Input id="inquiry-name" value={name} onChange={e => setName(e.target.value)} aria-label="이름" tabIndex={0} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inquiry-phone">연락처</label>
            <Input id="inquiry-phone" value={phone} onChange={e => setPhone(e.target.value)} aria-label="연락처" tabIndex={0} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inquiry-email">이메일</label>
            <Input id="inquiry-email" type="email" value={email} onChange={e => setEmail(e.target.value)} aria-label="이메일" tabIndex={0} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="inquiry-message">문의 내용</label>
            <textarea id="inquiry-message" className="w-full min-h-[80px] p-2 border rounded-md" value={message} onChange={e => setMessage(e.target.value)} aria-label="문의 내용" tabIndex={0} required />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={submitting} aria-label="문의 제출">
            {submitting ? "접수 중..." : "문의 제출"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InquiryModal 