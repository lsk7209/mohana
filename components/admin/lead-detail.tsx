'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Mail, MessageSquare, Clock, CheckCircle2, XCircle, Eye, MousePointerClick } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { SendMessageDialog } from '@/components/admin/send-message-dialog'
import { MessageDetailDialog } from '@/components/admin/message-detail-dialog'
import type { Lead, Message, MessageEvent } from '@/workers/types'

interface LeadDetailData {
  lead: Lead
  timeline: {
    events: any[]
    messages: (Message & { open_count: number; click_count: number })[]
  }
  score: { score: number }
}

export function LeadDetail({ leadId }: { leadId: string }) {
  const router = useRouter()
  const [data, setData] = useState<LeadDetailData | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string>('')
  const [memo, setMemo] = useState('')
  const [saving, setSaving] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLead() {
      try {
        const apiUrl = getApiUrl(`/api/admin/leads/${leadId}`)
        const response = await fetch(apiUrl)
        if (!response.ok) {
          const errorMessage = await handleFetchError(response)
          toast({
            title: '오류',
            description: errorMessage,
            variant: 'destructive',
          })
          return
        }
        const result = await response.json() as LeadDetailData
        setData(result)
        setStatus(result.lead.status)
        setMemo(result.lead.memo || '')
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

    fetchLead()
  }, [leadId])

  async function handleUpdate() {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, memo }),
      })

      if (!response.ok) {
        throw new Error('Failed to update')
      }

      const updated = await response.json() as LeadDetailData
      setData(prev => prev ? { ...prev, lead: updated.lead } : null)
      
      toast({
        title: '저장 완료',
        description: '리드 정보가 업데이트되었습니다.',
      })
    } catch (error) {
      toast({
        title: '오류',
        description: '저장에 실패했습니다.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  function handleSendEmail() {
    setSendDialogOpen(true)
  }

  function handleSendSMS() {
    setSendDialogOpen(true)
  }

  async function handleMessageSent() {
    // 리드 정보 새로고침
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`)
      if (response.ok) {
        const result = await response.json() as LeadDetailData
        setData(result)
      }
    } catch (error) {
      console.error('Error refreshing lead:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  if (!data) {
    return <div className="text-center py-8">리드를 찾을 수 없습니다.</div>
  }

  const { lead, timeline, score } = data
  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-purple-100 text-purple-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
    on_hold: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{lead.company || '회사명 없음'}</h1>
            <p className="text-muted-foreground">리드 ID: {lead.id}</p>
          </div>
        </div>
        <Badge className={statusColors[lead.status]}>
          {lead.status === 'new' ? '신규' :
           lead.status === 'in_progress' ? '진행중' :
           lead.status === 'quoted' ? '견적' :
           lead.status === 'won' ? '성사' :
           lead.status === 'lost' ? '실패' : '보류'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>담당자명</Label>
                  <p className="text-sm font-medium">{lead.name || '-'}</p>
                </div>
                <div>
                  <Label>이메일</Label>
                  <p className="text-sm font-medium">{lead.email}</p>
                </div>
                <div>
                  <Label>연락처</Label>
                  <p className="text-sm font-medium">{lead.phone || '-'}</p>
                </div>
                <div>
                  <Label>인원 수</Label>
                  <p className="text-sm font-medium">{lead.headcount ? `${lead.headcount}명` : '-'}</p>
                </div>
                <div>
                  <Label>관심 주제</Label>
                  <p className="text-sm font-medium">{lead.theme || '-'}</p>
                </div>
                <div>
                  <Label>리드 스코어</Label>
                  <p className="text-sm font-medium">{score.score}점</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>메모</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="리드에 대한 메모를 입력하세요..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>액션</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">신규</SelectItem>
                    <SelectItem value="in_progress">진행중</SelectItem>
                    <SelectItem value="quoted">견적</SelectItem>
                    <SelectItem value="won">성사</SelectItem>
                    <SelectItem value="lost">실패</SelectItem>
                    <SelectItem value="on_hold">보류</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleUpdate} disabled={saving}>
                  {saving ? '저장 중...' : '저장'}
                </Button>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={handleSendEmail}>
                  <Mail className="h-4 w-4 mr-2" />
                  이메일 발송
                </Button>
                <Button variant="outline" onClick={handleSendSMS}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  SMS 발송
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timeline">타임라인</TabsTrigger>
              <TabsTrigger value="messages">메시지</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-2">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {timeline.events.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">{event.type}</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(event.ts).toLocaleString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-2">
              <Card>
                <CardContent className="p-4">
                  {timeline.messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      발송된 메시지가 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {timeline.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="border-b pb-3 last:border-0 hover:bg-muted/50 p-2 rounded-md transition-colors cursor-pointer"
                          onClick={() => setSelectedMessageId(msg.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {msg.channel === 'email' ? (
                                <Mail className="h-4 w-4" />
                              ) : (
                                <MessageSquare className="h-4 w-4" />
                              )}
                              <span className="text-sm font-medium">{msg.channel.toUpperCase()}</span>
                              <Badge variant={msg.status === 'sent' ? 'default' : 'secondary'}>
                                {msg.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.created_at).toLocaleString('ko-KR')}
                            </span>
                          </div>
                          {msg.subject && (
                            <p className="text-sm font-medium mb-1">{msg.subject}</p>
                          )}
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              오픈: {msg.open_count || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <MousePointerClick className="h-3 w-3" />
                              클릭: {msg.click_count || 0}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SendMessageDialog
        open={sendDialogOpen}
        onOpenChange={setSendDialogOpen}
        leadId={leadId}
        leadEmail={lead.email}
        leadPhone={lead.phone}
        onSuccess={handleMessageSent}
      />

      {selectedMessageId && (
        <MessageDetailDialog
          open={!!selectedMessageId}
          onOpenChange={(open) => !open && setSelectedMessageId(null)}
          messageId={selectedMessageId}
        />
      )}
    </div>
  )
}

