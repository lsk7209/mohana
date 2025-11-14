/**
 * Custom 404 Not Found Page
 * Cloudflare Pages 호환성을 위한 커스텀 not-found 페이지
 */
import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export const dynamic = 'force-static'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-6 py-3 text-base font-semibold text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light/80 dark:hover:bg-surface-dark/80 transition-colors"
          >
            <Search className="w-5 h-5" />
            프로그램 찾기
          </Link>
        </div>
      </div>
    </div>
  )
}

