interface Review {
  id: string
  company: string
  position: string
  logo: string
  comment: string
  rating: number
}

export function ReviewsSection() {
  const reviews: Review[] = [
    {
      id: 'company-a',
      company: 'A 컴퍼니',
      position: '인사팀장',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKr05DAp2IHPB4UyAtgWKElyoqCC-QNBeD5ccaxh4cP_Z8pdsSKaDwMEKW4rAoUGs53M-j3yTXYdCS9ct8Oj5_zDc4_Av2IImsOt5fqNlfv6E47GL8mMN-46tlLYOy2eRLY-LE11CKhekMlHdE1brnRQ9YVwalU39IFYYzSGWTvJbU_sJaI7yYL009cLG5DIrrmO3G3sAmyUL9o_WGYFb-II-kkbTJ1f1PBoIUbwHHWw80tLy-os4RPcCHaAPCs82IZkla1r16RU_Y',
      comment: '"팀원들의 만족도가 정말 높았습니다. 재충전의 기회가 되었고, 팀워크도 눈에 띄게 좋아졌어요."',
      rating: 95,
    },
    {
      id: 'company-b',
      company: 'B 기업',
      position: '대표이사',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMweS_l_99Bj0rjvvZjMVMk5c8IsgnymwCrqpdy5OnSfTRdCrVaTFnDtEAcIOBaw7AZyhX6E3N0tCphpSWiQ-5WCUpMz6-boxTGPCuANLO6m4_R3gEAOm9DrO21XYkVRcnSaV9FIBEaS1ObCOnYcdrnxwxus21jl5klPMMUQXWPE4uFSeNTR8WP6ICE8VJeCBPvZpNELjFosPPKSwsIJ_Z-0Q1x1tha9ikJukG_z9SHacgwGDgcn0r7xXHhbCE21kOZ-3vdCOdeVPN',
      comment: '"맞춤형 기획 덕분에 우리 회사에 꼭 필요한 워크샵을 진행할 수 있었습니다. 다음에도 함께하고 싶습니다."',
      rating: 98,
    },
    {
      id: 'company-c',
      company: 'C 스타트업',
      position: '개발팀 리더',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8wL-bn_UU2ClV-IyOADwMFDU5MIPMhiJH9P9A6bah_hbW5ItHghlcLZfg70Ffhsr_1mauJFD0SyfACzhvD02R4hUXVYQe9pISeIv1XrJTOMV9aOzLpmIipTDLZSCUH0vbcjqDSpBBXSDoziPBiIGbty-5IwlnAu4PH33ApsDeZTUjVzeFlgpLIzTWevaXF_zVoOhODWtFVTucM2Kz6QyiA6x3IeNwSjPvMijlLfAnW_lrL2wlgnzmNoW8ufhl7ZLHkiGsq4g4Dpj',
      comment: '"딱딱한 워크샵이 아니라 모두가 즐겁게 참여할 수 있는 프로그램이어서 좋았습니다."',
      rating: 92,
    },
  ]

  return (
    <section id="reviews" className="py-16 md:py-24">
      <h2 className="text-dark-slate-gray dark:text-white text-center text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5">
        고객 후기
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-6">
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 rounded-full"
                alt={`${review.company} logo`}
                src={review.logo}
              />
              <div>
                <h4 className="font-bold text-dark-slate-gray dark:text-white">{review.company}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{review.position}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${review.rating}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
