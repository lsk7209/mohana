'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadsFilter } from '@/components/admin/leads-filter'
import { LoadingState } from '@/components/admin/loading-state'
import { EmptyState } from '@/components/admin/empty-state'
import { ExportButton } from '@/components/admin/export-button'
import { Pagination } from '@/components/admin/pagination'
import { Users } from 'lucide-react'
import Link from 'next/link'
import type { Lead } from '@/workers/types'

const statusColors = {
  new: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
  in_progress: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
  quoted: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
  won: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
  lost: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
  on_hold: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
}

const statusLabels = {
  new: '신규',
  in_progress: '상담 중',
  quoted: '견적 발송',
  won: '완료',
  lost: '보류',
  on_hold: '보류',
}

const kanbanColumns = [
  { key: 'new', label: '신규' },
  { key: 'in_progress', label: '상담 중' },
  { key: 'quoted', label: '견적 발송' },
  { key: 'won', label: '완료' },
  { key: 'on_hold', label: '보류' },
]

export function LeadsBoard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')

  useEffect(() => {
    async function fetchLeads() {
      try {
        const params = new URLSearchParams()
        if (statusFilter !== 'all') {
          params.set('status', statusFilter)
        }
        if (searchQuery.trim()) {
          params.set('search', searchQuery.trim())
        }

        params.set('limit', '100')
        params.set('offset', String((currentPage - 1) * 100))

        const url = `/api/admin/leads${params.toString() ? '?' + params.toString() : ''}`
        const response = await fetch(url)
        const data = await response.json() as { leads?: Lead[]; total?: number }
        setLeads(data.leads || [])
        setTotalPages(Math.ceil((data.total || 0) / 100))
      } catch (error) {
        console.error('Error fetching leads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [statusFilter, searchQuery, currentPage])

  if (loading) {
    return <LoadingState message="리드를 불러오는 중..." />
  }

  function handleClearFilters() {
    setStatusFilter('all')
    setSearchQuery('')
  }

  const leadsByStatus = kanbanColumns.reduce((acc, column) => {
    acc[column.key] = leads.filter((lead) => lead.status === column.key)
    return acc
  }, {} as Record<string, Lead[]>)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50">
          <p className="text-gray-700 dark:text-gray-300 text-base font-medium leading-normal">총 리드 수</p>
          <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">{leads.length}</p>
          <p className="text-green-600 dark:text-green-500 text-sm font-medium leading-normal flex items-center">
            <span className="material-symbols-outlined text-base">arrow_upward</span> +5.2%
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50">
          <p className="text-gray-700 dark:text-gray-300 text-base font-medium leading-normal">진행률</p>
          <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">15.8%</p>
          <p className="text-red-600 dark:text-red-500 text-sm font-medium leading-normal flex items-center">
            <span className="material-symbols-outlined text-base">arrow_downward</span> -1.1%
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50">
          <p className="text-gray-700 dark:text-gray-300 text-base font-medium leading-normal">평균 응답 시간</p>
          <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">2.5 hours</p>
          <p className="text-green-600 dark:text-green-500 text-sm font-medium leading-normal flex items-center">
            <span className="material-symbols-outlined text-base">arrow_upward</span> +0.3 hours
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              placeholder="회사명, 담당자 검색..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium">
            <span className="material-symbols-outlined text-lg mr-1">filter_list</span>
            필터
          </button>
        </div>
        <div className="flex h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1 w-full sm:w-auto">
          <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-gray-700 has-[:checked]:shadow-sm text-gray-500 has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-sm font-medium leading-normal">
            <span className="truncate">Kanban View</span>
            <input
              checked={viewMode === 'kanban'}
              className="invisible w-0"
              name="view-toggle"
              type="radio"
              value="Kanban View"
              onChange={() => setViewMode('kanban')}
            />
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-gray-700 has-[:checked]:shadow-sm text-gray-500 has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-sm font-medium leading-normal">
            <span className="truncate">Table View</span>
            <input
              checked={viewMode === 'table'}
              className="invisible w-0"
              name="view-toggle"
              type="radio"
              value="Table View"
              onChange={() => setViewMode('table')}
            />
          </label>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {kanbanColumns.map((column) => {
            const columnLeads = leadsByStatus[column.key] || []
            return (
              <div key={column.key} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">
                    {column.label} ({columnLeads.length})
                  </h3>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {columnLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      href={`/admin/leads/${lead.id}`}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark/50 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                      <h4 className="mt-2 font-bold text-gray-900 dark:text-white">{lead.company || '회사명 없음'}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lead.name || '-'}</p>
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Score</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">85</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 font-medium" scope="col">
                    회사명
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    담당자
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    이메일
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    상태
                  </th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    생성일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      리드가 없습니다
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => (window.location.href = `/admin/leads/${lead.id}`)}
                    >
                      <td className="px-6 py-4 font-medium text-dark-gray-text dark:text-white">{lead.company || '-'}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{lead.name || '-'}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{lead.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}>
                          {statusLabels[lead.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {leads.length > 0 && viewMode === 'table' && (
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  )
}
