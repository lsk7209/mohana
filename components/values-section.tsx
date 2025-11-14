'use client'

/**
 * 가치 섹션 컴포넌트
 * 힐링워크가 제공하는 특별한 가치를 소개하는 섹션
 */
export function ValuesSection() {
  const values = [
    {
      id: 'verified-instructors',
      icon: 'verified_user',
      title: '검증된 강사진',
      description: '각 분야 최고의 전문가들이 함께합니다.'
    },
    {
      id: 'customized-programs',
      icon: 'tune',
      title: '맞춤형 프로그램',
      description: '기업의 목표와 상황에 최적화된 프로그램을 설계합니다.'
    },
    {
      id: 'ongoing-consulting',
      icon: 'autorenew',
      title: '지속적인 후속 컨설팅',
      description: '일회성으로 끝나지 않는 지속적인 성장을 지원합니다.'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-neutral-gray dark:bg-black/20 rounded-lg" id="values" aria-labelledby="values-heading">
      <div className="flex flex-col gap-10 px-4 py-10">
        <div className="text-center">
          <h2 
            id="values-heading"
            className="text-dark-slate-gray dark:text-white tracking-light text-3xl sm:text-4xl font-bold sm:font-black leading-tight sm:tracking-[-0.033em] max-w-[720px] mx-auto"
          >
            힐링워크가 제공하는 특별한 가치
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed max-w-[720px] mx-auto mt-4">
            단순한 워크샵을 넘어, 조직의 긍정적인 변화를 만드는 솔루션을 제공합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0">
          {values.map((value) => (
            <div 
              key={value.id}
              className="flex flex-col flex-1 gap-4 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-background-dark dark:to-black/30 p-8 items-center text-center shadow-sm border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span 
                  className="material-symbols-outlined !text-4xl" 
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                  aria-hidden="true"
                >
                  {value.icon}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-dark-slate-gray dark:text-white text-lg font-bold leading-tight">
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

