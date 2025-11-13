import { FeatureCard } from './feature-card'

interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}

export function BenefitsSection() {
  const benefits: Benefit[] = [
    {
      id: 'verified-instructors',
      icon: 'verified_user',
      title: '검증된 강사진',
      description: '각 분야 최고의 전문가들이 함께합니다.',
    },
    {
      id: 'customized-programs',
      icon: 'tune',
      title: '맞춤형 프로그램',
      description: '기업의 목표와 상황에 최적화된 프로그램을 설계합니다.',
    },
    {
      id: 'ongoing-consulting',
      icon: 'autorenew',
      title: '지속적인 후속 컨설팅',
      description: '일회성으로 끝나지 않는 지속적인 성장을 지원합니다.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-neutral-gray dark:bg-black/20 rounded-lg">
      <div className="flex flex-col gap-10 px-4 py-10 @container">
        <div className="text-center">
          <h2 className="text-dark-slate-gray dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
            모하나가 제공하는 특별한 가치
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal max-w-[720px] mx-auto mt-4">
            단순한 워크샵을 넘어, 조직의 긍정적인 변화를 만드는 솔루션을 제공합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.id}
              id={benefit.id}
              title={benefit.title}
              description={benefit.description}
              icon={<span className="material-symbols-outlined text-primary text-4xl">{benefit.icon}</span>}
              className="flex flex-col flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark p-6 items-center text-center"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
