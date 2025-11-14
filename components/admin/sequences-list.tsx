'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Play, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { SequenceDialog } from '@/components/admin/sequence-dialog'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'

interface Sequence {
  id: string
  name: string
  steps: Array<{
    delay_hours: number
    template_id: string
    channel: 'email' | 'sms'
    conditions?: {
      if_not_opened?: boolean
      if_not_clicked?: boolean
    }
  }>
  created_at: number
  updated_at: number
}

export function SequencesList() {
  const [sequences, setSequences] = useState<Sequence[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSequence, setEditingSequence] = useState<Sequence | null>(null)
  const [runningSequence, setRunningSequence] = useState<string | null>(null)

  useEffect(() => {
    fetchSequences()
  }, [])

  async function fetchSequences() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl('/api/sequences')
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json() as { sequences?: Sequence[] }
        setSequences(data.sequences || [])
      } else {
        const errorMessage = await handleFetchError(response)
        toast({
          title: '오류',
          description: errorMessage,
          variant: 'destructive',
        })
      }
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '네트워크 오류',
        description: networkError.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleCreate() {
    setEditingSequence(null)
    setDialogOpen(true)
  }

  function handleEdit(sequence: Sequence) {
    setEditingSequence(sequence)
    setDialogOpen(true)
  }

  async function handleRun(sequenceId: string, leadId: string) {
    setRunningSequence(sequenceId)
    try {
      const response = await fetch('/api/sequences/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          sequence_id: sequenceId,
        }),
      })

      if (!response.ok) {
        throw new Error('시퀀스 실행 실패')
      }

      toast({
        title: '시퀀스 시작',
        description: '시퀀스가 성공적으로 시작되었습니다.',
      })
    } catch (error) {
      toast({
        title: '오류',
        description: '시퀀스 실행에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setRunningSequence(null)
    }
  }

  function handleSuccess() {
    setDialogOpen(false)
    fetchSequences()
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            시퀀스는 리드에게 자동으로 메시지를 발송하는 워크플로우입니다.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          새 시퀀스
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sequences.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-muted-foreground">
              시퀀스가 없습니다. 새 시퀀스를 만들어보세요.
            </CardContent>
          </Card>
        ) : (
          sequences.map((sequence) => (
            <Card key={sequence.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{sequence.name}</CardTitle>
                    <Badge className="mt-2">
                      {sequence.steps.length}개 스텝
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(sequence)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sequence.steps.slice(0, 3).map((step, index) => {
                    // 고유 key 생성: delay_hours + template_id + channel 조합
                    const stepKey = `${sequence.id}-step-${step.delay_hours}-${step.template_id}-${step.channel}-${index}`
                    return (
                      <div key={stepKey} className="text-sm text-muted-foreground">
                        {index === 0 ? '즉시' : `+${step.delay_hours}시간`}: {step.channel === 'email' ? '이메일' : 'SMS'}
                      </div>
                    )
                  })}
                  {sequence.steps.length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{sequence.steps.length - 3}개 더...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <SequenceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        sequence={editingSequence}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

