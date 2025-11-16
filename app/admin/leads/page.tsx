'use client'

import { LeadsBoard } from '@/components/admin/leads-board'

/**
 * 리드 관리 페이지
 * 모든 리드를 조회하고 관리할 수 있는 페이지
 */
export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          리드 관리
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          모든 리드를 조회하고 상태를 관리합니다.
        </p>
      </header>

      {/* Leads Board */}
      <LeadsBoard />
    </div>
  )
}

