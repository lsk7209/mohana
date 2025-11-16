'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { LeadDetail } from '@/components/admin/lead-detail'

/**
 * 리드 상세 페이지
 * 리드 정보와 메시지 이력을 조회할 수 있는 페이지
 */
export default function AdminLeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const leadId = params?.id as string

  if (!leadId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">리드 ID가 필요합니다.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary hover:text-primary/80"
        >
          돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          aria-label="뒤로 가기"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            리드 상세
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
            리드 정보와 메시지 이력을 확인합니다.
          </p>
        </div>
      </header>

      {/* Lead Detail */}
      <LeadDetail leadId={leadId} />
    </div>
  )
}

