"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialForm = {
  title: "",
  summary: "",
  image: "",
  type: "OFFLINE",
  duration: "",
  participants: "",
  price: "",
  description: "",
}

export default function WorkshopNewPage() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.title || !form.summary || !form.type || !form.duration || !form.participants || !form.price || !form.description) {
      alert("모든 항목을 입력해 주세요.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, seller: "홍길동" }), // seller는 임시
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "등록 실패")
      }
      alert("워크샵이 등록(검수요청)되었습니다. 관리자의 승인 후 노출됩니다.")
      setForm(initialForm)
    } catch (e: any) {
      setError(e.message || "등록 중 오류 발생")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">워크샵 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">제목</label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} aria-label="제목" tabIndex={0} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="summary">한줄 요약</label>
          <Input id="summary" name="summary" value={form.summary} onChange={handleChange} aria-label="한줄 요약" tabIndex={0} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">썸네일 이미지 URL</label>
          <Input id="image" name="image" value={form.image} onChange={handleChange} aria-label="썸네일 이미지" tabIndex={0} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="type">진행방식</label>
          <select id="type" name="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2" aria-label="진행방식" tabIndex={0} required>
            <option value="OFFLINE">오프라인</option>
            <option value="ONLINE">온라인</option>
            <option value="HYBRID">온/오프라인 혼합</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="duration">소요 시간</label>
          <Input id="duration" name="duration" value={form.duration} onChange={handleChange} aria-label="소요 시간" tabIndex={0} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="participants">인원수</label>
          <Input id="participants" name="participants" value={form.participants} onChange={handleChange} aria-label="인원수" tabIndex={0} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">가격</label>
          <Input id="price" name="price" value={form.price} onChange={handleChange} aria-label="가격" tabIndex={0} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">상세 설명</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} className="w-full min-h-[100px] p-2 border rounded-md" aria-label="상세 설명" tabIndex={0} required />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={submitting} aria-label="등록하기">
          {submitting ? "등록 중..." : "등록하기"}
        </Button>
      </form>
    </div>
  )
} 