'use client'

import { SequencesList } from '@/components/admin/sequences-list'

/**
 * 시퀀스 관리 페이지
 * 이메일/SMS 시퀀스를 관리하는 페이지
 */
export default function AdminSequencesPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          시퀀스 관리
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          이메일 및 SMS 자동 발송 시퀀스를 생성하고 관리합니다.
        </p>
      </header>

      {/* Sequences List */}
      <SequencesList />
    </div>
  )
}

