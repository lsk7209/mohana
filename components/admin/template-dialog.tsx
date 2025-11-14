'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { TemplatePreview } from '@/components/admin/template-preview'

interface Template {
  id: string
  channel: 'email' | 'sms'
  name: string
  subject?: string
  body: string
}

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  channel: 'email' | 'sms'
  template?: Template | null
  onSuccess?: () => void
}

export function TemplateDialog({
  open,
  onOpenChange,
  channel,
  template,
  onSuccess,
}: TemplateDialogProps) {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (template) {
      setName(template.name)
      setSubject(template.subject || '')
      setBody(template.body)
    } else {
      setName('')
      setSubject('')
      setBody('')
    }
  }, [template, open])

  async function handleSubmit() {
    if (!name.trim() || !body.trim()) {
      toast({
        title: '오류',
        description: '템플릿 이름과 내용을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (channel === 'email' && !subject.trim()) {
      toast({
        title: '오류',
        description: '이메일 제목을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const url = template
        ? `/api/templates/${template.id}`
        : '/api/templates'
      const apiUrl = getApiUrl(url)

      const response = await fetch(apiUrl, {
        method: template ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel,
          name,
          subject: channel === 'email' ? subject : undefined,
          body,
        }),
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '저장 완료',
        description: `템플릿이 ${template ? '수정' : '생성'}되었습니다.`,
      })

      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: '오류',
        description: error instanceof Error ? error.message : '저장에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? '템플릿 수정' : '새 템플릿'}
          </DialogTitle>
          <DialogDescription>
            {channel === 'email' ? '이메일' : 'SMS'} 템플릿을 {template ? '수정' : '생성'}합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>템플릿 이름 *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 웰컴 이메일"
            />
          </div>

          {channel === 'email' && (
            <div className="space-y-2">
              <Label>제목 *</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="이메일 제목"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>내용 *</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={channel === 'email' ? '이메일 내용' : 'SMS 내용'}
              rows={channel === 'email' ? 12 : 6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              변수 사용: {[`{{lead.name}}`, `{{company}}`, `{{email}}`].join(', ')}
            </p>
          </div>

          <TemplatePreview
            template={body}
            subject={channel === 'email' ? subject : undefined}
            channel={channel}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                저장 중...
              </>
            ) : (
              '저장'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

