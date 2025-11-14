'use client'

import Image from "next/image"
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
    <section className="py-16 md:py-24" id="concerns" aria-labelledby="concerns-heading">
      <ScrollAnimate animation="slide-up" className="px-4 pb-8 pt-5">
        <h2 id="concerns-heading" className="text-dark-slate-gray dark:text-white text-center text-3xl font-bold leading-tight tracking-[-0.015em]">
          혹시 이런 고민이 있으신가요?
        </h2>
      </ScrollAnimate>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {concerns.map((concern, index) => (
          <ScrollAnimate 
            key={concern.id}
            animation="slide-up" 
            delay={index * 100}
            className="flex flex-col flex-1 gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-6 text-center items-center"
          >
            <div className="w-40 h-40 flex items-center justify-center text-gray-400 relative">
              <Image
                alt={concern.imageAlt}
                src={concern.image}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-dark-slate-gray dark:text-white text-lg font-bold leading-tight">
                {concern.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed">
                {concern.description}
              </p>
            </div>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  )
}

