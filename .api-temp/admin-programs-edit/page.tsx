'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'

/**
 * 프로그램 편집 페이지
 * 프로그램 정보를 수정할 수 있는 페이지
 */
export default function EditProgramPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [program, setProgram] = useState<any>(null)

  useEffect(() => {
    if (slug) {
      fetchProgram()
    }
  }, [slug])

  async function fetchProgram() {
    setLoading(true)
    try {
      // 현재는 정적 데이터를 사용하지만, 실제로는 API에서 가져와야 함
      const apiUrl = getApiUrl(`/api/admin/programs/${slug}`)
      const response = await fetch(apiUrl)
      
      if (response.ok) {
        const data = await response.json() as { program?: any }
        setProgram(data.program || {})
      } else {
        // API가 없으면 기본값 설정
        setProgram({
          slug: slug || '',
          title: '',
          subtitle: '',
          description: '',
          heroImage: '',
          duration: 0,
          headcount: '',
          price: '',
          theme: '',
          curriculum: [],
          effects: [],
          faq: [],
        })
      }
    } catch (error) {
      // 에러 발생 시 기본값 설정
      setProgram({
        slug: slug || '',
        title: '',
        subtitle: '',
        description: '',
        heroImage: '',
        duration: 0,
        headcount: '',
        price: '',
        theme: '',
        curriculum: [],
        effects: [],
        faq: [],
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!program) return

    setSaving(true)
    try {
      const isNew = slug === 'new' || !slug
      const apiUrl = isNew 
        ? getApiUrl('/api/admin/programs')
        : getApiUrl(`/api/admin/programs/${slug}`)
      const method = isNew ? 'POST' : 'PUT'

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(program),
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '저장 완료',
        description: '프로그램이 성공적으로 저장되었습니다.',
      })

      router.push('/admin/programs')
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">프로그램을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            {slug ? '프로그램 편집' : '새 프로그램 등록'}
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
            프로그램 정보를 수정하거나 새로운 프로그램을 등록합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </header>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">슬러그 (URL)</Label>
            <Input
              id="slug"
              value={program.slug || ''}
              onChange={(e) => setProgram({ ...program, slug: e.target.value })}
              placeholder="communication-skill"
              disabled={!!slug}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={program.title || ''}
              onChange={(e) => setProgram({ ...program, title: e.target.value })}
              placeholder="프로그램 제목을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">부제목</Label>
            <Input
              id="subtitle"
              value={program.subtitle || ''}
              onChange={(e) => setProgram({ ...program, subtitle: e.target.value })}
              placeholder="프로그램 부제목을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={program.description || ''}
              onChange={(e) => setProgram({ ...program, description: e.target.value })}
              placeholder="프로그램 설명을 입력하세요"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroImage">히어로 이미지 URL</Label>
            <Input
              id="heroImage"
              value={program.heroImage || ''}
              onChange={(e) => setProgram({ ...program, heroImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Program Details */}
      <Card>
        <CardHeader>
          <CardTitle>프로그램 상세 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">소요 시간 (시간)</Label>
              <Input
                id="duration"
                type="number"
                value={program.duration || 0}
                onChange={(e) => setProgram({ ...program, duration: parseInt(e.target.value) || 0 })}
                placeholder="4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headcount">참가 인원</Label>
              <Input
                id="headcount"
                value={program.headcount || ''}
                onChange={(e) => setProgram({ ...program, headcount: e.target.value })}
                placeholder="10-30명"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">가격</Label>
              <Input
                id="price"
                value={program.price || ''}
                onChange={(e) => setProgram({ ...program, price: e.target.value })}
                placeholder="1인당 8만원 ~"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">테마</Label>
              <Input
                id="theme"
                value={program.theme || ''}
                onChange={(e) => setProgram({ ...program, theme: e.target.value })}
                placeholder="소통"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum */}
      <Card>
        <CardHeader>
          <CardTitle>커리큘럼</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>커리큘럼 항목 (한 줄에 하나씩, 형식: "시간: 제목 - 설명")</Label>
            <Textarea
              value={Array.isArray(program.curriculum) ? program.curriculum.join('\n') : ''}
              onChange={(e) =>
                setProgram({
                  ...program,
                  curriculum: e.target.value.split('\n').filter((line) => line.trim()),
                })
              }
              placeholder="1시간: 소통의 기본 원리와 갈등 이해&#10;1시간: 효과적인 대화 기법 실습"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Effects */}
      <Card>
        <CardHeader>
          <CardTitle>주요 효과</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>효과 항목 (한 줄에 하나씩)</Label>
            <Textarea
              value={Array.isArray(program.effects) ? program.effects.join('\n') : ''}
              onChange={(e) =>
                setProgram({
                  ...program,
                  effects: e.target.value.split('\n').filter((line) => line.trim()),
                })
              }
              placeholder="팀 내 소통 효율성 40% 향상&#10;갈등 해결 시간 50% 단축"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

