'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Program } from '@/workers/types'
import { getApiUrl } from '@/lib/env'
import { toast } from '@/hooks/use-toast'

// 정적 프로그램 데이터 (임시)
const staticPrograms = [
  {
    id: 'communication-skill',
    slug: 'communication-skill',
    title: '[소통 레벨업] 우리 팀을 하나로 만드는 커뮤니케이션 스킬',
    instructor_id: '김민준',
    theme: '소통',
    is_published: true,
  },
  {
    id: 'leadership',
    slug: 'leadership',
    title: '[리더십 강화] 성공하는 리더의 핵심 역량',
    instructor_id: '이수진',
    theme: '리더십',
    is_published: true,
  },
  {
    id: 'teambuilding',
    slug: 'teambuilding',
    title: '[팀빌딩 어드벤처] 함께 성장하는 우리 팀',
    instructor_id: '박서준',
    theme: '팀워크',
    is_published: true,
  },
  {
    id: 'self-discovery',
    slug: 'self-discovery',
    title: '[나를 찾아가는 자기변화 레슨 – 명상·상담]',
    instructor_id: '김상완',
    theme: '명상',
    is_published: true,
  },
]

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const apiUrl = getApiUrl('/api/admin/programs')
        const response = await fetch(apiUrl)
        
        if (response.ok) {
          const data = await response.json() as { programs?: any[] }
          setPrograms(data.programs || staticPrograms as any)
        } else {
          // API가 없으면 정적 데이터 사용
          setPrograms(staticPrograms as any)
        }
      } catch (error) {
        // 에러 발생 시 정적 데이터 사용
        setPrograms(staticPrograms as any)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPrograms()
  }, [])

  const filteredPrograms = programs.filter((program) => {
    return !searchQuery || program.title?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="p-6 lg:p-8">
      {/* PageHeading */}
      <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            강의 관리
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
            플랫폼에 등록된 모든 강의를 조회하고 관리합니다.
          </p>
        </div>
        <Link
          href="/admin/programs/new/edit"
          className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span className="truncate">새 강의 등록</span>
        </Link>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-border-light dark:border-border-dark mb-6">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Chips */}
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-3 pr-2 border border-border-light dark:border-border-dark hover:border-primary/50">
            <p className="text-sm font-medium">테마별</p>
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-3 pr-2 border border-border-light dark:border-border-dark hover:border-primary/50">
            <p className="text-sm font-medium">상태별</p>
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-background-light dark:bg-background-dark pl-3 pr-2 border border-border-light dark:border-border-dark hover:border-primary/50">
            <p className="text-sm font-medium">강사별</p>
            <span className="material-symbols-outlined text-base">arrow_drop_down</span>
          </button>
          {/* SearchBar */}
          <div className="flex-1 min-w-[250px]">
            <label className="flex flex-col h-9 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-text-light-secondary dark:text-text-dark-secondary flex bg-background-light dark:bg-background-dark items-center justify-center pl-3 rounded-l-lg border border-r-0 border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-sm font-normal bg-background-light dark:bg-background-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-l-0 border-border-light dark:border-border-dark h-full placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary pl-2"
                  placeholder="강의명 또는 강사명으로 검색하세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mr-2">보기</p>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-light dark:bg-primary/20 text-primary' : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-background-light dark:hover:bg-background-dark'}`}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-light dark:bg-primary/20 text-primary' : 'text-text-light-secondary dark:text-text-dark-secondary hover:bg-background-light dark:hover:bg-background-dark'}`}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">로딩 중...</div>
          ) : filteredPrograms.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">강의가 없습니다</div>
          ) : (
            filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative">
                  <img
                    className="aspect-[16/9] w-full object-cover"
                    alt={program.title || 'Program image'}
                    src={'https://via.placeholder.com/400x225'}
                  />
                  <span
                    className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      program.is_published
                        ? 'bg-status-green/10 text-status-green'
                        : 'bg-status-gray/10 text-status-gray'
                    }`}
                  >
                    {program.is_published ? '공개' : '비공개'}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-text-light-secondary dark:text-text-dark-secondary text-xs mb-1">
                    {program.instructor_id || '강사명'}
                  </p>
                  <h3 className="font-bold text-base mb-2 flex-grow">{program.title || '제목 없음'}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.theme && (
                      <span className="text-xs font-medium text-primary bg-primary-light dark:bg-primary/20 px-2 py-1 rounded">
                        #{program.theme}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/admin/programs/${program.slug || program.id}/edit`}
                      className="flex-1 h-9 rounded-lg bg-background-light dark:bg-background-dark text-sm font-semibold hover:bg-border-light dark:hover:bg-border-dark/50 flex items-center justify-center"
                    >
                      편집
                    </Link>
                    <button
                      className="flex-1 h-9 rounded-lg bg-status-gray/10 text-status-gray text-sm font-semibold hover:bg-status-gray/20"
                      onClick={async () => {
                        try {
                          const apiUrl = getApiUrl(`/api/admin/programs/${program.slug || program.id}`)
                          const response = await fetch(apiUrl, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              is_published: !program.is_published,
                            }),
                          })

                          if (response.ok) {
                            toast({
                              title: '변경 완료',
                              description: `프로그램이 ${program.is_published ? '비공개' : '공개'}로 변경되었습니다.`,
                            })
                            // 목록 새로고침
                            const programsResponse = await fetch(getApiUrl('/api/admin/programs'))
                            if (programsResponse.ok) {
                              const data = await programsResponse.json() as { programs?: any[] }
                              setPrograms(data.programs || staticPrograms as any)
                            }
                          }
                        } catch (error) {
                          toast({
                            title: '오류',
                            description: '상태 변경에 실패했습니다.',
                            variant: 'destructive',
                          })
                        }
                      }}
                    >
                      {program.is_published ? '비공개' : '공개'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">강의명</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">강사</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">상태</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 font-medium">{program.title}</td>
                  <td className="px-6 py-4 text-gray-500">{program.instructor_id || '-'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        program.is_published
                          ? 'bg-status-green/10 text-status-green'
                          : 'bg-status-gray/10 text-status-gray'
                      }`}
                    >
                      {program.is_published ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/programs/${program.slug || program.id}/edit`}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        편집
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        onClick={async () => {
                          if (!confirm('정말 삭제하시겠습니까?')) return
                          try {
                            const apiUrl = getApiUrl(`/api/admin/programs/${program.slug || program.id}`)
                            const response = await fetch(apiUrl, {
                              method: 'DELETE',
                            })

                            if (response.ok) {
                              toast({
                                title: '삭제 완료',
                                description: '프로그램이 삭제되었습니다.',
                              })
                              // 목록 새로고침
                              const programsResponse = await fetch(getApiUrl('/api/admin/programs'))
                              if (programsResponse.ok) {
                                const data = await programsResponse.json() as { programs?: any[] }
                                setPrograms(data.programs || staticPrograms as any)
                              }
                            }
                          } catch (error) {
                            toast({
                              title: '오류',
                              description: '삭제에 실패했습니다.',
                              variant: 'destructive',
                            })
                          }
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredPrograms.length > 0 && (
        <div className="flex items-center justify-between mt-8 p-4 bg-white dark:bg-gray-900 rounded-xl border border-border-light dark:border-border-dark">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-sm font-semibold hover:bg-background-light dark:hover:bg-background-dark disabled:opacity-50"
            disabled
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            이전
          </button>
          <div className="flex items-center gap-2 text-sm">
            <a className="flex items-center justify-center size-8 rounded-lg bg-primary text-white font-bold" href="#">
              1
            </a>
            <a className="flex items-center justify-center size-8 rounded-lg hover:bg-background-light dark:hover:bg-background-dark font-semibold" href="#">
              2
            </a>
            <a className="flex items-center justify-center size-8 rounded-lg hover:bg-background-light dark:hover:bg-background-dark font-semibold" href="#">
              3
            </a>
            <span className="px-1">...</span>
            <a className="flex items-center justify-center size-8 rounded-lg hover:bg-background-light dark:hover:bg-background-dark font-semibold" href="#">
              10
            </a>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-sm font-semibold hover:bg-background-light dark:hover:bg-background-dark">
            다음
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  )
}

