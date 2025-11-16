'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimate } from "@/components/scroll-animate"

/**
 * 가치 섹션 컴포넌트
 * 힐링워크가 제공하는 특별한 가치를 소개하는 섹션
 * Before/After 비교와 구체적인 혜택 제시
 */
export function ValuesSection() {
  const values = [
    {
      id: 'verified-instructors',
      icon: 'verified_user',
      title: '검증된 강사진',
      description: '각 분야 최고의 전문가들이 함께합니다.',
      benefit: '전문성 보장',
      before: '일반 강사로 인한 실망',
      after: '검증된 전문가의 확실한 효과'
    },
    {
      id: 'customized-programs',
      icon: 'tune',
      title: '맞춤형 프로그램',
      description: '기업의 목표와 상황에 최적화된 프로그램을 설계합니다.',
      benefit: '100% 맞춤 설계',
      before: '일괄적인 프로그램',
      after: '우리 회사만의 특별한 경험'
    },
    {
      id: 'ongoing-consulting',
      icon: 'autorenew',
      title: '지속적인 후속 컨설팅',
      description: '일회성으로 끝나지 않는 지속적인 성장을 지원합니다.',
      benefit: '지속 가능한 변화',
      before: '일회성으로 끝나는 워크샵',
      after: '지속적인 성장과 변화'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-primary/5 to-white dark:from-background-dark dark:via-primary/10 dark:to-background-dark" id="values" aria-labelledby="values-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 px-4 py-10">
          <ScrollAnimate animation="slide-up" className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              ✨ 특별한 차별점
            </span>
            <h2 
              id="values-heading"
              className="text-dark-slate-gray dark:text-white tracking-light text-3xl sm:text-4xl md:text-5xl font-black leading-tight sm:tracking-[-0.033em] max-w-[800px] mx-auto mb-4"
            >
              왜 힐링워크를 선택해야 할까요?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-[720px] mx-auto">
              단순한 워크샵이 아닙니다.<br />
              <strong className="text-primary">조직의 근본적인 변화</strong>를 만드는 솔루션입니다.
            </p>
          </ScrollAnimate>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0">
            {values.map((value, index) => (
              <ScrollAnimate 
                key={value.id}
                animation="scale"
                delay={index * 100}
                className="flex flex-col flex-1 gap-4 rounded-xl bg-gradient-to-br from-white to-primary/5 dark:from-background-dark dark:to-primary/10 p-8 items-center text-center shadow-lg border-2 border-primary/20 dark:border-primary/30 hover:shadow-xl hover:border-primary/40 transition-all group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <span 
                    className="material-symbols-outlined !text-5xl" 
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                    aria-hidden="true"
                  >
                    {value.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-dark-slate-gray dark:text-white text-xl font-black leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Before/After 비교 */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-500 font-bold">✗</span>
                      <span className="text-gray-500 dark:text-gray-400 line-through">{value.before}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-primary font-bold">{value.after}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <span className="text-primary dark:text-primary-light font-bold text-sm">{value.benefit}</span>
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>

          {/* 추가 혜택 */}
          <ScrollAnimate animation="fade" delay={400} className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-white dark:bg-gray-900 border-2 border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-black text-primary mb-1">3시간</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">짧은 시간에 큰 변화</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-primary mb-1">130+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">검증된 기업</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-primary mb-1">82%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">재의뢰율</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-primary mb-1">100%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">맞춤 설계</div>
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  )
}

