'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"

/**
 * 고민 섹션 컴포넌트
 * 기업이 겪는 주요 고민들을 시각적으로 표현하는 섹션
 */
export function ConcernsSection() {
  const concerns = [
    {
      id: 'stress',
      title: '스트레스',
      description: '높은 업무 강도와 스트레스로 지친 팀원들',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjB6axSse84W_c3H0NHLteteSsxbVuNaZ4GqM70Jp75UwlzbK9FRPLdrJOVE8JaDSyZJ0k9PXmhD0jZs5tsrwxHRww6umO3cErL-G1gV_vSkjwOr8-WqnNdNejobviR4xzlZ8OzP-3G7X57N8ZLbfI8Ov6f4N7A2HvCpWBdyUzTkepHTtn8aqS2V9fJ63741vvpDliOSJU6bndTRWGiw25VUiV-iP6n419Ou7AlzcwfV4WqJ0V_WxLEAvyeDik0gkgk156h5TNd1DK',
      imageAlt: 'Minimalist illustration representing stress with a person surrounded by complex thoughts'
    },
    {
      id: 'communication',
      title: '소통 단절',
      description: '부서 간, 팀원 간 원활한 소통의 어려움',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ0SYaG3CgaLI2rtsxRyg9ot17mMft79cZkgazjALk0l_mhQiysSi_Ji1KRuccfx_XHO8RjzGRTLzZy0YXIkOlovWMysGKJjuMveY7nscZ0UDR4VGGF_Qv122uPkijpfqo_cgyhY3i67i6wE_be9ZKG9TNnhEa4oKQokpXYkhDbIep82DyMXfF0T1wpM41qB-GDPlEh8Ww1gjuKGlCOocHA3SLlz-dtSNsReCwU3tdW0JWkSOLy6d4va4RFgM4pTQ_OXyJHyV6k7F-',
      imageAlt: 'Minimalist illustration representing a communication breakdown with two figures back-to-back'
    },
    {
      id: 'burnout',
      title: '피로한 팀',
      description: '반복되는 일상에 번아웃을 느끼는 팀',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-X2ZO6Af8XqzJRzCB_C03UIpF3KTyt9NVy3GD4SLGMcK1pqpoL1NEa8449z09tyK4DybIoWLyP4z9WGOwjzIEqZ-59UrleuSoLMnyQikHLuNUzVDWn4FmrcXLQKXvUFbgFicPp_e0enpMJlt7cRSpBnIHrQ6OrchE-0jQfUCqY7A4fQbwdjdVBzEVJBfz1JkuMs8QZN8ZMQCqZTsHIo1yUFoLPWAjfV-xqSGODTt7FtlAJyi2T1DHzVxHMnZhhCKvkfpFaj5A-f6',
      imageAlt: 'Minimalist illustration representing a tired team, showing an exhausted team member'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background-dark" id="concerns" aria-labelledby="concerns-heading">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimate animation="slide-up" className="px-4 pb-12 pt-5">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold mb-4">
              ⚠️ 많은 기업이 겪고 있는 문제
            </span>
            <h2 id="concerns-heading" className="text-dark-slate-gray dark:text-white text-center text-3xl md:text-4xl font-black leading-tight tracking-[-0.015em] mb-4">
              혹시 이런 고민이 있으신가요?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              이런 문제들을 방치하면 <strong className="text-red-600 dark:text-red-400">팀의 생산성과 사기가 급격히 떨어집니다</strong>
            </p>
          </div>
        </ScrollAnimate>
        
        {/* 통계 배너 */}
        <ScrollAnimate animation="slide-up" delay={100} className="mb-12">
          <div className="mx-4 p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-1">73%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">직원들이 업무 스트레스로 고민</div>
              </div>
              <div>
                <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-1">58%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">팀 내 소통 문제로 인한 갈등</div>
              </div>
              <div>
                <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-1">65%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">번아웃으로 인한 이직 고려</div>
              </div>
            </div>
          </div>
        </ScrollAnimate>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {concerns.map((concern, index) => (
            <ScrollAnimate 
              key={concern.id}
              animation="slide-up" 
              delay={index * 100 + 200}
              className="flex flex-col flex-1 gap-4 rounded-xl border-2 border-red-100 dark:border-red-900/30 bg-white dark:bg-background-dark p-6 text-center items-center hover:shadow-lg hover:border-red-300 dark:hover:border-red-700 transition-all cursor-pointer group"
            >
              <div className="w-40 h-40 flex items-center justify-center text-gray-400 relative group-hover:scale-110 transition-transform">
                <Image
                  alt={concern.imageAlt}
                  src={concern.image}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-dark-slate-gray dark:text-white text-xl font-black leading-tight">
                  {concern.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-relaxed">
                  {concern.description}
                </p>
                <div className="mt-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold">
                  이대로 방치하면 위험합니다
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>

        {/* 해결책 제시 */}
        <ScrollAnimate animation="fade" delay={500} className="mt-12 px-4">
          <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20">
            <h3 className="text-2xl font-black text-dark-slate-gray dark:text-white mb-3">
              하지만 걱정하지 마세요!
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              힐링워크가 <strong className="text-primary">3시간 만에</strong> 팀의 분위기를 바꿔드립니다
            </p>
            <Link href="/contact">
              <Button className="mt-4 bg-primary text-white hover:bg-primary/90 h-12 px-8 rounded-full font-bold">
                지금 바로 해결책 보기 →
              </Button>
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}

