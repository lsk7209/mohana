'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Template } from '@/workers/types'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'templates' | 'sequences' | 'logs'>('templates')

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch('/api/templates')
        const data = await response.json()
        setTemplates(data.templates || [])
      } catch (error) {
        console.error('Error fetching templates:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  const filteredTemplates = templates.filter((template) => {
    return !searchQuery || template.name?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex-1 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight">메시지 자동화 관리</h1>
            <p className="text-neutral-gray-dark dark:text-gray-400 text-base font-normal leading-normal">
              리드 자동화 및 고객 커뮤니케이션을 위한 메시징을 관리합니다.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide border border-neutral-gray-medium dark:border-gray-700 hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-base">send</span>
            <span className="truncate">즉시 발송</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-gray-medium dark:border-gray-700 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-1 ${
                activeTab === 'templates'
                  ? 'border-b-primary text-primary'
                  : 'border-b-transparent text-neutral-gray-dark dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <p className="text-sm font-bold leading-normal">템플릿 관리</p>
            </button>
            <button
              onClick={() => setActiveTab('sequences')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-1 ${
                activeTab === 'sequences'
                  ? 'border-b-primary text-primary'
                  : 'border-b-transparent text-neutral-gray-dark dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <p className="text-sm font-bold leading-normal">시퀀스 설정</p>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center justify-center border-b-[3px] pb-3 pt-1 ${
                activeTab === 'logs'
                  ? 'border-b-primary text-primary'
                  : 'border-b-transparent text-neutral-gray-dark dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <p className="text-sm font-bold leading-normal">발송 로그</p>
            </button>
          </div>
        </div>

        {/* Main Content Area for Tabs */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            {/* ToolBar */}
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray-dark dark:text-gray-500">
                    search
                  </span>
                  <input
                    className="w-full h-10 pl-10 pr-4 rounded-lg border-neutral-gray-medium dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-neutral-gray-dark dark:placeholder:text-gray-500"
                    placeholder="템플릿 검색..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="p-2.5 rounded-lg text-neutral-gray-dark dark:text-gray-400 bg-white dark:bg-gray-800 border border-neutral-gray-medium dark:border-gray-700 hover:bg-neutral-gray-light dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-xl">filter_list</span>
                </button>
              </div>
              <Link
                href="/admin/templates/new"
                className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 bg-primary text-white text-sm font-bold leading-normal tracking-wide min-w-0 px-4 hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">새 템플릿 추가</span>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-neutral-gray-medium dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-neutral-gray-light/50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        템플릿 제목
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        채널
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        최근 수정일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        생성자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        평균 오픈율
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-neutral-gray-dark dark:text-gray-400 uppercase tracking-wider">
                        액션
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-gray-medium dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          로딩 중...
                        </td>
                      </tr>
                    ) : filteredTemplates.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          템플릿이 없습니다
                        </td>
                      </tr>
                    ) : (
                      filteredTemplates.map((template) => (
                        <tr key={template.id} className="hover:bg-neutral-gray-light/50 dark:hover:bg-gray-900/30">
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">
                            {template.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                template.channel === 'email'
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                  : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              }`}
                            >
                              {template.channel === 'email' ? '이메일' : 'SMS'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-gray-dark dark:text-gray-400">
                            {template.updated_at ? new Date(template.updated_at).toLocaleDateString('ko-KR') : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-gray-dark dark:text-gray-400">관리자</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-24 overflow-hidden rounded-full bg-neutral-gray-medium dark:bg-gray-700 h-1.5">
                                <div className="h-full rounded-full bg-success" style={{ width: '85%' }}></div>
                              </div>
                              <p className="text-gray-900 dark:text-white font-semibold">85%</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link
                              href={`/admin/templates/${template.id}`}
                              className="font-medium text-primary hover:text-primary/80 dark:hover:text-primary/90"
                            >
                              수정
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sequences' && (
          <div className="text-center py-12 text-gray-500">
            <p>시퀀스 설정 페이지로 이동하세요</p>
            <Link href="/admin/sequences" className="text-primary hover:underline mt-2 inline-block">
              시퀀스 관리 →
            </Link>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="text-center py-12 text-gray-500">
            <p>발송 로그 기능은 준비 중입니다</p>
          </div>
        )}
      </div>
    </div>
  )
}
