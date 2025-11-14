'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

/**
 * 관리자 레이아웃 컴포넌트
 * 인증 확인 및 사이드바 포함
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // 로그인 페이지는 인증 확인 제외
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      return
    }

    // 쿠키에서 인증 토큰 확인
    const checkAuth = () => {
      const cookies = document.cookie.split(';')
      const authCookie = cookies.find(cookie => 
        cookie.trim().startsWith('admin_auth=')
      )
      
      if (authCookie && authCookie.includes('authenticated')) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  // 로그인 페이지는 그대로 렌더링
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // 인증 확인 중
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">인증 확인 중...</p>
        </div>
      </div>
    )
  }

  // 인증되지 않은 경우 (리다이렉트 중)
  if (!isAuthenticated) {
    return null
  }

  // 인증된 경우 관리자 레이아웃 렌더링
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-light-gray-bg dark:bg-background-dark font-display">
      <div className="flex h-full grow flex-row">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
