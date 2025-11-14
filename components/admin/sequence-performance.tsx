'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'

interface SequencePerformance {
  sequence_id: string
  sequence_name: string
  total_runs: number
  completed: number
  total_messages: number
  opened: number
  clicked: number
  conversion_rate: number
}

interface Sequence {
  id: string
  name: string
}

export function SequencePerformance() {
  const [performance, setPerformance] = useState<SequencePerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSequence, setSelectedSequence] = useState<string>('')
  const [availableSequences, setAvailableSequences] = useState<Sequence[]>([])

  useEffect(() => {
    fetchSequences()
    fetchPerformance()
  }, [selectedSequence])

  async function fetchSequences() {
    try {
      const apiUrl = getApiUrl('/api/sequences')
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json() as { sequences?: Sequence[] }
        setAvailableSequences(data.sequences || [])
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
    }
  }

  async function fetchPerformance() {
    setLoading(true)
    try {
      const url = selectedSequence
        ? `/api/admin/sequences/performance?sequence_id=${selectedSequence}`
        : '/api/admin/sequences/performance'
      const apiUrl = getApiUrl(url)
      
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json() as { performance?: SequencePerformance[] }
        setPerformance(data.performance || [])
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

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>시퀀스 성과 분석</CardTitle>
          <Select value={selectedSequence} onValueChange={setSelectedSequence}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="시퀀스 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              {availableSequences.map((seq) => (
                <SelectItem key={seq.id} value={seq.id}>
                  {seq.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {performance.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            성과 데이터가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {performance.map((perf) => (
              <div key={perf.sequence_id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{perf.sequence_name}</h3>
                    <Badge className="mt-1">
                      {perf.completed} / {perf.total_runs} 완료
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Mail className="h-4 w-4" />
                      총 발송
                    </div>
                    <div className="text-2xl font-bold">{perf.total_messages}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      오픈
                    </div>
                    <div className="text-2xl font-bold">{perf.opened}</div>
                    <div className="text-xs text-muted-foreground">
                      {perf.total_messages > 0
                        ? ((perf.opened / perf.total_messages) * 100).toFixed(1)
                        : 0}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MessageSquare className="h-4 w-4" />
                      클릭
                    </div>
                    <div className="text-2xl font-bold">{perf.clicked}</div>
                    <div className="text-xs text-muted-foreground">
                      {perf.opened > 0
                        ? ((perf.clicked / perf.opened) * 100).toFixed(1)
                        : 0}%
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      전환율
                    </div>
                    <div className="text-2xl font-bold">{perf.conversion_rate.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

