'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * CTA 섹션 컴포넌트
 * 그라데이션 배경을 사용한 강력한 행동 유도 섹션
 */
export function NewCTASection() {
  return (
    <section className="py-20 md:py-28 my-16" aria-labelledby="cta-heading">
      <div 
        className="rounded-lg p-10 md:p-16 text-center" 
        style={{ backgroundImage: 'linear-gradient(135deg, #B2C7E5 0%, #A8D8C9 100%)' }}
      >
        <h2 id="cta-heading" className="text-dark-slate-gray text-3xl md:text-4xl font-bold mb-4">
          지금 바로 우리 팀을 위한<br/>최고의 솔루션을 만나보세요
        </h2>
        <p className="text-dark-slate-gray/80 mb-8 max-w-xl mx-auto leading-relaxed">
          간단한 정보만 남겨주시면, 전문 컨설턴트가 최적의 프로그램을 제안해 드립니다.
        </p>
        <Link href="/contact">
          <Button 
            className="flex min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white dark:text-background-dark text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/80 transition-colors"
            aria-label="무료 상담 신청하기 - 문의 페이지로 이동"
          >
            <span className="truncate">무료 상담 신청하기</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}

