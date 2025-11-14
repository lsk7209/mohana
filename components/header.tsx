'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

/**
 * 메인 헤더 컴포넌트
 * sticky 포지션과 backdrop blur 효과를 적용한 네비게이션 바
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4 text-dark-slate-gray dark:text-white">
          <Link href="/" className="flex items-center gap-4" aria-label="홈으로 이동">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">힐링워크</h2>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-end gap-8" aria-label="주요 네비게이션">
          <div className="flex items-center gap-9">
            <Link 
              href="/about" 
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              aria-label="서비스 소개 페이지로 이동"
            >
              서비스 소개
            </Link>
            <Link 
              href="/programs" 
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              aria-label="프로그램 목록으로 이동"
            >
              프로그램
            </Link>
            <Link 
              href="#reviews" 
              className="text-sm font-medium leading-normal hover:text-primary transition-colors"
              aria-label="이용후기로 이동"
            >
              이용후기
            </Link>
          </div>
          <Link href="/contact">
            <Button 
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-primary text-white dark:text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/80 transition-colors"
              aria-label="무료 상담 신청 - 문의 페이지로 이동"
            >
              <span className="truncate">무료 상담 신청</span>
            </Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            className="text-dark-slate-gray dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined" aria-hidden="true">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
        {mobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 p-4"
            aria-label="모바일 네비게이션"
          >
            <div className="flex flex-col gap-4">
              <Link href="/about" className="text-sm font-medium text-dark-slate-gray dark:text-white hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>서비스 소개</Link>
              <Link href="/programs" className="text-sm font-medium text-dark-slate-gray dark:text-white hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>프로그램</Link>
              <Link href="#reviews" className="text-sm font-medium text-dark-slate-gray dark:text-white hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>이용후기</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full rounded-full h-10 px-4 bg-primary text-white dark:text-background-dark text-sm font-bold"
                  aria-label="무료 상담 신청 - 문의 페이지로 이동"
                >
                  무료 상담 신청
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  )
}
