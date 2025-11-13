'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { InstructorWithStats } from '@/workers/types'

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<InstructorWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorWithStats | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all')

  useEffect(() => {
    // TODO: API에서 강사 목록 가져오기
    setLoading(false)
  }, [])

  // is_active를 기반으로 status 계산 헬퍼 함수
  const getInstructorStatus = (instructor: InstructorWithStats): 'active' | 'pending' | 'suspended' => {
    if (instructor.is_active === 1) return 'active'
    if (instructor.is_active === 0) return 'pending'
    return 'suspended'
  }

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = !searchQuery || 
      instructor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.skills?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || getInstructorStatus(instructor) === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-3xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark">
              강사진 관리
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              플랫폼에 등록된 강사진의 정보를 검색하고 관리합니다.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-5 bg-primary text-white rounded-lg text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>신규 강사 등록</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-500 dark:text-gray-400 flex border-none bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="강사 이름, 전문 분야로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${
                statusFilter === 'all'
                  ? 'bg-primary/20 dark:bg-primary/30'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <p className={`text-sm font-bold leading-normal ${statusFilter === 'all' ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>
                전체
              </p>
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-gray-200 dark:border-gray-700 ${
                statusFilter === 'active'
                  ? 'bg-primary/20 dark:bg-primary/30'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className={`text-sm font-medium leading-normal ${statusFilter === 'active' ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>
                활동 중
              </p>
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-gray-200 dark:border-gray-700 ${
                statusFilter === 'pending'
                  ? 'bg-primary/20 dark:bg-primary/30'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className={`text-sm font-medium leading-normal ${statusFilter === 'pending' ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>
                승인 대기
              </p>
            </button>
            <button
              onClick={() => setStatusFilter('suspended')}
              className={`flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 border border-gray-200 dark:border-gray-700 ${
                statusFilter === 'suspended'
                  ? 'bg-primary/20 dark:bg-primary/30'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <p className={`text-sm font-medium leading-normal ${statusFilter === 'suspended' ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>
                정지
              </p>
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-background-light dark:bg-background-dark">
                  <tr>
                    <th className="py-3.5 px-4 text-left text-sm font-semibold text-text-light dark:text-text-dark" scope="col">
                      이름
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark" scope="col">
                      전문 분야
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark" scope="col">
                      경력 요약
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark" scope="col">
                      상태
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-light dark:text-text-dark" scope="col">
                      등록 강의 수
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4" scope="col">
                      <span className="sr-only">액션</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        로딩 중...
                      </td>
                    </tr>
                  ) : filteredInstructors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        강사가 없습니다
                      </td>
                    </tr>
                  ) : (
                    filteredInstructors.map((instructor) => (
                      <tr
                        key={instructor.id}
                        className={`hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer ${
                          selectedInstructor?.id === instructor.id ? 'bg-primary/5 dark:bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedInstructor(instructor)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-text-light dark:text-text-dark">
                          {instructor.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {instructor.skills || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {instructor.career || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {getInstructorStatus(instructor) === 'active' ? (
                            <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success ring-1 ring-inset ring-success/20">
                              활동 중
                            </span>
                          ) : getInstructorStatus(instructor) === 'pending' ? (
                            <span className="inline-flex items-center rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20">
                              승인 대기
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-danger/10 px-2 py-1 text-xs font-medium text-danger ring-1 ring-inset ring-danger/20">
                              정지
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {instructor.program_count || 0}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <a className="text-primary hover:text-primary/80" href="#">
                            메시지
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Details Side Panel */}
      {selectedInstructor && (
        <aside className="w-[480px] flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20"
                  style={{
                    backgroundImage: selectedInstructor.photo
                      ? `url("${selectedInstructor.photo}")`
                      : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsDkDFUWbNH_vtw6jgFTTPSxWawcG35fcq2EnAb4OnhHJC5IkNg49s46QxL4Ai3Fl01Pc3mv1pawjhKpJBRGmE8PxzlBE3KnnythsJNmaFA886uf1716ED82dSWdmgJGDbLBhSs-r3e712H0x7WU1UnDWj6h3YISG0jwUo9_ECoM72vSplIYguqYvg-Uqjy1oF5nriw_8mEq6PYhndC15Lr7RRWO9UbbPU3sK-nvs7HbSIcFNImaqUNSQlPLtkyLfpADDOum35i8o7")',
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedInstructor.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInstructor.email || '-'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInstructor.phone || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold">전문 분야:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedInstructor.skills?.split(',').map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">상태 관리:</p>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center h-8 px-3 bg-success text-white rounded-md text-xs font-bold hover:opacity-90">
                    승인
                  </button>
                  <button className="flex items-center justify-center h-8 px-3 bg-danger text-white rounded-md text-xs font-bold hover:opacity-90">
                    활동 정지
                  </button>
                </div>
              </div>
            </div>

            {/* Information Tabs */}
            <div className="p-6">
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="-mb-px flex space-x-6">
                  <a className="border-primary text-primary whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium" href="#">
                    상세 경력
                  </a>
                  <a className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium" href="#">
                    대표 강의 목록
                  </a>
                  <a className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium" href="#">
                    내부 메모
                  </a>
                </nav>
              </div>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <h4 className="font-bold text-text-light dark:text-text-dark">주요 경력</h4>
                <div className="whitespace-pre-line">{selectedInstructor.career || '경력 정보가 없습니다.'}</div>
                <h4 className="font-bold text-text-light dark:text-text-dark">학력 및 자격증</h4>
                <div className="whitespace-pre-line">{selectedInstructor.bio || '정보가 없습니다.'}</div>
              </div>
            </div>

            {/* Internal Memo Section */}
            <div className="p-6 mt-auto border-t border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark">
              <h4 className="font-bold text-text-light dark:text-text-dark mb-2">내부 메모</h4>
              <textarea
                className="form-textarea w-full h-24 resize-none rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-primary focus:border-primary text-sm"
                placeholder="관리자만 볼 수 있는 메모를 남겨주세요."
              />
              <button className="mt-2 w-full flex items-center justify-center h-10 px-5 bg-gray-700 dark:bg-gray-600 text-white rounded-lg text-sm font-bold hover:opacity-90">
                메모 저장
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

