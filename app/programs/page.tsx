'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, MessageSquare, GraduationCap, Palette, UtensilsCrossed, Lightbulb, TrendingUp, Shield, Music, Sparkles } from "lucide-react"
import Link from "next/link"
import { PublicLayout } from "@/components/public-layout"
import { ScrollAnimate } from "@/components/scroll-animate"

const programs = [
  {
    id: "communication-skill",
    slug: "communication-skill",
    icon: MessageSquare,
    title: "[소통 레벨업] 우리 팀을 하나로 만드는 커뮤니케이션 스킬",
    summary: "갈등을 해결하고 시너지를 만드는 대화법을 배웁니다.",
    description: "효과적인 커뮤니케이션 스킬을 배우고 조직 내 소통 문화를 개선합니다.",
    theme: "소통",
    tags: ["소통", "팀빌딩", "갈등관리"],
    duration: 4,
    headcount: "10-30명",
    format: "오프라인",
    instructor: "김민준",
    color: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABHLbnc27KeCiOGP8b7tWeCEEREKV6iLBaT-DZSDELQmLjOqk6bdLpVmcAppaZDdg8veOmbkuycsSB0L13ZKfEJ8ikxKcjCxgnNn22IgWQ5hqUJK1GF7iKRZ9wYtDxtOA0vV09s8Bz3jBRjenruKUOS5pgEtuRm_MJIIvK2wT4tVqMUZ-QY1TaJcfu_pdxRdxQZe_HC8si3ys18y8gwwA2YfTegYhX8KCOTb8bby8Gf639rX279tqpC9mhui0MWcIbCzoFrERgtXQ_",
  },
  {
    id: "leadership",
    slug: "leadership",
    icon: GraduationCap,
    title: "[리더십 강화] 성공하는 리더의 핵심 역량",
    summary: "변화의 시대, 팀을 이끄는 리더의 조건을 탐구합니다.",
    description: "리더십 역량 개발과 효과적인 팀 관리 방법을 학습합니다.",
    theme: "리더십",
    tags: ["리더십", "역량강화"],
    duration: 8,
    headcount: "10-20명",
    format: "오프라인",
    instructor: "이수진",
    color: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK",
  },
  {
    id: "teambuilding",
    slug: "teambuilding",
    icon: Users,
    title: "[팀빌딩 어드벤처] 함께 성장하는 우리 팀",
    summary: "도전적인 미션을 통해 최고의 팀워크를 구축합니다.",
    description: "다양한 팀 활동을 통해 협업 능력을 향상시키고 팀원 간 신뢰를 구축합니다.",
    theme: "팀워크",
    tags: ["팀워크", "어드벤처"],
    duration: 6,
    headcount: "20-50명",
    format: "야외",
    instructor: "박서준",
    color: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMapGqJHe0gKAidOxHGP2FWEBKeh41Uh3GIXPUQkQVHr_4AX9KHUZRJ4_9Q1R6yxbiPiwW0wLf4NZb6aLOwZtfTtuNtZcA1WHNtOGmPiqt9Bd54CT_P_ypz3_KZrIokdAWt5da6IZKJtTXJ9go3Ej9WwFazubYl_3Z68A4p5YgmKufd5DJWXQpOrk0MKfAnOLrpx6_CzpKVPzKqic1FRzRXgaYIBI_jG6iDNLDtTCLq2As2PKVFw761XLSCfhAJitmHdCcKlxArIE3",
  },
  {
    id: "innovation",
    slug: "innovation",
    icon: Lightbulb,
    title: "[창의력 발전소] 아이디어가 샘솟는 브레인스토밍",
    summary: "고정관념을 깨고 새로운 아이디어를 발견하는 시간.",
    description: "디자인 씽킹, 브레인스토밍 등 다양한 기법을 통해 혁신적 아이디어를 도출하는 프로그램입니다.",
    theme: "창의력",
    tags: ["창의력", "브레인스토밍"],
    duration: 3,
    headcount: "15-40명",
    format: "온라인",
    instructor: "최유리",
    color: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmh6E8cgJp0d-03iIiTYxo5ocwktP0qe0YyzPeFqBrEZxzTzfKrV3IY0sgE5sDDBJ0rxi-nwXV1daSpUEz9Z6phi5P3mFO4card5B7ut6wTjwkapGpkYSBzyIOunUZvFV07v-5yLLpbFS1gGi7x_ys2imS3KYcxKlq2VQsHPXm7txAKEtMjnTovhv9gyD6-A02WRyvzV9c5iCHi-Cos1yuE4Ly7dplqGiGt7jv0vRuKOa-YKp-tycatL8nlTMqI34caM3JhLR8BqFC",
  },
  {
    id: "healing",
    slug: "healing",
    icon: Heart,
    title: "[스트레스 클리닉] 지친 마음을 위로하는 명상 워크샵",
    summary: "번아웃 예방과 마음 챙김을 위한 힐링 프로그램입니다.",
    description: "명상, 요가, 숲 치유 등으로 몸과 마음의 안정을 찾습니다.",
    theme: "힐링",
    tags: ["힐링", "스트레스"],
    duration: 2,
    headcount: "10-30명",
    format: "온라인",
    instructor: "정현우",
    color: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN",
  },
  {
    id: "self-discovery",
    slug: "self-discovery",
    icon: Sparkles,
    title: "나를 찾아가는 자기변화 레슨 – 명상·상담",
    summary: "일과 관계 속에서 흔들리는 나를 돌아보고, 진짜 내가 원하는 삶의 방향을 함께 찾아가는 내면 성장 프로그램입니다.",
    description: "동서양 철학·심리·명상 관점을 통해 나를 더 깊이 이해하고, 삶의 방향을 스스로 설계할 수 있는 기반을 만듭니다.",
    theme: "자기계발",
    tags: ["명상", "자기계발", "심리"],
    duration: 4,
    headcount: "10-30명",
    format: "오프라인",
    instructor: "김상완",
    color: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN",
  },
  {
    id: "digital",
    slug: "digital",
    icon: TrendingUp,
    title: "[디지털 전환] 스마트 워크를 위한 필수 도구",
    summary: "업무 효율을 극대화하는 협업 툴 활용법을 익힙니다.",
    description: "디지털 도구를 활용한 업무 효율성 향상 프로그램입니다.",
    theme: "업무효율",
    tags: ["업무효율", "스마트워크"],
    duration: 4,
    headcount: "30-100명",
    format: "하이브리드",
    instructor: "윤지혜",
    color: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwyZ3mtqiAhrD6WBao4t7iEe949xOrTvniV8DFZSycUlceV0gO5rTDW-Eyd1AePToB8M4fE4s3nxbncDUbsF3Z9uglEncl7cONxlcFKvJypST9xZPDGo9qqQ7ZT9W5v-5Pqrzt6whhEjZmIjdgLvNBteegBunleRo4WlCsDE84Nn4AnwVPlqOuIwwj24tfKBS3lUS7VuMSiAiZcT7cshum4F698Pz8wsDUa6Ip_6vhaltbMQb-Aw3knUVkZ9aGniH6kxl76VUBkqnW",
  },
  {
    id: "art-therapy",
    slug: "art-therapy",
    icon: Palette,
    title: "[아트 테라피] 창의적 표현을 통한 감정 해소",
    summary: "그림, 조각, 공예를 통해 스트레스를 해소하고 창의성을 발휘합니다.",
    description: "다양한 예술 활동을 통해 스트레스를 해소하고 창의성을 발휘하는 프로그램입니다.",
    theme: "창의성",
    tags: ["창의성", "힐링"],
    duration: 4,
    headcount: "10-20명",
    format: "오프라인",
    instructor: "정미라",
    color: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "cooking",
    slug: "cooking",
    icon: UtensilsCrossed,
    title: "[쿠킹 클래스] 함께 요리하며 협업과 소통을 경험",
    summary: "팀원들과 함께 요리를 만들며 자연스럽게 협업을 배웁니다.",
    description: "요리를 통한 협업과 소통을 경험하는 프로그램입니다.",
    theme: "협업",
    tags: ["협업", "소통"],
    duration: 3,
    headcount: "8-20명",
    format: "오프라인",
    instructor: "한요리",
    color: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "growth",
    slug: "growth",
    icon: TrendingUp,
    title: "[성장 마인드셋] 지속적인 학습과 성장 문화 구축",
    summary: "고정 마인드셋에서 벗어나 성장을 추구하는 문화를 만듭니다.",
    description: "지속적인 학습과 성장을 추구하는 문화를 만드는 프로그램입니다.",
    theme: "성장",
    tags: ["성장", "학습"],
    duration: 4,
    headcount: "10-25명",
    format: "온라인",
    instructor: "박성장",
    color: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "wellness",
    slug: "wellness",
    icon: Shield,
    title: "[웰니스 프로그램] 건강한 라이프스타일 형성",
    summary: "운동, 영양, 수면 등 건강한 라이프스타일을 형성합니다.",
    description: "건강한 라이프스타일을 형성하고 유지하는 방법을 배우는 프로그램입니다.",
    theme: "웰빙",
    tags: ["웰빙", "건강"],
    duration: 6,
    headcount: "10-30명",
    format: "오프라인",
    instructor: "이웰빙",
    color: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "music",
    slug: "music",
    icon: Music,
    title: "[음악 치료] 음악을 통한 감정 표현과 팀 하모니",
    summary: "함께 연주하고 노래하며 팀의 조화와 협력을 경험합니다.",
    description: "음악을 통한 감정 표현과 소통을 경험하는 프로그램입니다.",
    theme: "예술",
    tags: ["예술", "힐링"],
    duration: 4,
    headcount: "10-20명",
    format: "오프라인",
    instructor: "최음악",
    color: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    image: "https://via.placeholder.com/400x225",
  },
]

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = !searchQuery || 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTheme = !selectedTheme || program.theme === selectedTheme
    const matchesFormat = !selectedFormat || program.format === selectedFormat
    return matchesSearch && matchesTheme && matchesFormat
  })

  const themes = Array.from(new Set(programs.map(p => p.theme)))
  const formats = Array.from(new Set(programs.map(p => p.format)))

  return (
    <PublicLayout>
      {/* Hero Section */}
        <ScrollAnimate animation="fade">
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 text-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary sm:text-5xl">
                    우리 팀에 맞는 최적의 워크샵 프로그램을 찾아보세요.
                  </h2>
                  <p className="max-w-2xl mx-auto text-lg text-text-light-secondary dark:text-text-dark-secondary">
                    전문 강사진이 진행하는 다양한 테마의 프로그램을 만나보실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimate>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 bg-background-light dark:bg-background-dark py-4 shadow-sm border-b border-border-light dark:border-border-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedTheme(selectedTheme ? null : themes[0])}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 border ${
                    selectedTheme
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">category</span>
                  <p className="text-sm font-medium">테마</p>
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">expand_more</span>
                </button>
                <button
                  onClick={() => setSelectedFormat(selectedFormat ? null : formats[0])}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 border ${
                    selectedFormat
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">slideshow</span>
                  <p className="text-sm font-medium">진행 형태</p>
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">expand_more</span>
                </button>
                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark px-4 border border-border-light dark:border-border-dark hover:border-primary">
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">groups</span>
                  <p className="text-sm font-medium">인원 규모</p>
                  <span className="material-symbols-outlined text-text-light-secondary dark:text-text-dark-secondary">expand_more</span>
                </button>
              </div>
              <div className="flex-grow">
                <label className="flex w-full items-stretch">
                    <div className="flex h-10 w-full items-center rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                      <span className="material-symbols-outlined pl-4 text-text-light-secondary dark:text-text-dark-secondary">search</span>
                      <input
                        className="w-full flex-1 resize-none border-none bg-transparent px-2 text-sm placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-0 text-text-light-primary dark:text-text-dark-primary"
                        placeholder="프로그램명 또는 강사명으로 검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Program Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program, index) => {
                const Icon = program.icon
                return (
                  <ScrollAnimate key={program.id} animation="slide-up" delay={index * 50}>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="flex flex-col overflow-hidden rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                    >
                    <div
                      className="aspect-video w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${program.image}')` }}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {program.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-2">{program.title}</h3>
                      <p className="mt-2 text-sm text-text-light-secondary dark:text-text-dark-secondary mb-4">{program.summary}</p>
                      <div className="mt-4 flex-1 space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        <p className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">person</span>
                          강사: {program.instructor}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          {program.duration}시간 / {program.headcount} / {program.format}
                        </p>
                      </div>
                      <div className="mt-6">
                        <button
                          className="flex h-10 w-full items-center justify-center rounded-full border border-border-light dark:border-border-dark text-sm font-bold hover:bg-surface-light dark:hover:bg-surface-dark text-text-light-primary dark:text-text-dark-primary transition-colors pointer-events-none"
                        >
                          자세히 보기
                        </button>
                      </div>
                    </div>
                  </Link>
                  </ScrollAnimate>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mid-page CTA Section */}
        <ScrollAnimate animation="fade" delay={100}>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="rounded-xl bg-gradient-to-r from-secondary to-blue-800 p-12 text-center text-white">
                <h2 className="text-3xl font-bold">고민은 그만, 무료로 우리 팀에 맞는 맞춤 제안서를 받아보세요.</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                  전문 컨설턴트가 최적의 프로그램을 구성하여 제안해 드립니다.
                </p>
                <div className="mt-8">
                  <Link href="/contact">
                    <button className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-base font-bold text-white hover:bg-primary/90 mx-auto">
                      무료 제안서 받기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimate>

        {/* FAQ Section */}
        <ScrollAnimate animation="slide-up" delay={200}>
          <section className="py-16">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">자주 묻는 질문</h2>
                <p className="mt-2 text-text-light-secondary dark:text-text-dark-secondary">프로그램에 대해 더 궁금한 점이 있으신가요?</p>
              </div>
            <div className="mt-12 space-y-4">
              <details className="group rounded-lg bg-surface-light dark:bg-surface-dark p-6 border border-border-light dark:border-border-dark" open>
                <summary className="flex cursor-pointer items-center justify-between font-medium text-text-light-primary dark:text-text-dark-primary">
                  프로그램 비용은 어떻게 되나요?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">
                  프로그램 비용은 참여 인원, 진행 시간, 강사, 장소 등에 따라 달라집니다. 맞춤 제안서 요청을 통해 정확한 견적을 받아보실 수 있습니다. 기본적으로 1인당 비용으로 산정되며, 특정 프로그램은 패키지 형태로 제공됩니다.
                </div>
              </details>
              <details className="group rounded-lg bg-surface-light dark:bg-surface-dark p-6 border border-border-light dark:border-border-dark">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-text-light-primary dark:text-text-dark-primary">
                  최소/최대 진행 인원은 몇 명인가요?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">
                  각 프로그램별로 권장되는 최소 및 최대 인원이 상이합니다. 프로그램 상세 페이지에서 확인하거나, 인원 규모에 맞는 프로그램을 필터링하여 찾아보실 수 있습니다. 대규모 인원의 경우 별도 협의를 통해 맞춤 진행이 가능합니다.
                </div>
              </details>
              <details className="group rounded-lg bg-surface-light dark:bg-surface-dark p-6 border border-border-light dark:border-border-dark">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-text-light-primary dark:text-text-dark-primary">
                  온라인 또는 하이브리드 진행도 가능한가요?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">
                  네, 가능합니다. 다수의 프로그램이 온라인(비대면) 또는 온/오프라인을 결합한 하이브리드 형태로 제공됩니다. 필터 바에서 '진행 형태'를 선택하여 원하시는 방식의 프로그램을 쉽게 찾을 수 있습니다.
                </div>
              </details>
            </div>
          </div>
        </section>
        </ScrollAnimate>
    </PublicLayout>
  )
}
