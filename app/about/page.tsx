'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/components/public-layout'
import { Heart, Users, TrendingUp, CheckCircle2, Sparkles, Handshake, Target, ArrowRight } from 'lucide-react'
import { ScrollAnimate } from '@/components/scroll-animate'

/**
 * 소개 페이지 컴포넌트
 * 힐링워크 브랜드의 미션, 스토리, 신뢰를 담당자에게 전달하는 페이지
 * 
 * @example
 * <AboutPage />
 */
export default function AboutPage() {
  return (
    <PublicLayout>
      <main className="flex flex-1 justify-center py-8 md:py-12">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
          {/* Hero Section */}
          <ScrollAnimate animation="fade">
            <section className="text-center space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              조직 힐링 파트너
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] text-text-light-primary dark:text-text-dark-primary">
              성과보다 중요한 건,<br />
              <span className="text-primary">사람의 에너지</span>입니다.
            </h1>
            <p className="text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
              성과를 내는 팀은 많지만,<br />
              지금 진짜 필요한 건 <strong className="text-text-light-primary dark:text-text-dark-primary">지친 마음을 회복시키는 시간</strong>입니다.
            </p>
            <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              힐링워크는 기업이 사람 중심으로 다시 숨 쉴 수 있도록 돕는 <strong className="text-primary">조직 힐링 파트너</strong>입니다.
            </p>
            </section>
          </ScrollAnimate>

          {/* 서브카피 - 핵심 미션 */}
          <ScrollAnimate animation="slide-up" delay={100}>
            <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
            <blockquote className="text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary leading-relaxed mb-4">
              "일의 성과는 결국 사람에게서 나오고,<br />
              사람의 성과는 '심리적 회복력'에서 시작됩니다."
            </blockquote>
            <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
              우리는 팀이 <strong className="text-text-light-primary dark:text-text-dark-primary">에너지를 회복하고</strong>,<br />
              서로의 마음을 이해하며,<br />
              조직이 다시 '한 팀'으로 연결되는 순간을 디자인합니다.
            </p>
            </section>
          </ScrollAnimate>

          {/* Pain Point Section */}
          <ScrollAnimate animation="slide-up" delay={200}>
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  요즘 조직, 이런 고민 많지 않으신가요?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '😶',
                  title: '팀 분위기가 무겁다',
                  description: '회의 시간은 길지만 웃음이 사라졌다.',
                },
                {
                  icon: '😞',
                  title: '구성원 이직이 잦다',
                  description: '소통 부재와 피로 누적으로 팀 cohesion 약화.',
                },
                {
                  icon: '🫥',
                  title: '리더도 지쳐 있다',
                  description: '책임감은 커지고 공감은 줄어든다.',
                },
              ].map((pain, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl">{pain.icon}</div>
                  <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
                    {pain.title}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {pain.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <p className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
                이건 단순한 성과 관리의 문제가 아닙니다.
              </p>
              <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mt-2">
                지금 조직에 필요한 건 <strong className="text-primary">'정서적 회복'</strong>입니다.
              </p>
            </div>
          </section>

          {/* Vision & Solution */}
          <ScrollAnimate animation="slide-up" delay={100}>
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                  우리는 '회복이 성과를 만든다'는 믿음으로 시작했습니다.
                </h2>
                <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
                  힐링워크는 조직이 겪는 정서적 피로를 해결하기 위해<br />
                  <strong className="text-text-light-primary dark:text-text-dark-primary">심리학·코칭·명상·팀빌딩 전문가</strong>들이 함께 만든 브랜드입니다.
                </p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Target,
                  title: '정서 회복 구조 설계',
                  description: '단순한 이벤트가 아닌, 체계적인 회복 프로그램',
                },
                {
                  icon: Users,
                  title: '체험 중심 워크샵',
                  description: '리더부터 구성원까지 참여하는 실전 경험',
                },
                {
                  icon: TrendingUp,
                  title: '성과로 연결되는 감정 리셋',
                  description: '회복된 에너지가 성과로 이어지는 프로그램',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
              <div className="text-center pt-8">
                <blockquote className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary italic">
                  "한 번의 워크샵이 조직의 방향을 바꿀 수 있습니다."
                </blockquote>
              </div>
            </section>
          </ScrollAnimate>

          {/* How We Work */}
          <ScrollAnimate animation="slide-up" delay={200}>
            <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                복잡한 과정 없이, 단 세 단계로
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* 연결선 (데스크톱에서만 표시) */}
              <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-primary/30" />
              {[
                {
                  step: '①',
                  title: '상담 및 진단',
                  description: '기업의 상황·팀 규모·문제 파악',
                },
                {
                  step: '②',
                  title: '맞춤 워크샵 설계',
                  description: '목적·분위기·리더십 수준에 맞는 프로그램 구성',
                },
                {
                  step: '③',
                  title: '진행 및 피드백',
                  description: '현장 운영 + 사후 코칭 리포트 제공',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
              <div className="text-center pt-4">
                <p className="text-lg font-bold text-primary">
                  100% 맞춤형 설계
                </p>
                <p className="text-base text-text-light-secondary dark:text-text-dark-secondary mt-2">
                  기업마다 다른 문제를 해결합니다.
                </p>
              </div>
            </section>
          </ScrollAnimate>

          {/* Results & Proof */}
          <ScrollAnimate animation="scale" delay={100}>
            <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                수치로 확인되는 변화
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: '참여자 만족도', value: '★ 4.8 / 5.0' },
                { label: '재의뢰율', value: '76%' },
                { label: '피로감 감소', value: '평균 62%' },
                { label: '집중력 향상', value: '평균 45%' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 text-center"
                >
                  <div className="text-2xl md:text-3xl font-black text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center border border-primary/20">
                <blockquote className="text-lg md:text-xl font-bold text-text-light-primary dark:text-text-dark-primary italic mb-2">
                  "워크샵 이후 팀 분위기가 눈에 띄게 달라졌습니다."
                </blockquote>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  – ○○기업 HR팀장 후기
                </p>
              </div>
            </section>
          </ScrollAnimate>

          {/* Our Story */}
          <ScrollAnimate animation="slide-up" delay={200}>
            <section className="space-y-8 bg-surface-light dark:bg-surface-dark rounded-2xl p-8 md:p-12 border border-border-light dark:border-border-dark">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                "우리도 처음엔 '워크샵'이란 단어가 식상했습니다."
              </h2>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                그러다 어느 날, 한 리더가 이런 말을 했습니다.
              </p>
              <div className="bg-background-light dark:bg-background-dark rounded-xl p-6 md:p-8 border-l-4 border-primary">
                <blockquote className="text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary italic">
                  "성과 보고보다, 우리 팀의 표정이 더 걱정됩니다."
                </blockquote>
              </div>
              <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                그 한마디가 힐링워크의 시작이었습니다.<br />
                우리는 그날 이후, <strong className="text-text-light-primary dark:text-text-dark-primary">'성과보다 사람'</strong>을 중심에 둔 워크샵을 만들기 시작했습니다.
              </p>
              <div className="text-center pt-6">
                <p className="text-2xl md:text-3xl font-black text-primary">
                  130개 이상의 조직
                </p>
                <p className="text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary mt-2">
                  이 회복의 여정을 함께했습니다.
                </p>
              </div>
            </div>
            </section>
          </ScrollAnimate>

          {/* Core Values */}
          <ScrollAnimate animation="slide-up" delay={100}>
            <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">
                우리의 핵심 가치
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  emoji: '🌿',
                  title: 'Human First',
                  description: '일보다 \'사람\'을 먼저 생각합니다.',
                },
                {
                  icon: Handshake,
                  emoji: '💬',
                  title: 'Empathy',
                  description: '공감은 모든 변화의 출발점입니다.',
                },
                {
                  icon: Sparkles,
                  emoji: '🔄',
                  title: 'Consistency',
                  description: '회복은 이벤트가 아니라 과정입니다.',
                },
                {
                  icon: TrendingUp,
                  emoji: '📈',
                  title: 'Growth',
                  description: '회복된 팀은 자연스럽게 성장합니다.',
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 text-center"
                >
                  <div className="text-4xl">{value.emoji}</div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <ScrollAnimate animation="fade" delay={200}>
            <section className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                이제, 당신의 팀도 회복을 시작할 시간입니다.
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                3시간의 힐링워크 워크샵으로<br />
                팀의 표정이, 분위기가, 성과가 달라질 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button className="w-full sm:w-auto min-w-[200px] h-12 px-6 bg-white text-primary hover:bg-white/90 font-bold text-base">
                  무료 제안서 받기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto min-w-[200px] h-12 px-6 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-base"
                onClick={() => window.open('https://pf.kakao.com/_your_kakao_channel', '_blank')}
              >
                카카오 상담하기
              </Button>
            </div>
            <div className="pt-4">
              <p className="text-base md:text-lg opacity-90">
                <strong>130개 기업</strong>이 선택한 조직 힐링 프로그램,<br />
                다음은 <strong>당신의 팀</strong>입니다.
              </p>
            </div>
            </section>
          </ScrollAnimate>
        </div>
      </main>
    </PublicLayout>
  )
}

