'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      className="relative px-4 pb-24 sm:pb-32 lg:pb-40"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(168, 216, 215, 0.4) 0%, rgba(42, 77, 105, 0.4) 100%)',
      }}
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-24">
        <div className="flex flex-col gap-8 pt-24 sm:pt-32 lg:pt-40 items-center min-h-[480px] justify-center">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-gray-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-normal">
              성과는 중요하지만,<br />팀은 웃음을 잃었습니다.
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 text-base sm:text-lg font-normal leading-normal">
              기업 워크샵 플랫폼 '모하나'가 팀의 회복을 디자인합니다.
            </h2>
          </div>
          <Link href="/contact">
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:brightness-90 transition-all">
              <span className="truncate">무료 제안서 받기</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
