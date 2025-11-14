'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/components/public-layout'
import { FileText, ListChecks, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react'

interface ProgramDetail {
  id: string
  slug: string
  title: string
  subtitle?: string
  summary?: string
  description?: string
  heroImage?: string
  duration?: number
  headcount?: string
  price?: string
  theme?: string
  curriculum?: string[]
  effects?: string[]
  faq?: Array<{ question: string; answer: string }>
  skills?: string[]
  goals?: Array<{ icon: string; title: string; description: string }>
  reviews?: Array<{ name: string; role: string; content: string; rating: number }>
  relatedPrograms?: Array<{ slug: string; title: string; image: string }>
}

export function ProgramDetailClient({ program }: { program: ProgramDetail }) {
  const [activeTab, setActiveTab] = useState('overview')
  const overviewRef = useRef<HTMLDivElement>(null)
  const curriculumRef = useRef<HTMLDivElement>(null)
  const effectsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (section: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null
    
    switch (section) {
      case 'overview':
        targetRef = overviewRef
        break
      case 'curriculum':
        targetRef = curriculumRef
        break
      case 'effects':
        targetRef = effectsRef
        break
      case 'faq':
        targetRef = faqRef
        break
    }

    if (targetRef?.current) {
      const offset = 100 // 헤더 높이 고려
      const elementPosition = targetRef.current.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveTab(section)
    }
  }

  // Intersection Observer로 현재 보이는 섹션 감지
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section')
          if (sectionId) {
            setActiveTab(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [overviewRef, curriculumRef, effectsRef, faqRef]
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    <PublicLayout>
      <main className="flex flex-1 justify-center py-5 sm:py-8 md:py-12">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:p-0">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-start justify-end px-6 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(16, 34, 29, 0.7) 0%, rgba(16, 34, 29, 0) 100%), url('${program.heroImage}')`,
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      {program.title}
                    </h1>
                    <h2 className="text-gray-200 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      {program.subtitle}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {program.goals.map((goal: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-1 gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 flex-col"
                >
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-text-light-primary dark:text-text-dark-primary text-lg font-bold leading-tight">
                      {goal.title}
                    </h2>
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal leading-normal">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Instructor Section */}
            {program.instructor && (
              <div className="p-4 sm:p-6 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark @container">
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col @[520px]:flex-row gap-8">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 flex-shrink-0 mx-auto @[420px]:mx-0"
                      style={{ backgroundImage: `url("${program.instructor.photo}")` }}
                    />
                    <div className="flex flex-col justify-center space-y-3 text-center @[420px]:text-left">
                      <p className="text-lg italic text-text-light-secondary dark:text-text-dark-secondary">
                        "{program.instructor.quote}"
                      </p>
                      <div>
                        <p className="text-text-light-primary dark:text-text-dark-primary text-2xl font-bold leading-tight tracking-[-0.015em]">
                          {program.instructor.name} 강사
                        </p>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal">
                          {program.instructor.title}
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center @[420px]:justify-start flex-wrap pt-1">
                        {program.instructor.skills.map((skill: string, skillIdx: number) => (
                          <span
                            key={skillIdx}
                            className="text-sm font-medium bg-primary/20 text-text-light-primary dark:text-text-dark-primary py-1 px-3 rounded-full"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border-light dark:border-border-dark pt-6 text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed">
                    <p>{program.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Section - 헤더 아래에 고정 */}
            <div className="sticky top-[57px] z-40 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark shadow-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
              <div className="flex border-b border-border-light dark:border-border-dark sm:gap-2 overflow-x-auto">
                <button
                  onClick={() => scrollToSection('overview')}
                  className={`flex items-center gap-2 whitespace-nowrap py-3 px-4 rounded-t-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">왜 필요한가 (개요)</p>
                </button>
                <button
                  onClick={() => scrollToSection('curriculum')}
                  className={`flex items-center gap-2 whitespace-nowrap py-3 px-4 rounded-t-lg transition-colors ${
                    activeTab === 'curriculum'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <ListChecks className="w-4 h-4" />
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">어떻게 진행되나 (커리큘럼)</p>
                </button>
                <button
                  onClick={() => scrollToSection('effects')}
                  className={`flex items-center gap-2 whitespace-nowrap py-3 px-4 rounded-t-lg transition-colors ${
                    activeTab === 'effects'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">무엇을 얻나 (주요 효과)</p>
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className={`flex items-center gap-2 whitespace-nowrap py-3 px-4 rounded-t-lg transition-colors ${
                    activeTab === 'faq'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <p className="text-sm font-bold leading-normal tracking-[0.015em]">자주 묻는 질문 (FAQ)</p>
                </button>
              </div>
            </div>

            {/* Content Sections - All displayed in order */}
            <div className="space-y-12 md:space-y-16">
              {/* Overview Section */}
              <div
                ref={overviewRef}
                data-section="overview"
                className="scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  왜 필요한가 (개요)
                </h2>
                <div className="space-y-4">
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-base leading-relaxed">
                    <strong className="text-text-light-primary dark:text-text-dark-primary">목적:</strong> 팀원 간의 깊은 공감과 신뢰를 바탕으로, 소통이 활발한 조직 문화를 구축하여 팀 시너지를 극대화합니다.
                  </p>
                  <p className="text-text-light-primary dark:text-text-dark-primary text-base font-normal leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>

              {/* Curriculum Section */}
              <div
                ref={curriculumRef}
                data-section="curriculum"
                className="scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 flex items-center gap-2">
                  <ListChecks className="w-6 h-6 text-primary" />
                  어떻게 진행되나 (커리큘럼)
                </h2>
                <div className="space-y-4">
                  {program.curriculum && program.curriculum.length > 0 ? (
                    <ul className="space-y-4">
                      {program.curriculum.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-text-light-primary dark:text-text-dark-primary text-base font-normal leading-relaxed flex-1">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-relaxed">
                      커리큘럼 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </div>

              {/* Effects Section */}
              <div
                ref={effectsRef}
                data-section="effects"
                className="scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  무엇을 얻나 (주요 효과)
                </h2>
                <div className="space-y-4">
                  {program.effects && program.effects.length > 0 ? (
                    <ul className="space-y-4">
                      {program.effects.map((effect: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5 text-2xl">check_circle</span>
                          <p className="text-text-light-primary dark:text-text-dark-primary text-base font-normal leading-relaxed flex-1">
                            {effect}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-relaxed">
                      주요 효과 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </div>

              {/* FAQ Section */}
              <div
                ref={faqRef}
                data-section="faq"
                className="scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  자주 묻는 질문 (FAQ)
                </h2>
                <div className="space-y-4">
                  {program.faq && program.faq.length > 0 ? (
                    <div className="space-y-4">
                      {program.faq.map((item: { question: string; answer: string }, idx: number) => (
                        <details key={idx} className="group rounded-lg bg-surface-light dark:bg-surface-dark p-4 border border-border-light dark:border-border-dark">
                          <summary className="flex cursor-pointer items-center justify-between font-medium text-text-light-primary dark:text-text-dark-primary">
                            {item.question}
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-text-light-secondary dark:text-text-dark-secondary">expand_more</span>
                          </summary>
                          <div className="mt-3 text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed pl-6">
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-relaxed">
                      FAQ 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {program.reviews && program.reviews.length > 0 && (
              <div className="w-full space-y-8">
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  실제 참여 기업들의 생생한 후기
                </h2>
                <div className="relative w-full">
                  <div className="overflow-hidden">
                    <div className="flex gap-6 -mx-4 px-4">
                      {program.reviews.map((review: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                        >
                          <div className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 h-full">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <img
                                  alt={`${review.company} Logo`}
                                  className="h-10 w-10 rounded-full object-contain bg-white p-1 border border-border-light"
                                  src={review.companyLogo}
                                />
                                <div>
                                  <p className="font-bold text-text-light-primary dark:text-text-dark-primary">
                                    {review.name} {review.role}
                                  </p>
                                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                                    {review.company}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0 rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
                                {review.badge}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={`material-symbols-outlined text-xl ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    style={{
                                      fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0",
                                    }}
                                  >
                                    star
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                                <span>검증된 후기</span>
                              </div>
                            </div>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    우리 팀의 변화, 다음 후기의 주인공이 되어보세요.
                  </p>
                  <Link href="/contact">
                    <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-text-light-primary text-sm font-bold leading-normal tracking-[0.015em]">
                      <span className="truncate">무료 제안서 받기</span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Related Programs */}
            {program.relatedPrograms && program.relatedPrograms.length > 0 && (
              <div className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  이런 프로그램은 어떠세요?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {program.relatedPrograms.map((related: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/programs/${related.slug}`}
                      className="flex flex-col gap-3 group cursor-pointer"
                    >
                      <div
                        className="aspect-[4/3] w-full bg-cover bg-center rounded-lg overflow-hidden"
                        style={{ backgroundImage: `url('${related.image}')` }}
                      />
                      <p className="font-bold text-text-light-primary dark:text-text-dark-primary group-hover:text-primary transition-colors">
                        {related.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Final CTA */}
            <div className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-8 sm:p-12 text-center flex flex-col items-center gap-6">
              <h2 className="text-2xl sm:text-3xl font-black text-text-light-primary dark:text-text-dark-primary max-w-lg">
                이제 우리 팀도 회복할 차례입니다.
              </h2>
              <p className="text-text-light-secondary dark:text-text-dark-secondary -mt-2">
                망설이는 순간, 팀의 에너지는 계속 소진됩니다. 지금 바로 변화를 시작하세요.
              </p>
              <Link href="/contact">
                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-text-light-primary text-base font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">무료 제안서 받고 팀 에너지 충전하기</span>
                </Button>
              </Link>
              <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                *제안서 요청 시, 개인정보는 안전하게 보호되며 상담 외 목적으로 사용되지 않습니다.
              </p>
            </div>
          </div>
        </main>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact">
          <Button className="w-auto h-12 px-5 rounded-full bg-primary text-text-light-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all font-bold text-base gap-2">
            <span className="material-symbols-outlined text-2xl">description</span>
            <span>무료 제안서 받기</span>
          </Button>
        </Link>
      </div>
    </PublicLayout>
  )
}

