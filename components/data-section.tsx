'use client'

import Image from 'next/image'

export function DataSection() {
  const partnerLogos = Array.from({ length: 6 })

  return (
    <section className="px-4 py-16 sm:py-24 bg-white dark:bg-gray-900" id="partners">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-16 sm:gap-24">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-gray-900 dark:text-white">
              데이터가 증명합니다
            </h2>
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-background-light dark:bg-background-dark p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                <p className="text-base font-medium text-gray-600 dark:text-gray-400">고객 만족도</p>
                <p className="text-5xl font-black text-primary">94%</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-background-light dark:bg-background-dark p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                <p className="text-base font-medium text-gray-600 dark:text-gray-400">재의뢰율</p>
                <p className="text-5xl font-black text-primary">76%</p>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden md:order-1">
            <div className="flex animate-scroll gap-16 items-center" style={{ animationDuration: '40s', width: 'max-content' }}>
              {/* First set of logos */}
              {partnerLogos.map((_, i) => (
                <div key={`first-${i}`} className="flex-shrink-0 relative h-10 w-40 opacity-60 dark:invert">
                  <Image
                    alt={`Partner logo ${i + 1}`}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvrfJgXporTOCKptXVyGzMqxT7lKrxVRhbHV9HRIAhPb1Kz1ODIVY6p4YyjjPWX9_xjB9BHj5wYIvK_mANKn0-S1EiCjnL-rV95GYIwGvkgBu7XqK9dvgxjNKfWGbLbBvGAH8nM-gYpEOCceF32eAkWrV6gAeO5crCyoETt5shkK7R1v_hMnZUVcv4cubzHocfmm4nqNH9SXNkrgnaU2LmIErxHIdX9XXNI2t-KmVf3MST9vf7qR-OtnebO9uapFxyT1mNJCqlGQHO"
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((_, i) => (
                <div key={`second-${i}`} className="flex-shrink-0 relative h-10 w-40 opacity-60 dark:invert">
                  <Image
                    alt={`Partner logo ${i + 1}`}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvrfJgXporTOCKptXVyGzMqxT7lKrxVRhbHV9HRIAhPb1Kz1ODIVY6p4YyjjPWX9_xjB9BHj5wYIvK_mANKn0-S1EiCjnL-rV95GYIwGvkgBu7XqK9dvgxjNKfWGbLbBvGAH8nM-gYpEOCceF32eAkWrV6gAeO5crCyoETt5shkK7R1v_hMnZUVcv4cubzHocfmm4nqNH9SXNkrgnaU2LmIErxHIdX9XXNI2t-KmVf3MST9vf7qR-OtnebO9uapFxyT1mNJCqlGQHO"
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
