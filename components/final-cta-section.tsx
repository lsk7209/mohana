'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="w-full max-w-5xl mx-auto">
        <div
          className="flex flex-col gap-8 rounded-xl items-center justify-center p-8 sm:p-12 text-center"
          style={{
            backgroundImage: 'linear-gradient(135deg, #13ece5 0%, #2A4D69 100%)',
          }}
        >
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-normal">
              우리 팀도 회복을 시작할 시간입니다.
            </h2>
            <p className="text-gray-200 text-base sm:text-lg font-normal leading-normal">
              간단한 정보만 입력하면, 팀에 꼭 맞는 맞춤 워크샵 제안서를 보내드립니다.
            </p>
          </div>
          <Link href="/contact">
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-all">
              <span className="truncate">무료 제안서 받기</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

