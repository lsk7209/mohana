'use client'

import Link from "next/link"
import { ScrollAnimate } from "@/components/scroll-animate"

/**
 * 대표 프로그램 섹션 컴포넌트
 * 힐링워크의 주요 프로그램을 소개하는 섹션
 * 클릭 가능한 카드로 구성하여 상세 페이지로 이동
 */
export function NewProgramsSection() {
  const programs = [
    {
      id: 'healing',
      icon: 'self_improvement',
      title: '힐링 프로그램',
      description: '명상, 요가, 숲 치유 등으로 몸과 마음의 안정을 찾습니다.',
      effect: '스트레스 40% 감소',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'teambuilding',
      icon: 'groups',
      title: '팀빌딩 프로그램',
      description: '협업 게임과 액티비티를 통해 팀워크를 강화합니다.',
      effect: '팀워크 50% 향상',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'communication',
      icon: 'chat',
      title: '소통 프로그램',
      description: '서로를 더 깊이 이해하고 긍정적인 관계를 형성합니다.',
      effect: '소통 효율 45% 증가',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'leadership',
      icon: 'school',
      title: '리더십 프로그램',
      description: '리더의 역량을 강화하고, 효과적인 팀 관리를 돕습니다.',
      effect: '리더십 역량 60% 향상',
      color: 'from-orange-400 to-red-500'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-gray-900" id="programs" aria-labelledby="programs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimate animation="slide-up" className="pb-12 pt-5 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            🎯 검증된 솔루션
          </span>
          <h2 id="programs-heading" className="text-dark-slate-gray dark:text-white text-center text-3xl md:text-4xl font-black leading-tight tracking-[-0.015em] mb-4">
            팀의 문제를 해결하는<br />대표 프로그램
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            각 프로그램은 <strong className="text-primary">구체적인 성과</strong>를 보장합니다
          </p>
        </ScrollAnimate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {programs.map((program, index) => (
            <Link 
              key={program.id} 
              href={`/programs/${program.id}`}
              aria-label={`${program.title} 프로그램 상세 페이지로 이동`}
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
            >
              <ScrollAnimate 
                animation="slide-up"
                delay={index * 100}
                className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark gap-4 hover:shadow-xl hover:border-primary/50 hover:scale-105 transition-all cursor-pointer group"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-white text-4xl" aria-hidden="true">
                    {program.icon}
                  </span>
                </div>
                <h3 className="text-dark-slate-gray dark:text-white font-black text-xl group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed min-h-[3rem]">
                  {program.description}
                </p>
                <div className="mt-2 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <span className="text-primary dark:text-primary-light font-bold text-sm">
                    {program.effect}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <span>자세히 보기</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </ScrollAnimate>
            </Link>
          ))}
        </div>
        
        {/* 전체 프로그램 보기 */}
        <ScrollAnimate animation="fade" delay={500} className="mt-8 text-center px-4">
          <Link href="/programs" className="inline-block">
            <button 
              type="button"
              className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="전체 프로그램 목록 페이지로 이동"
            >
              전체 프로그램 보기 →
            </button>
          </Link>
        </ScrollAnimate>
      </div>
    </section>
  )
}

