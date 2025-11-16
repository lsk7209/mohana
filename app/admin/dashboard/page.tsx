'use client'

import { StatsOverview } from '@/components/admin/stats-overview'
import { StatsChart } from '@/components/admin/stats-chart'

/**
 * 관리자 대시보드 페이지
 * 통계 및 주요 지표를 한눈에 볼 수 있는 페이지
 */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          대시보드
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          플랫폼의 주요 지표와 통계를 확인하세요.
        </p>
      </header>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Stats Chart */}
      <StatsChart />
    </div>
  )
}

