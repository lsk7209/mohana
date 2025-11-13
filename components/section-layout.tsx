/**
 * Component: SectionLayout
 * 재사용 가능한 섹션 레이아웃 컴포넌트
 * @param {React.ReactNode} children - 섹션 내용 [Required]
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 [Optional]
 * @param {string} className - 추가 CSS 클래스 [Optional]
 * @param {string} containerClassName - 컨테이너 CSS 클래스 [Optional]
 * @example <SectionLayout title="제목" description="설명"><Content /></SectionLayout>
 */
import { cn } from '@/lib/utils'

interface SectionLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
  containerClassName?: string
  id?: string
}

export function SectionLayout({
  children,
  title,
  description,
  className,
  containerClassName,
  id,
}: SectionLayoutProps) {
  return (
    <section id={id} className={cn('px-4 py-16 sm:py-24', className)}>
      <div className={cn('w-full max-w-5xl mx-auto flex flex-col items-center gap-16', containerClassName)}>
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

