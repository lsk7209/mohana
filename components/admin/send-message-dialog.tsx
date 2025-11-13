'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, MessageSquare, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import type { Template } from '@/workers/types'

interface SendMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string
  leadEmail?: string
  leadPhone?: string
  onSuccess?: () => void
}

export function SendMessageDialog({
  open,
  onOpenChange,
  leadId,
  leadEmail,
  leadPhone,
  onSuccess,
}: SendMessageDialogProps) {
  const [channel, setChannel] = useState<'email' | 'sms'>('email')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [templateId, setTemplateId] = useState<string>('')
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTemplates, setLoadingTemplates] = useState(false)

  // 템플릿 로드
  const loadTemplates = async () => {
    if (templates.length > 0) return

    setLoadingTemplates(true)
    try {
      const response = await fetch(`/api/templates?channel=${channel}`)
      if (response.ok) {
        const data = await response.json() as { templates?: Template[] }
        setTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setLoadingTemplates(false)
    }
  }

  const handleChannelChange = (newChannel: 'email' | 'sms') => {
    setChannel(newChannel)
    setSubject('')
    setBody('')
    setTemplateId('')
    loadTemplates()
  }

  const handleTemplateSelect = async (templateId: string) => {
    setTemplateId(templateId)
    try {
      const response = await fetch(`/api/templates/${templateId}`)
      if (response.ok) {
        const template = await response.json() as Template
        setSubject(template.subject || '')
        setBody(template.body || '')
      }
    } catch (error) {
      console.error('Error loading template:', error)
    }
  }

  const handleSend = async () => {
    if (!body.trim()) {
      toast({
        title: '오류',
        description: '내용을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (channel === 'email' && !leadEmail) {
      toast({
        title: '오류',
        description: '이메일 주소가 없습니다.',
        variant: 'destructive',
      })
      return
    }

    if (channel === 'sms' && !leadPhone) {
      toast({
        title: '오류',
        description: '연락처가 없습니다.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const endpoint = channel === 'email' ? '/api/messages/send-email' : '/api/messages/send-sms'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          template_id: templateId || undefined,
          subject: channel === 'email' ? subject : undefined,
          body,
          to: channel === 'email' ? leadEmail : leadPhone,
        }),
      })

      if (!response.ok) {
        const error = await response.json() as { error?: string }
        throw new Error(error.error || '발송 실패')
      }

      toast({
        title: '발송 완료',
        description: `${channel === 'email' ? '이메일' : 'SMS'}이 발송되었습니다.`,
      })

      setSubject('')
      setBody('')
      setTemplateId('')
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: '오류',
        description: error instanceof Error ? error.message : '발송에 실패했습니다.',
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
          <DialogTitle>메시지 발송</DialogTitle>
          <DialogDescription>
            리드에게 이메일 또는 SMS를 발송합니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={channel} onValueChange={(v) => handleChannelChange(v as 'email' | 'sms')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              이메일
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label>수신자</Label>
              <Input value={leadEmail || ''} disabled />
            </div>

            <div className="space-y-2">
              <Label>템플릿 선택 (선택사항)</Label>
              <Select
                value={templateId}
                onValueChange={handleTemplateSelect}
                onOpenChange={(open) => open && loadTemplates()}
                disabled={loadingTemplates}
              >
                <SelectTrigger>
                  <SelectValue placeholder="템플릿 선택" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>제목 *</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="이메일 제목을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label>내용 *</Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="이메일 내용을 입력하세요"
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                변수 사용: {[`{{lead.name}}`, `{{company}}`, `{{email}}`].join(', ')}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-2">
              <Label>수신자</Label>
              <Input value={leadPhone || ''} disabled />
            </div>

            <div className="space-y-2">
              <Label>템플릿 선택 (선택사항)</Label>
              <Select
                value={templateId}
                onValueChange={handleTemplateSelect}
                onOpenChange={(open) => open && loadTemplates()}
                disabled={loadingTemplates}
              >
                <SelectTrigger>
                  <SelectValue placeholder="템플릿 선택" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>내용 *</Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="SMS 내용을 입력하세요 (최대 90자 권장)"
                rows={4}
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground">
                {body.length} / 2000자
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            취소
          </Button>
          <Button onClick={handleSend} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                발송 중...
              </>
            ) : (
              '발송하기'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

