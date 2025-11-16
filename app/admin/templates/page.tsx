'use client'

import { TemplatesList } from '@/components/admin/templates-list'

/**
 * 템플릿 관리 페이지
 * 이메일 및 SMS 템플릿을 관리하는 페이지
 */
export default function AdminTemplatesPage() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          템플릿 관리
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          이메일 및 SMS 발송 템플릿을 생성하고 관리합니다.
        </p>
      </header>

      {/* Templates List */}
      <TemplatesList />
    </div>
  )
}

