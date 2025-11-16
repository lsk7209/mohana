'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'

interface Instructor {
  id: string
  name: string
  title?: string
  photo?: string
  bio?: string
  career?: string
  skills?: string
  is_active: boolean
  created_at: number
  updated_at: number
}

/**
 * 강사 관리 페이지
 * 강사 정보를 조회하고 관리할 수 있는 페이지
 */
export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    photo: '',
    bio: '',
    career: '',
    skills: '',
    is_active: true,
  })

  useEffect(() => {
    fetchInstructors()
  }, [])

  async function fetchInstructors() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl('/api/admin/instructors')
      const response = await fetch(apiUrl)
      
      if (response.ok) {
        const data = await response.json() as { instructors?: Instructor[] }
        setInstructors(data.instructors || [])
      } else {
        // API가 없으면 빈 배열
        setInstructors([])
      }
    } catch (error) {
      console.error('Error fetching instructors:', error)
      setInstructors([])
    } finally {
      setLoading(false)
    }
  }

  function handleCreate() {
    setEditingInstructor(null)
    setFormData({
      name: '',
      title: '',
      photo: '',
      bio: '',
      career: '',
      skills: '',
      is_active: true,
    })
    setDialogOpen(true)
  }

  function handleEdit(instructor: Instructor) {
    setEditingInstructor(instructor)
    setFormData({
      name: instructor.name || '',
      title: instructor.title || '',
      photo: instructor.photo || '',
      bio: instructor.bio || '',
      career: instructor.career || '',
      skills: instructor.skills || '',
      is_active: instructor.is_active ?? true,
    })
    setDialogOpen(true)
  }

  async function handleSave() {
    try {
      const apiUrl = editingInstructor
        ? getApiUrl(`/api/admin/instructors/${editingInstructor.id}`)
        : getApiUrl('/api/admin/instructors')
      const method = editingInstructor ? 'PUT' : 'POST'

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '저장 완료',
        description: '강사 정보가 성공적으로 저장되었습니다.',
      })

      setDialogOpen(false)
      fetchInstructors()
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const apiUrl = getApiUrl(`/api/admin/instructors/${id}`)
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '삭제 완료',
        description: '강사가 삭제되었습니다.',
      })

      fetchInstructors()
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    }
  }

  const filteredInstructors = instructors.filter((instructor) => {
    return !searchQuery || 
      instructor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.title?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            강사 관리
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
            강사 정보를 조회하고 관리합니다.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <span className="material-symbols-outlined text-base">add</span>
          새 강사 등록
        </Button>
      </header>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="강사명 또는 직책으로 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Instructors List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      ) : filteredInstructors.length === 0 ? (
        <div className="text-center py-12 text-gray-500">강사가 없습니다</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((instructor) => (
            <Card key={instructor.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  {instructor.photo && (
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle>{instructor.name}</CardTitle>
                    {instructor.title && (
                      <p className="text-sm text-gray-500 mt-1">{instructor.title}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {instructor.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>
                )}
                {instructor.skills && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {instructor.skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(instructor)}
                  >
                    편집
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(instructor.id)}
                  >
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingInstructor ? '강사 편집' : '새 강사 등록'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="강사 이름"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">직책</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 커뮤니케이션 전문가"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">사진 URL</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">소개</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="강사 소개를 입력하세요"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="career">경력</Label>
                <Textarea
                  id="career"
                  value={formData.career}
                  onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                  placeholder="주요 경력을 입력하세요"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">전문 분야 (쉼표로 구분)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="예: 소통, 팀빌딩, 갈등관리"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_active">활성화</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  className="bg-background-light dark:bg-background-dark hover:bg-border-light dark:hover:bg-border-dark/50"
                  onClick={() => setDialogOpen(false)}
                >
                  취소
                </Button>
                <Button onClick={handleSave}>
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

