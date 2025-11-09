'use client'

import { Button } from '@/components/ui/button'
import { Plus, FileText, GitBranch } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Link href="/admin/leads">
        <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
          <Plus className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">리드 관리</div>
            <div className="text-xs text-muted-foreground">모든 리드 확인 및 관리</div>
          </div>
        </Button>
      </Link>

      <Link href="/admin/templates">
        <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
          <FileText className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">템플릿 관리</div>
            <div className="text-xs text-muted-foreground">이메일/SMS 템플릿 편집</div>
          </div>
        </Button>
      </Link>

      <Link href="/admin/sequences">
        <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2">
          <GitBranch className="h-5 w-5" />
          <div className="text-left">
            <div className="font-semibold">시퀀스 관리</div>
            <div className="text-xs text-muted-foreground">자동화 시퀀스 설정</div>
          </div>
        </Button>
      </Link>
    </div>
  )
}

