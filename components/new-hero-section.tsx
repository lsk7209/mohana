'use client'

import { VideoWithFallback } from "@/components/video-with-fallback"

/**
 * 새로운 히어로 섹션 컴포넌트
 * 동영상 배경과 오버레이를 사용한 풀스크린 히어로 섹션
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
        <div className="relative flex min-h-[480px] flex-col gap-6 sm:gap-8 rounded-lg sm:rounded-xl items-center justify-center p-4 text-center overflow-hidden">
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
          <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
          
          {/* 콘텐츠 */}
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

