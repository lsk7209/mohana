"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"
import AdminDashboard from "@/app/components/admin/dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const { isAuthenticated, isAdmin, isStaff } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not authenticated or not admin/staff
    if (!isAuthenticated || (!isAdmin && !isStaff)) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, isStaff, router])

  if (!isAuthenticated || (!isAdmin && !isStaff)) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">워크샵 관리</div>
          <p className="mb-4 text-gray-600">등록/검수/승인/수정요청 등 전체 워크샵 관리</p>
          <Link href="/admin/workshops">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" aria-label="워크샵 관리로 이동" tabIndex={0}>워크샵 관리</Button>
          </Link>
        </div>
        <div className="bg-green-50 p-6 rounded-lg flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">문의 관리</div>
          <p className="mb-4 text-gray-600">기업 문의 내역 확인 및 답변</p>
          <Link href="/admin/inquiries">
            <Button className="bg-green-600 hover:bg-green-700 text-white" aria-label="문의 관리로 이동" tabIndex={0}>문의 관리</Button>
          </Link>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">회원 관리</div>
          <p className="mb-4 text-gray-600">강사/기업회원/관리자 등 전체 회원 관리</p>
          <Button className="bg-gray-600 hover:bg-gray-700 text-white" aria-label="회원 관리(추후 구현)" tabIndex={0} disabled>회원 관리</Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">요약 통계 (샘플)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-500">전체 워크샵</div>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-500">미처리 문의</div>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-500">검수요청 워크샵</div>
          </div>
          <div className="bg-white border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">20</div>
            <div className="text-sm text-gray-500">전체 회원</div>
          </div>
        </div>
      </div>
    </div>
  )
}
