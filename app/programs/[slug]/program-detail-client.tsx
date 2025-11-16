'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/components/public-layout'
import { FileText, ListChecks, Sparkles, HelpCircle, ShieldCheck, Clock, Users, Calendar, DollarSign, MapPin, CheckCircle2, ArrowRight, Star } from 'lucide-react'

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
  keywords?: string[]
  points?: string[]
  bookingSteps?: Array<{ step: number; title: string; description: string }>
  format?: string
  location?: string
  notes?: string[]
  goals?: Array<{ icon: string; title: string; description: string }>
  reviews?: Array<{ name: string; role: string; content: string; rating: number; company?: string; companyLogo?: string; badge?: string }>
  relatedPrograms?: Array<{ slug: string; title: string; image: string }>
  instructor?: {
    name: string
    title: string
    bio: string
    quote: string
    photo: string
    skills: string[]
  }
}

export function ProgramDetailClient({ program }: { program: ProgramDetail }) {
  const [activeTab, setActiveTab] = useState('overview')
  const overviewRef = useRef<HTMLElement>(null)
  const curriculumRef = useRef<HTMLElement>(null)
  const effectsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)

  const scrollToSection = (section: string) => {
    let targetRef: React.RefObject<HTMLElement | null> | null = null
    
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
      <main className="flex flex-1 justify-center py-4 sm:py-6 md:py-8 lg:py-12">
          <article className="layout-content-container flex flex-col max-w-[960px] flex-1 px-3 sm:px-4 md:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            {/* Hero Section */}
            <header className="@container">
              <div className="@[480px]:p-0">
                <div
                  className="flex min-h-[280px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[480px] flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 bg-cover bg-center bg-no-repeat rounded-lg sm:rounded-xl items-start justify-end px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:pb-10 lg:px-10"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(16, 34, 29, 0.75) 0%, rgba(16, 34, 29, 0.3) 50%, rgba(16, 34, 29, 0) 100%), url('${program.heroImage}')`,
                  }}
                  role="img"
                  aria-label={`${program.title} 프로그램 히어로 이미지`}
                >
                  <div className="flex flex-col gap-1.5 sm:gap-2 text-left w-full">
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-[-0.02em] sm:tracking-[-0.033em] break-words">
                      {program.title}
                    </h1>
                    {program.subtitle && (
                      <p className="text-gray-100 sm:text-gray-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed break-words">
                        {program.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Program Info Summary Cards */}
            <section aria-label="프로그램 기본 정보" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {program.duration && (
                <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary font-medium">소요시간</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary">
                    {program.duration}시간
                  </p>
                </div>
              )}
              {program.headcount && (
                <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary font-medium">참가인원</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary">
                    {program.headcount}
                  </p>
                </div>
              )}
              {program.format && (
                <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary font-medium">형식</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary">
                    {program.format}
                  </p>
                </div>
              )}
              {program.price && (
                <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary font-medium">가격</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-text-light-primary dark:text-text-dark-primary">
                    {program.price}
                  </p>
                </div>
              )}
            </section>

            {/* Keywords Section */}
            {program.keywords && program.keywords.length > 0 && (
              <section aria-label="프로그램 키워드" className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-3 sm:px-4 md:px-6 lg:px-8">
                <span className="text-xs sm:text-xs md:text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary mr-0.5 sm:mr-1 whitespace-nowrap">KEYWORD</span>
                {program.keywords.map((keyword: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 sm:py-1 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-xs md:text-sm lg:text-base font-medium border border-primary/20 whitespace-nowrap"
                  >
                    #{keyword}
                  </span>
                ))}
              </section>
            )}

            {/* Program Points Section */}
            {program.points && program.points.length > 0 && (
              <section aria-label="프로그램 핵심 포인트" className="rounded-lg border border-border-light dark:border-border-dark bg-gradient-to-br from-primary/5 to-primary/10 p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  프로그램 핵심 포인트
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  {program.points.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-5 h-5 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm sm:text-sm md:text-base text-text-light-primary dark:text-text-dark-primary leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Booking Steps Section */}
            {program.bookingSteps && program.bookingSteps.length > 0 && (
              <section aria-label="예약 과정 안내" className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4 sm:mb-6 md:mb-8">
                  프로그램 예약 과정
                </h2>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {program.bookingSteps.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-3 sm:gap-4 md:gap-6">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm sm:text-base md:text-lg shadow-md">
                          {step.step}
                        </div>
                        {idx < program.bookingSteps!.length - 1 && (
                          <div className="w-0.5 h-6 sm:h-8 md:h-12 bg-gradient-to-b from-primary/50 to-transparent mt-1.5 sm:mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5 sm:pt-1">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-2 leading-tight">
                          STEP {String(step.step).padStart(2, '0')} {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Goals Cards */}
            {program.goals && program.goals.length > 0 && (
              <section aria-label="프로그램 목표 및 추천 대상" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {program.goals.map((goal: any, idx: number) => (
                  <article
                    key={idx}
                    className="flex flex-1 gap-2.5 sm:gap-3 md:gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 sm:p-4 md:p-6 flex-col"
                  >
                    <div className="text-primary" aria-hidden="true">
                      <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl">{goal.icon}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <h2 className="text-text-light-primary dark:text-text-dark-primary text-base sm:text-base md:text-lg font-bold leading-tight">
                        {goal.title}
                      </h2>
                      <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs sm:text-xs md:text-sm font-normal leading-normal">
                        {goal.description}
                      </p>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {/* Instructor Section */}
            {program.instructor && (
              <section aria-label="강사 소개" className="p-3 sm:p-4 md:p-6 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark @container -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 mx-3 sm:mx-4 md:mx-6 lg:mx-8">
                <div className="flex w-full flex-col gap-3 sm:gap-4 md:gap-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                    <img
                      src={program.instructor.photo}
                      alt={`${program.instructor.name} 강사 프로필 사진`}
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-18 w-18 sm:h-22 sm:w-22 md:h-28 md:w-28 lg:h-32 lg:w-32 flex-shrink-0 mx-auto sm:mx-0 object-cover"
                    />
                    <div className="flex flex-col justify-center space-y-1.5 sm:space-y-2 md:space-y-3 text-center sm:text-left w-full">
                      <blockquote className="text-sm sm:text-base md:text-base lg:text-lg italic text-text-light-secondary dark:text-text-dark-secondary leading-relaxed break-words">
                        "{program.instructor.quote}"
                      </blockquote>
                      <div>
                        <h2 className="text-text-light-primary dark:text-text-dark-primary text-lg sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] break-words">
                          {program.instructor.name} 강사
                        </h2>
                        <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs sm:text-sm md:text-sm lg:text-base font-normal leading-normal mt-0.5 break-words">
                          {program.instructor.title}
                        </p>
                      </div>
                      <div className="flex gap-1.5 sm:gap-2 justify-center sm:justify-start flex-wrap pt-0.5 sm:pt-1" role="list" aria-label="강사 전문 분야">
                        {program.instructor.skills.map((skill: string, skillIdx: number) => (
                          <span
                            key={skillIdx}
                            role="listitem"
                            className="text-xs sm:text-xs md:text-sm lg:text-sm font-medium bg-primary/20 text-text-light-primary dark:text-text-dark-primary py-0.5 px-2 sm:py-0.5 sm:px-2.5 md:py-1 md:px-2.5 lg:px-3 rounded-full whitespace-nowrap"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border-light dark:border-border-dark pt-3 sm:pt-4 md:pt-6 text-text-light-secondary dark:text-text-dark-secondary text-xs sm:text-sm md:text-sm leading-relaxed break-words">
                    <p>{program.instructor.bio}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Tab Section - 헤더 아래에 고정 */}
            <nav className="sticky top-[57px] z-40 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark shadow-sm sm:shadow-md -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 px-0 sm:px-4 md:px-6 lg:px-8 backdrop-blur-sm" aria-label="프로그램 상세 정보 네비게이션">
              <div className="flex border-b border-border-light dark:border-border-dark gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto scrollbar-hide px-3 sm:px-0" role="tablist">
                <button
                  onClick={() => scrollToSection('overview')}
                  role="tab"
                  aria-selected={activeTab === 'overview'}
                  aria-controls="overview-section"
                  id="overview-tab"
                  className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap py-2.5 sm:py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 rounded-t-md sm:rounded-t-lg transition-colors text-xs sm:text-sm md:text-sm min-w-fit ${
                    activeTab === 'overview'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold leading-normal tracking-[0.01em] sm:tracking-[0.015em]">
                    <span className="hidden md:inline">왜 필요한가 (개요)</span>
                    <span className="hidden sm:inline md:hidden">개요</span>
                    <span className="sm:hidden">개요</span>
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('curriculum')}
                  role="tab"
                  aria-selected={activeTab === 'curriculum'}
                  aria-controls="curriculum-section"
                  id="curriculum-tab"
                  className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap py-2.5 sm:py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 rounded-t-md sm:rounded-t-lg transition-colors text-xs sm:text-sm md:text-sm min-w-fit ${
                    activeTab === 'curriculum'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <ListChecks className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold leading-normal tracking-[0.01em] sm:tracking-[0.015em]">
                    <span className="hidden md:inline">어떻게 진행되나 (커리큘럼)</span>
                    <span className="hidden sm:inline md:hidden">커리큘럼</span>
                    <span className="sm:hidden">커리큘럼</span>
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('effects')}
                  role="tab"
                  aria-selected={activeTab === 'effects'}
                  aria-controls="effects-section"
                  id="effects-tab"
                  className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap py-2.5 sm:py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 rounded-t-md sm:rounded-t-lg transition-colors text-xs sm:text-sm md:text-sm min-w-fit ${
                    activeTab === 'effects'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold leading-normal tracking-[0.01em] sm:tracking-[0.015em]">
                    <span className="hidden md:inline">무엇을 얻나 (주요 효과)</span>
                    <span className="hidden sm:inline md:hidden">효과</span>
                    <span className="sm:hidden">효과</span>
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  role="tab"
                  aria-selected={activeTab === 'faq'}
                  aria-controls="faq-section"
                  id="faq-tab"
                  className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap py-2.5 sm:py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 rounded-t-md sm:rounded-t-lg transition-colors text-xs sm:text-sm md:text-sm min-w-fit ${
                    activeTab === 'faq'
                      ? 'bg-primary text-white'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light dark:hover:bg-surface-dark/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="font-bold leading-normal tracking-[0.01em] sm:tracking-[0.015em]">
                    <span className="hidden md:inline">자주 묻는 질문 (FAQ)</span>
                    <span className="hidden sm:inline md:hidden">FAQ</span>
                    <span className="sm:hidden">FAQ</span>
                  </span>
                </button>
              </div>
            </nav>

            {/* Content Sections - All displayed in order */}
            <div className="space-y-12 md:space-y-16">
              {/* Overview Section */}
              <section
                ref={overviewRef}
                data-section="overview"
                id="overview-section"
                role="tabpanel"
                aria-labelledby="overview-tab"
                className="scroll-mt-20 sm:scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-4 sm:p-6 md:p-8"
              >
                <h2 id="overview-heading" className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4 sm:mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  왜 필요한가 (개요)
                </h2>
                <div className="space-y-4 prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base">
                  <p className="text-text-light-primary dark:text-text-dark-primary text-base sm:text-base font-normal leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </section>

              {/* Curriculum Section */}
              <section
                ref={curriculumRef}
                data-section="curriculum"
                id="curriculum-section"
                role="tabpanel"
                aria-labelledby="curriculum-tab"
                className="scroll-mt-20 sm:scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-4 sm:p-6 md:p-8"
              >
                <h2 id="curriculum-heading" className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 sm:mb-8 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  어떻게 진행되나 (커리큘럼)
                </h2>
                <div className="space-y-4">
                  {program.curriculum && program.curriculum.length > 0 ? (
                    <div className="space-y-4">
                      {program.curriculum.map((item: string, idx: number) => {
                        // 커리큘럼 항목 파싱: "시간: 제목 - 설명" 형식
                        const timeMatch = item.match(/^(\d+시간):\s*(.+?)(?:\s*-\s*(.+))?$/)
                        const time = timeMatch ? timeMatch[1] : null
                        const title = timeMatch ? timeMatch[2].trim() : null
                        const description = timeMatch && timeMatch[3] ? timeMatch[3].trim() : item
                        const curriculumLength = program.curriculum?.length || 0

                        return (
                          <article
                            key={idx}
                            className="group relative rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-900/50 p-4 sm:p-6 transition-all hover:shadow-md hover:border-primary/30"
                          >
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                              {/* 단계 번호 및 시간 */}
                              <div className="flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-2 flex-shrink-0">
                                <div className="relative">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:border-primary/50 transition-colors">
                                    <span className="text-primary font-bold text-base sm:text-lg">{idx + 1}</span>
                                  </div>
                                  {idx < curriculumLength - 1 && (
                                    <div className="hidden sm:block absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent transform -translate-x-1/2 mt-2" />
                                  )}
                                </div>
                                {time && (
                                  <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold whitespace-nowrap">
                                    <Clock className="w-3 h-3" aria-hidden="true" />
                                    <span>{time}</span>
                                  </div>
                                )}
                              </div>

                              {/* 내용 */}
                              <div className="flex-1 sm:pt-1">
                                {title ? (
                                  <>
                                    <h3 className="text-base sm:text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-1.5 sm:mb-2 leading-tight">
                                      {title}
                                    </h3>
                                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm sm:text-sm leading-relaxed">
                                      {description}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-text-light-primary dark:text-text-dark-primary text-base sm:text-base leading-relaxed">
                                    {item}
                                  </p>
                                )}
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-relaxed">
                      커리큘럼 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </section>

              {/* Effects Section */}
              <section
                ref={effectsRef}
                data-section="effects"
                id="effects-section"
                role="tabpanel"
                aria-labelledby="effects-tab"
                className="scroll-mt-20 sm:scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-4 sm:p-6 md:p-8"
              >
                <h2 id="effects-heading" className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4 sm:mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  무엇을 얻나 (주요 효과)
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {program.effects && program.effects.length > 0 ? (
                    <ul className="space-y-3 sm:space-y-4">
                      {program.effects.map((effect: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 sm:gap-4">
                          <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5 text-xl sm:text-2xl">check_circle</span>
                          <p className="text-text-light-primary dark:text-text-dark-primary text-base sm:text-base font-normal leading-relaxed flex-1">
                            {effect}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm sm:text-base font-normal leading-relaxed">
                      주요 효과 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </section>

              {/* FAQ Section */}
              <section
                ref={faqRef}
                data-section="faq"
                id="faq-section"
                role="tabpanel"
                aria-labelledby="faq-tab"
                className="scroll-mt-20 sm:scroll-mt-24 rounded-lg bg-surface-light dark:bg-surface-dark shadow-sm p-4 sm:p-6 md:p-8"
              >
                <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4 sm:mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  자주 묻는 질문 (FAQ)
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {program.faq && program.faq.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {program.faq.map((item: { question: string; answer: string }, idx: number) => (
                        <details key={idx} className="group rounded-lg bg-surface-light dark:bg-surface-dark p-3 sm:p-4 border border-border-light dark:border-border-dark">
                          <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-base sm:text-base text-text-light-primary dark:text-text-dark-primary">
                            <span className="flex-1">{item.question}</span>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-text-light-secondary dark:text-text-dark-secondary flex-shrink-0">expand_more</span>
                          </summary>
                          <div className="mt-3 text-text-light-secondary dark:text-text-dark-secondary text-sm sm:text-sm leading-relaxed pl-0 sm:pl-6">
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm sm:text-base font-normal leading-relaxed">
                      FAQ 정보를 준비 중입니다.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Reviews Section */}
            {program.reviews && program.reviews.length > 0 && (
              <div className="w-full space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  실제 참여 기업들의 생생한 후기
                </h2>
                <div className="relative w-full">
                  <div className="overflow-hidden">
                    <div className="flex gap-4 sm:gap-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
                      {program.reviews.map((review: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                        >
                          <div className="flex flex-col gap-3 sm:gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 sm:p-6 h-full">
                            <div className="flex items-start justify-between gap-3 sm:gap-4">
                              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                <img
                                  alt={`${review.company} Logo`}
                                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-contain bg-white p-1 border border-border-light flex-shrink-0"
                                  src={review.companyLogo}
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="font-bold text-sm sm:text-base text-text-light-primary dark:text-text-dark-primary truncate">
                                    {review.name} {review.role}
                                  </p>
                                  <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary truncate">
                                    {review.company}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0 rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-2 sm:px-3 py-1">
                                {review.badge}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={`material-symbols-outlined text-lg sm:text-xl ${
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
                              <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
                                <span className="hidden sm:inline">검증된 후기</span>
                              </div>
                            </div>
                            <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs sm:text-sm leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary text-center">
                    우리 팀의 변화, 다음 후기의 주인공이 되어보세요.
                  </p>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button className="flex w-full sm:min-w-[84px] sm:max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-text-light-primary text-sm font-bold leading-normal tracking-[0.015em]">
                      <span className="truncate">무료 제안서 받기</span>
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Related Programs */}
            {program.relatedPrograms && program.relatedPrograms.length > 0 && (
              <div className="w-full space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  이런 프로그램은 어떠세요?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {program.relatedPrograms.map((related: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/programs/${related.slug}`}
                      className="flex flex-col gap-2 sm:gap-3 group cursor-pointer"
                    >
                      <div
                        className="aspect-[4/3] w-full bg-cover bg-center rounded-lg overflow-hidden"
                        style={{ backgroundImage: `url('${related.image}')` }}
                      />
                      <p className="font-bold text-sm sm:text-base text-text-light-primary dark:text-text-dark-primary group-hover:text-primary transition-colors">
                        {related.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Section */}
            {program.notes && program.notes.length > 0 && (
              <section aria-label="안내사항" className="rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-3 sm:p-4 md:p-6 lg:p-8">
                <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary mb-3 sm:mb-4 md:mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                  안내사항
                </h2>
                <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  {program.notes.map((note: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                      <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5 text-lg sm:text-lg md:text-xl">info</span>
                      <p className="text-sm sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed flex-1">
                        {note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Final CTA */}
            <aside className="w-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 dark:border-primary/20 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 text-center flex flex-col items-center gap-3 sm:gap-4 md:gap-6 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 mx-3 sm:mx-4 md:mx-6 lg:mx-8" aria-label="프로그램 신청 안내">
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 w-full">
                <Star className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" aria-hidden="true" />
                <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-black text-text-light-primary dark:text-text-dark-primary max-w-lg leading-tight break-words">
                  이제 우리 팀도 회복할 차례입니다.
                </h2>
              </div>
              <p className="text-sm sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary -mt-0.5 sm:-mt-1 md:-mt-2 px-2 break-words">
                망설이는 순간, 팀의 에너지는 계속 소진됩니다. 지금 바로 변화를 시작하세요.
              </p>
              <Link href="/contact" aria-label="무료 제안서 받기 - 문의 페이지로 이동" className="w-full sm:w-auto group touch-manipulation">
                <Button className="flex w-full sm:min-w-[84px] sm:max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 sm:h-12 md:h-13 px-4 sm:px-5 md:px-6 bg-primary text-text-light-primary text-base sm:text-base md:text-lg font-bold leading-normal tracking-[0.015em] shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 gap-2 touch-manipulation">
                  <span className="truncate">
                    <span className="hidden sm:inline">무료 제안서 받고 팀 에너지 충전하기</span>
                    <span className="sm:hidden">무료 제안서 받기</span>
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
                </Button>
              </Link>
              <p className="text-xs sm:text-xs text-text-light-secondary dark:text-text-dark-secondary px-2 break-words">
                *제안서 요청 시, 개인정보는 안전하게 보호되며 상담 외 목적으로 사용되지 않습니다.
              </p>
            </aside>
          </article>
        </main>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-50" aria-label="고정된 신청 버튼">
        <Link href="/contact" aria-label="무료 제안서 받기 - 문의 페이지로 이동">
          <Button className="w-auto h-11 sm:h-12 md:h-14 px-3 sm:px-4 md:px-5 rounded-full bg-primary text-text-light-primary flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all font-bold text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 touch-manipulation">
            <span className="material-symbols-outlined text-xl sm:text-2xl md:text-2xl" aria-hidden="true">description</span>
            <span className="hidden sm:inline">무료 제안서 받기</span>
          </Button>
        </Link>
      </div>
    </PublicLayout>
  )
}

