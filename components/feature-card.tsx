/**
 * Component: FeatureCard
 * 기능/특징을 표시하는 재사용 가능한 카드 컴포넌트
 * @param {string} id - 고유 ID [Required]
 * @param {React.ReactNode} icon - 아이콘 [Optional]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Required]
 * @param {string} className - 추가 CSS 클래스 [Optional]
 * @example <FeatureCard id="feature-1" title="제목" description="설명" />
 */
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  id: string
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ id, icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      id={id}
      className={cn(
        'flex flex-1 flex-col gap-4 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2',
        className
      )}
    >
      {icon && <div className="text-primary">{icon}</div>}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}


