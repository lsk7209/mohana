'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

interface TemplatePreviewProps {
  template: string
  subject?: string
  channel: 'email' | 'sms'
}

export function TemplatePreview({ template, subject, channel }: TemplatePreviewProps) {
  const [previewData, setPreviewData] = useState({
    company: '예시 회사',
    name: '홍길동',
    email: 'example@company.com',
  })
  const [preview, setPreview] = useState('')

  function generatePreview() {
    let rendered = template

    // 변수 치환
    rendered = rendered.replace(/\{\{lead\.name\|([^}]+)\}\}/g, previewData.name || '$1')
    rendered = rendered.replace(/\{\{lead\.name\}\}/g, previewData.name || '담당자님')
    rendered = rendered.replace(/\{\{company\}\}/g, previewData.company || '귀하의 회사')
    rendered = rendered.replace(/\{\{email\}\}/g, previewData.email || '')

    setPreview(rendered)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          템플릿 미리보기
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>회사명</Label>
            <Input
              value={previewData.company}
              onChange={(e) => setPreviewData({ ...previewData, company: e.target.value })}
              placeholder="회사명"
            />
          </div>
          <div className="space-y-2">
            <Label>담당자명</Label>
            <Input
              value={previewData.name}
              onChange={(e) => setPreviewData({ ...previewData, name: e.target.value })}
              placeholder="담당자명"
            />
          </div>
          <div className="space-y-2">
            <Label>이메일</Label>
            <Input
              value={previewData.email}
              onChange={(e) => setPreviewData({ ...previewData, email: e.target.value })}
              placeholder="이메일"
            />
          </div>
        </div>

        <Button onClick={generatePreview} variant="outline" className="w-full">
          미리보기 생성
        </Button>

        {preview && (
          <div className="space-y-2">
            {channel === 'email' && subject && (
              <div>
                <Label>제목</Label>
                <div className="p-3 bg-muted rounded-md text-sm font-medium">
                  {subject.replace(/\{\{lead\.name\|([^}]+)\}\}/g, previewData.name || '$1')
                    .replace(/\{\{company\}\}/g, previewData.company || '귀하의 회사')}
                </div>
              </div>
            )}
            <div>
              <Label>내용</Label>
              <div
                className="p-4 bg-muted rounded-md text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

