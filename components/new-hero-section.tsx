'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoWithFallback } from "@/components/video-with-fallback"

/**
 * 새로운 히어로 섹션 컴포넌트
 * 동영상 배경과 오버레이를 사용한 풀스크린 히어로 섹션
 * 페인포인트를 강조하고 즉각적인 행동을 유도하는 구성
 * 
 * 동영상 URL은 환경 변수 NEXT_PUBLIC_HERO_VIDEO_URL로 설정하거나,
 * public/videos/hero.mp4 경로에 동영상 파일을 배치하세요.
 */
export function NewHeroSection() {
  // 동영상 URL (환경 변수 또는 기본값)
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/videos/hero.mp4'
  
  // Fallback 이미지 URL
  const fallbackImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqtJFeeQoA0Ze8VZkJYnJDjUb5jjuRKOsY8fQLsyVZHI_VHuiWSwDg8tohL4e5wOWBxTXAqvopJADQ1ocAPfCW7RRU9FkQy4T12V4XC6Ay9TnplLjDd57Uas6NJJWkvrlT27DPFgW7aPMTOKr0wDHJskP5_MYbvYY_7EXEbjEG5HzFhQs_pK3msara2qI7m4zBIhOPHRQNVH58Gv6AnEqaShqdufKFMVSIUIOhdfuhLGtxMNdK9RalF1OM2lOWISVvYcYzegdHSa'

  return (
    <div className="py-20 md:py-28">
      <div className="sm:p-4">
        <div className="relative flex min-h-[600px] md:min-h-[700px] flex-col gap-6 sm:gap-8 rounded-lg sm:rounded-xl items-center justify-center p-4 text-center overflow-hidden">
          {/* 동영상 배경 */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <VideoWithFallback
              src={videoUrl}
              fallbackImage={fallbackImageUrl}
              alt="Team members actively communicating and participating in a workshop."
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              className="w-full h-full"
            />
          </div>
          
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" aria-hidden="true"></div>
          
          {/* 콘텐츠 */}
          <div className="relative z-20 flex flex-col gap-6 sm:gap-8 items-center max-w-4xl px-4">
            {/* 신뢰도 배지 */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white text-sm font-medium">✓ 130개 기업이 선택한 프로그램</span>
              <span className="text-white/70 text-sm">•</span>
              <span className="text-white text-sm font-medium">82% 재의뢰율</span>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] [text-shadow:0_4px_12px_rgba(0,0,0,0.5)]">
                팀이 지쳐있나요?<br />
                <span className="text-primary-light">지금이 변화의 시작입니다</span>
              </h1>
              <h2 className="text-white/95 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                스트레스와 번아웃으로 지친 팀원들,<br />
                <strong className="text-white font-bold">3시간의 힐링워크</strong>로 다시 하나가 되세요
              </h2>
            </div>

            {/* CTA 버튼 그룹 */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/contact">
                <Button 
                  className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/30"
                  aria-label="무료 상담 신청하기 - 문의 페이지로 이동"
                >
                  <span className="truncate">무료 상담 신청하기</span>
                  <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                </Button>
              </Link>
              <Link href="/programs">
                <Button 
                  variant="outline"
                  className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold leading-normal hover:bg-white/20 transition-all hover:scale-105"
                  aria-label="프로그램 둘러보기"
                >
                  <span className="truncate">프로그램 둘러보기</span>
                </Button>
              </Link>
            </div>

            {/* 추가 정보 */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-light">check_circle</span>
                <span>무료 상담 및 제안서</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-light">check_circle</span>
                <span>맞춤형 프로그램 설계</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-light">check_circle</span>
                <span>전문 강사진 보장</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

