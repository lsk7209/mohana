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
    <section className="py-16 md:py-24" id="reviews" aria-labelledby="reviews-heading">
      <ScrollAnimate animation="slide-up" className="text-center px-4 pb-8 pt-5">
        <h2 id="reviews-heading" className="text-dark-slate-gray dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
          이미 많은 기업들이 신뢰하고 있습니다
        </h2>
        <p className="text-primary text-lg font-medium mt-2">
          지난달 37개 기업 중 82% 재의뢰
        </p>
      </ScrollAnimate>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {reviews.map((review, index) => (
          <ScrollAnimate 
            key={review.id}
            animation="slide-up"
            delay={index * 100}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  alt={review.logoAlt}
                  src={review.logo}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <h4 className="font-bold text-dark-slate-gray dark:text-white">
                  {review.companyName}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.role}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {review.content}
            </p>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  )
}

