'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * 관리자 대시보드 메인 페이지
 * 기본적으로 프로그램 페이지로 리다이렉트
 */
export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // 기본적으로 프로그램 페이지로 리다이렉트
    router.replace('/admin/programs')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">로딩 중...</p>
      </div>
    </div>
  )
}

