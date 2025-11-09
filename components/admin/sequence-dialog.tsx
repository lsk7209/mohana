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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface SequenceStep {
  delay_hours: number
  template_id: string
  channel: 'email' | 'sms'
  conditions?: {
    if_not_opened?: boolean
    if_not_clicked?: boolean
  }
}

interface Sequence {
  id: string
  name: string
  steps: SequenceStep[]
}

interface SequenceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sequence?: Sequence | null
  onSuccess?: () => void
}

export function SequenceDialog({
  open,
  onOpenChange,
  sequence,
  onSuccess,
}: SequenceDialogProps) {
  const [name, setName] = useState('')
  const [steps, setSteps] = useState<SequenceStep[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTemplates, setLoadingTemplates] = useState(false)

  useEffect(() => {
    if (open) {
      loadTemplates()
    }
  }, [open])

  useEffect(() => {
    if (sequence) {
      setName(sequence.name)
      setSteps(sequence.steps)
    } else {
      setName('')
      setSteps([{
        delay_hours: 0,
        template_id: '',
        channel: 'email',
      }])
    }
  }, [sequence, open])

  async function loadTemplates() {
    setLoadingTemplates(true)
    try {
      const emailResponse = await fetch('/api/templates?channel=email')
      const smsResponse = await fetch('/api/templates?channel=sms')
      
      const emailData = await emailResponse.json()
      const smsData = await smsResponse.json()
      
      setTemplates([
        ...(emailData.templates || []).map((t: any) => ({ ...t, channel: 'email' })),
        ...(smsData.templates || []).map((t: any) => ({ ...t, channel: 'sms' })),
      ])
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setLoadingTemplates(false)
    }
  }

  function addStep() {
    setSteps([...steps, {
      delay_hours: steps.length > 0 ? 24 : 0,
      template_id: '',
      channel: 'email',
    }])
  }

  function removeStep(index: number) {
    setSteps(steps.filter((_, i) => i !== index))
  }

  function updateStep(index: number, field: keyof SequenceStep, value: any) {
    const newSteps = [...steps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setSteps(newSteps)
  }

  function updateStepCondition(index: number, condition: 'if_not_opened' | 'if_not_clicked', checked: boolean) {
    const newSteps = [...steps]
    if (!newSteps[index].conditions) {
      newSteps[index].conditions = {}
    }
    if (checked) {
      newSteps[index].conditions![condition] = true
    } else {
      delete newSteps[index].conditions![condition]
      if (Object.keys(newSteps[index].conditions!).length === 0) {
        delete newSteps[index].conditions
      }
    }
    setSteps(newSteps)
  }

  async function handleSubmit() {
    if (!name.trim()) {
      toast({
        title: '오류',
        description: '시퀀스 이름을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (steps.length === 0) {
      toast({
        title: '오류',
        description: '최소 1개의 스텝이 필요합니다.',
        variant: 'destructive',
      })
      return
    }

    for (const step of steps) {
      if (!step.template_id) {
        toast({
          title: '오류',
          description: '모든 스텝에 템플릿을 선택해주세요.',
          variant: 'destructive',
        })
        return
      }
    }

    setLoading(true)
    try {
      // 시퀀스 저장 API 호출
      const url = sequence
        ? `/api/sequences/${sequence.id}`
        : '/api/sequences'

      const response = await fetch(url, {
        method: sequence ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          steps,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '저장 실패')
      }

      toast({
        title: '저장 완료',
        description: `시퀀스가 ${sequence ? '수정' : '생성'}되었습니다.`,
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

  const filteredTemplates = (channel: 'email' | 'sms') => 
    templates.filter(t => t.channel === channel)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {sequence ? '시퀀스 수정' : '새 시퀀스'}
          </DialogTitle>
          <DialogDescription>
            자동화 시퀀스를 {sequence ? '수정' : '생성'}합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>시퀀스 이름 *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 웰컴 시퀀스"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>스텝</Label>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <Plus className="h-4 w-4 mr-2" />
                스텝 추가
              </Button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">스텝 {index + 1}</h4>
                      {steps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>지연 시간 (시간)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={step.delay_hours}
                          onChange={(e) => updateStep(index, 'delay_hours', parseInt(e.target.value) || 0)}
                          disabled={index === 0}
                        />
                        {index === 0 && (
                          <p className="text-xs text-muted-foreground">첫 번째 스텝은 즉시 실행됩니다</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>채널 *</Label>
                        <Select
                          value={step.channel}
                          onValueChange={(v) => {
                            updateStep(index, 'channel', v)
                            updateStep(index, 'template_id', '')
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">이메일</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>템플릿 *</Label>
                      <Select
                        value={step.template_id}
                        onValueChange={(v) => updateStep(index, 'template_id', v)}
                        disabled={loadingTemplates}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="템플릿 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredTemplates(step.channel).map((tpl) => (
                            <SelectItem key={tpl.id} value={tpl.id}>
                              {tpl.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {index > 0 && (
                      <div className="space-y-2">
                        <Label>조건 (선택사항)</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`condition-opened-${index}`}
                              checked={step.conditions?.if_not_opened || false}
                              onCheckedChange={(checked) =>
                                updateStepCondition(index, 'if_not_opened', checked as boolean)
                              }
                            />
                            <label
                              htmlFor={`condition-opened-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              이전 이메일을 열지 않은 경우에만 발송
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`condition-clicked-${index}`}
                              checked={step.conditions?.if_not_clicked || false}
                              onCheckedChange={(checked) =>
                                updateStepCondition(index, 'if_not_clicked', checked as boolean)
                              }
                            />
                            <label
                              htmlFor={`condition-clicked-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              이전 이메일을 클릭하지 않은 경우에만 발송
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
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

