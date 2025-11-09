'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm px-4 sm:px-10 lg:px-20 py-3">
      <div className="flex items-center gap-4 text-text-light-primary dark:text-text-dark-primary">
        <Link href="/" className="flex items-center gap-4">
          <div className="text-primary w-6 h-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-[-0.015em]">모하나</h2>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        <div className="flex items-center gap-8">
          <Link href="/about" className="text-sm font-medium leading-normal text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors">
            소개
          </Link>
          <Link href="/programs" className="text-sm font-medium leading-normal text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors">
            프로그램
          </Link>
        </div>
        <Link href="/contact">
          <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-90 transition-all">
            <span className="truncate">무료 제안서 받기</span>
          </Button>
        </Link>
      </div>
      <div className="md:hidden">
        <button
          className="text-text-light-primary dark:text-text-dark-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-4">
          <div className="flex flex-col gap-4">
            <Link href="/about" className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>소개</Link>
            <Link href="/programs" className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>프로그램</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold">
                무료 제안서 받기
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
