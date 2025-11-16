'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"

/**
 * CTA 섹션 컴포넌트
 * 그라데이션 배경을 사용한 강력한 행동 유도 섹션
 * 긴급성과 혜택을 강조하여 즉각적인 행동을 유도
 */
export function NewCTASection() {
  return (
    <section className="py-20 md:py-32 my-16" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimate animation="scale" className="relative rounded-2xl p-10 md:p-16 text-center overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, #B2C7E5 0%, #A8D8C9 100%)' }}>
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            {/* 긴급성 배지 */}
            <div className="inline-block px-4 py-2 rounded-full bg-red-500 text-white text-sm font-bold mb-6 animate-pulse">
              ⚡ 이번 달 한정 특가 진행 중
            </div>
            
            <h2 id="cta-heading" className="text-dark-slate-gray text-3xl md:text-5xl font-black mb-6 leading-tight">
              더 이상 기다리지 마세요<br />
              <span className="text-primary">지금 바로 시작하세요</span>
            </h2>
            
            <p className="text-dark-slate-gray/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              간단한 정보만 남겨주시면,<br />
              <strong>전문 컨설턴트가 24시간 내에 최적의 프로그램을 제안</strong>해 드립니다
            </p>

            {/* 혜택 리스트 */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-dark-slate-gray">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="font-semibold">무료 상담 및 제안서</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="font-semibold">맞춤형 프로그램 설계</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="font-semibold">효과 보장</span>
              </div>
            </div>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button 
                  className="flex min-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 px-10 bg-primary text-white text-xl font-black leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl shadow-primary/40"
                  aria-label="무료 상담 신청하기 - 문의 페이지로 이동"
                >
                  <span className="truncate">무료 상담 신청하기</span>
                  <span className="material-symbols-outlined ml-3 text-2xl">arrow_forward</span>
                </Button>
              </Link>
              <Link href="/programs">
                <Button 
                  variant="outline"
                  className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 px-8 bg-white/90 backdrop-blur-sm border-2 border-dark-slate-gray/30 text-dark-slate-gray text-lg font-bold hover:bg-white transition-all hover:scale-105"
                  aria-label="프로그램 둘러보기"
                >
                  <span className="truncate">프로그램 보기</span>
                </Button>
              </Link>
            </div>

            {/* 추가 정보 */}
            <div className="mt-8 text-sm text-dark-slate-gray/70">
              <p>💬 카카오톡 상담도 가능합니다 | 📞 24시간 상담 가능</p>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}

