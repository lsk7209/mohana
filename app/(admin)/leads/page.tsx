import { LeadsBoard } from '@/components/admin/leads-board'

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-dark-gray-text dark:text-white text-3xl font-black leading-tight tracking-tight">
            리드 관리
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            워크샵 리드를 한 곳에서 관리하고 추적하세요.
          </p>
        </div>
        <button className="flex items-center justify-center rounded-xl h-10 px-4 bg-primary text-black dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90">
          <span className="material-symbols-outlined text-lg mr-1">add</span>
          <span className="truncate">신규 리드 추가</span>
        </button>
      </div>

      <LeadsBoard />
    </div>
  )
}
