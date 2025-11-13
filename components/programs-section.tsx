'use client'

import { VideoWithFallback } from './video-with-fallback'

interface Program {
  id: string
  title: string
  description: string
  image: string
  video: string
  tags: string[]
}

export function ProgramsSection() {
  const programs: Program[] = [
    {
      id: 'meditation',
      title: '마음챙김 명상',
      description: '전문가와 함께하는 명상을 통해 스트레스를 해소하고 팀의 집중력을 높입니다.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-hrnaSeT5KiAzDc-hkevAR5T7vQIvTcf65yj0-JWEN55K9ErMmPZZkRZZczhe32GcZwkOkylnD83_MGFEGI4nSkFa6mI1UTF4diGJaTr_0yNhLfsT8Mg7N3yAZGHNBc1x1UzUlbq8qq4pesH1qVPNv3GPM-15YjU1ONIQiPrPq7PnQ2cjL0H3Up65riKyUJSaJNUUDtSE_2rQLXQ8c39YYhULvwYtUyC3usPK29yq_mYTAJJ_kEEd4uUBbsG9tPMAC9ju7DiINQMM',
      video: 'https://storage.googleapis.com/b2b-landing-page-generator/meditation-preview.mp4',
      tags: ['#스트레스해소', '#팀집중력'],
    },
    {
      id: 'cooking',
      title: '팀 쿠킹 클래스',
      description: '함께 요리하며 자연스럽게 소통하고 협업 능력을 강화하는 즐거운 시간입니다.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACLRxNEiw0Ju2av41R8TjPXgNZYa5-Qzg2YuhsQB9XlQctJXvgp_dftgqduj-ALt9PuAArt3P4TRsLi5TYRePpZhhtYpPWXwHyOrjepcQ9Ib2EvyfWJ8698JxSZDNb_7hT7zWBji2zJ3qW47OdqIvTdA0HWXnhu4P3K6zCyX02tFLrBPef2gQabHORXCaG4ZP8BVNiy7rzcxgmNpy96Sa7wAxniKEVBN02BgXA0yt8Uyez2ls_shgq7UrN1pQ2q8-UIp8oRB3-XM3I',
      video: 'https://storage.googleapis.com/b2b-landing-page-generator/cooking-preview.mp4',
      tags: ['#팀워크강화', '#소통활성화'],
    },
    {
      id: 'nature-healing',
      title: '자연 속 힐링 캠프',
      description: '도심을 벗어나 자연과 교감하며 팀원들의 지친 몸과 마음을 재충전합니다.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEUITozhnjELG3CI9H-W59KEdg4jvHc5ocllAPIo10Rq_h5leGgSL_21rgPolGnmStD-r1JuvbtN-Val3uMteGcATO8uqKAVKp7zi3eNU7uJW1MLq_nh5R9BSfIZ9W0DNVKLh4ZPbL31XWXfbj2xagkQHJeIlHiVnvG2cvt7M6OuU6HUrJER4T80RWY-dLLE5aVbeC5t6j2KO5ZKkQqLB0pmity69rfaarhZV-l3iT4jDYDK2rvY5zwRInbkjSmd3W2FW7P2fn3pD1',
      video: 'https://storage.googleapis.com/b2b-landing-page-generator/nature-preview.mp4',
      tags: ['#리프레시', '#재충전'],
    },
  ]

  return (
    <section className="px-4 py-16 sm:py-24 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-gray-900 dark:text-white">
            대표 프로그램
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            모하나가 자신있게 추천하는 팀 빌딩 및 힐링 워크샵입니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  alt={`${program.title} 일러스트`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0 z-10"
                  src={program.image}
                />
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-20">
                  <VideoWithFallback
                    src={program.video}
                    fallbackImage={program.image}
                    alt={`${program.title} 비디오`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{program.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{program.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {program.tags.map((tag) => (
                    <span
                      key={`${program.id}-${tag}`}
                      className="text-xs font-medium bg-primary/20 text-primary-800 dark:bg-primary/30 dark:text-primary-200 py-1 px-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
