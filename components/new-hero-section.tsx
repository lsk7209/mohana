'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * 새로운 히어로 섹션 컴포넌트
 * 배경 이미지와 오버레이를 사용한 풀스크린 히어로 섹션
 */
export function NewHeroSection() {
  return (
    <div className="py-20 md:py-28">
      <div className="sm:p-4">
        <div className="relative flex min-h-[480px] flex-col gap-6 sm:gap-8 rounded-lg sm:rounded-xl items-center justify-center p-4 text-center overflow-hidden">
          <Image
            alt="Team members actively communicating and participating in a workshop."
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqtJFeeQoA0Ze8VZkJYnJDjUb5jjuRKOsY8fQLsyVZHI_VHuiWSwDg8tohL4e5wOWBxTXAqvopJADQ1ocAPfCW7RRU9FkQy4T12V4XC6Ay9TnplLjDd57Uas6NJJWkvrlT27DPFgW7aPMTOKr0wDHJskP5_MYbvYY_7EXEbjEG5HzFhQs_pK3msara2qI7m4zBIhOPHRQNVH58Gv6AnEqaShqdufKFMVSIUIOhdfuhLGtxMNdK9RalF1OM2lOWISVvYcYzegdHSa"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
          <div className="relative z-20 flex flex-col gap-6 sm:gap-8 items-center max-w-3xl">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                우리 팀의 잠재력을 깨우는 시간
              </h1>
              <h2 className="text-white/90 text-base sm:text-lg font-normal leading-relaxed">
                최고의 전문가와 함께하는 맞춤형 힐링 워크샵으로 팀의 성장을 경험하세요.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

