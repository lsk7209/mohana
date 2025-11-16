import type React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

/**
 * 공개 페이지용 공통 레이아웃 컴포넌트
 * 모든 공개 페이지에 일관된 헤더와 푸터를 제공합니다.
 * 
 * @param {React.ReactNode} children - 페이지 콘텐츠
 * @example
 * <PublicLayout>
 *   <YourPageContent />
 * </PublicLayout>
 */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-dark-slate-gray dark:text-neutral-gray leading-relaxed">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

