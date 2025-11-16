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
    <div className="py-12 md:py-16 lg:py-20">
      <div className="relative">
        {/* 동영상 배경 컨테이너 */}
        <div className="relative flex min-h-[70vh] md:min-h-[80vh] flex-col items-center justify-center rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {/* 동영상 배경 */}
          <div className="absolute inset-0 z-0">
            <VideoWithFallback
              src={videoUrl}
              fallbackImage={fallbackImageUrl}
              alt="Team members actively communicating and participating in a workshop."
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              className="w-full h-full scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* 개선된 그라데이션 오버레이 - 더 부드럽고 깊이감 있는 효과 */}
          <div 
            className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/75"
            aria-hidden="true"
          />
          <div 
            className="absolute inset-0 z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
            aria-hidden="true"
          />
          
          {/* 콘텐츠 컨테이너 */}
          <div className="relative z-20 flex flex-col gap-8 md:gap-10 items-center max-w-5xl px-6 sm:px-8 md:px-12 py-16 md:py-20 text-center">
            {/* 신뢰도 배지 - Glassmorphism 강화 */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg font-bold">✓</span>
                <span className="text-white text-sm font-semibold">130개 기업이 선택한 프로그램</span>
              </div>
              <span className="text-white/50 text-sm">•</span>
              <span className="text-white text-sm font-semibold">82% 재의뢰율</span>
            </div>

            {/* 메인 헤드라인 - 타이포그래피 개선 */}
            <div className="flex flex-col gap-5 md:gap-6">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-[-0.04em] [text-shadow:0_4px_20px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)]">
                팀이 지쳐있나요?
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent [text-shadow:none]">
                  지금이 변화의 시작입니다
                </span>
              </h1>
              
              {/* 서브헤드라인 - 가독성 향상 */}
              <h2 className="text-white/95 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed max-w-3xl mx-auto [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                스트레스와 번아웃으로 지친 팀원들,
                <br />
                <strong className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
                  3시간의 힐링워크
                </strong>
                로 다시 하나가 되세요
              </h2>
            </div>

            {/* CTA 버튼 그룹 - 모던한 스타일 */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 mt-2">
              <Link href="/contact" className="group">
                <Button 
                  className="flex min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-full h-14 md:h-16 px-8 md:px-10 bg-gradient-to-r from-primary to-primary-light text-white text-base md:text-lg font-bold leading-normal tracking-wide hover:from-primary-light hover:to-primary transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/40 hover:shadow-primary/60"
                  aria-label="무료 상담 신청하기 - 문의 페이지로 이동"
                >
                  <span className="truncate">무료 상담 신청하기</span>
                  <span className="material-symbols-outlined text-xl md:text-2xl transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Button>
              </Link>
              
              <Link href="/programs" className="group">
                <Button 
                  variant="outline"
                  className="flex min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-full h-14 md:h-16 px-8 md:px-10 bg-white/15 backdrop-blur-md border-2 border-white/40 text-white text-base md:text-lg font-bold leading-normal hover:bg-white/25 hover:border-white/60 transition-all duration-300 hover:scale-105 shadow-lg"
                  aria-label="프로그램 둘러보기"
                >
                  <span className="truncate">프로그램 둘러보기</span>
                  <span className="material-symbols-outlined text-xl md:text-2xl transition-transform group-hover:translate-x-1">
                    explore
                  </span>
                </Button>
              </Link>
            </div>

            {/* 추가 정보 - 카드 스타일로 개선 */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
              {[
                { icon: 'check_circle', text: '무료 상담 및 제안서' },
                { icon: 'tune', text: '맞춤형 프로그램 설계' },
                { icon: 'school', text: '전문 강사진 보장' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  <span className="material-symbols-outlined text-primary text-lg">
                    {item.icon}
                  </span>
                  <span className="text-white/95 text-sm md:text-base font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

