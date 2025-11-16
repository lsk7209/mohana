'use client'

import { LeadsBoard } from '@/components/admin/leads-board'

/**
 * 문의 관리 페이지
 * 문의사항을 조회하고 관리할 수 있는 페이지
 */
export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          문의 관리
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          고객 문의사항을 조회하고 답변을 관리합니다.
        </p>
      </header>

      {/* Leads Board - 문의사항 필터링 */}
      <LeadsBoard />
    </div>
  )
}

