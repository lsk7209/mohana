'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'

interface LeadsFilterProps {
  status: string
  onStatusChange: (status: string) => void
  search: string
  onSearchChange: (search: string) => void
  onClear: () => void
}

export function LeadsFilter({
  status,
  onStatusChange,
  search,
  onSearchChange,
  onClear,
}: LeadsFilterProps) {
  const hasFilters = status !== 'all' || search.trim() !== ''

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="회사명, 담당자명, 이메일로 검색..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="상태 필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="new">신규</SelectItem>
          <SelectItem value="in_progress">진행중</SelectItem>
          <SelectItem value="quoted">견적</SelectItem>
          <SelectItem value="won">성사</SelectItem>
          <SelectItem value="lost">실패</SelectItem>
          <SelectItem value="on_hold">보류</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="outline" onClick={onClear}>
          <X className="h-4 w-4 mr-2" />
          필터 초기화
        </Button>
      )}
    </div>
  )
}

