import { FeatureCard } from './feature-card'

interface PainPoint {
  id: string
  icon: string
  title: string
  description: string
}

export function PainPointsSection() {
  const painPoints: PainPoint[] = [
    {
      id: 'stagnant-atmosphere',
      icon: 'sentiment_dissatisfied',
      title: '침체된 분위기',
      description: '소통이 줄고, 팀원들의 표정이 어두워졌나요?',
    },
    {
      id: 'short-refresh-effect',
      icon: 'hourglass_empty',
      title: '짧은 리프레시 효과',
      description: '비싼 워크샵 이후, 효과가 금방 사라지진 않나요?',
    },
    {
      id: 'tired-leader',
      icon: 'battery_alert',
      title: '지친 리더',
      description: '팀의 성과와 팀원의 행복 사이에서 고민하고 있나요?',
    },
  ]

  return (
    <section className="relative px-4 -mt-24 sm:-mt-32 lg:-mt-40">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-center text-3xl font-bold tracking-normal text-gray-900 dark:text-white">
          혹시, 요즘 팀의 얼굴인가요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mb-48 sm:-mb-56 lg:-mb-64">
          {painPoints.map((point) => (
            <FeatureCard
              key={point.id}
              id={point.id}
              title={point.title}
              description={point.description}
              icon={<span className="material-symbols-outlined text-3xl">{point.icon}</span>}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
