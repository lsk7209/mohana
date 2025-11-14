'use client'

import Image from "next/image"
import { ScrollAnimate } from "@/components/scroll-animate"

/**
 * 이용후기 섹션 컴포넌트
 * 실제 기업들의 후기를 보여주는 섹션
 */
export function NewReviewsSection() {
  const reviews = [
    {
      id: 'company-a',
      companyName: 'A 컴퍼니',
      role: '인사팀 김OO 매니저',
      content: '"팀원들의 만족도가 정말 높았습니다. 재충전의 기회가 되었고, 팀워크도 눈에 띄게 좋아졌어요."',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKr05DAp2IHPB4UyAtgWKElyoqCC-QNBeD5ccaxh4cP_Z8pdsSKaDwMEKW4rAoUGs53M-j3yTXYdCS9ct8Oj5_zDc4_Av2IImsOt5fqNlfv6E47GL8mMN-46tlLYOy2eRLY-LE11CKhekMlHdE1brnRQ9YVwalU39IFYYzSGWTvJbU_sJaI7yYL009cLG5DIrrmO3G3sAmyUL9o_WGYFb-II-kkbTJ1f1PBoIUbwHHWw80tLy-os4RPcCHaAPCs82IZkla1r16RU_Y',
      logoAlt: 'Company A logo'
    },
    {
      id: 'company-b',
      companyName: 'B 기업',
      role: '경영지원팀 박OO 팀장',
      content: '"맞춤형 기획 덕분에 우리 회사에 꼭 필요한 워크샵을 진행할 수 있었습니다. 다음에도 함께하고 싶습니다."',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMweS_l_99Bj0rjvvZjMVMk5c8IsgnymwCrqpdy5OnSfTRdCrVaTFnDtEAcIOBaw7AZyhX6E3N0tCphpSWiQ-5WCUpMz6-boxTGPCuANLO6m4_R3gEAOm9DrO21XYkVRcnSaV9FIBEaS1ObCOnYcdrnxwxus21jl5klPMMUQXWPE4uFSeNTR8WP6ICE8VJeCBPvZpNELjFosPPKSwsIJ_Z-0Q1x1tha9ikJukG_z9SHacgwGDgcn0r7xXHhbCE21kOZ-3vdCOdeVPN',
      logoAlt: 'Company B logo'
    },
    {
      id: 'company-c',
      companyName: 'C 스타트업',
      role: '개발팀 최OO 리더',
      content: '"딱딱한 워크샵이 아니라 모두가 즐겁게 참여할 수 있는 프로그램이어서 좋았습니다."',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8wL-bn_UU2ClV-IyOADwMFDU5MIPMhiJH9P9A6bah_hbW5ItHghlcLZfg70Ffhsr_1mauJFD0SyfACzhvD02R4hUXVYQe9pISeIv1XrJTOMV9aOzLpmIipTDLZSCUH0vbcjqDSpBBXSDoziPBiIGbty-5IwlnAu4PH33ApsDeZTUjVzeFlgpLIzTWevaXF_zVoOhODWtFVTucM2Kz6QyiA6x3IeNwSjPvMijlLfAnW_lrL2wlgnzmNoW8ufhl7ZLHkiGsq4g4Dpj',
      logoAlt: 'Company C logo'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background-dark" id="reviews" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimate animation="slide-up" className="text-center px-4 pb-12 pt-5">
          <span className="inline-block px-4 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-semibold mb-4">
            ⭐ 검증된 성과
          </span>
          <h2 id="reviews-heading" className="text-dark-slate-gray dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.015em] mb-4">
            이미 <span className="text-primary">130개 기업</span>이<br />신뢰하고 있습니다
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-1">82%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">재의뢰율</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-1">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">평균 만족도</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-1">130+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">검증된 기업</div>
            </div>
          </div>
        </ScrollAnimate>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {reviews.map((review, index) => (
            <ScrollAnimate 
              key={review.id}
              animation="slide-up"
              delay={index * 100}
              className="flex flex-col gap-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-6 hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              {/* 별점 */}
              <div className="flex gap-1 mb-2" role="img" aria-label="5점 만점">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg" aria-hidden="true">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed flex-grow italic">
                "{review.content}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                  <Image
                    alt={review.logoAlt}
                    src={review.logo}
                    fill
                    className="object-cover"
                    sizes="48px"
                    loading="lazy"
                    priority={false}
                  />
                </div>
                <div>
                  <h4 className="font-black text-dark-slate-gray dark:text-white">
                    {review.companyName}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
        
        {/* 추가 신뢰 요소 */}
        <ScrollAnimate animation="fade" delay={400} className="mt-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-white dark:bg-gray-900 border-2 border-primary/20">
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-bold text-dark-slate-gray dark:text-white">업계 1위</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">만족도 기준</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm font-bold text-dark-slate-gray dark:text-white">100% 보장</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">효과 보장</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💼</div>
              <div className="text-sm font-bold text-dark-slate-gray dark:text-white">대기업 인증</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">삼성, LG 등</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm font-bold text-dark-slate-gray dark:text-white">지속 성장</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">후속 관리</div>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}

