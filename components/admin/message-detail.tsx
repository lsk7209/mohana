'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, MessageSquare, MousePointerClick, Eye, Clock } from 'lucide-react'
import type { Message, MessageEvent } from '@/workers/types'

interface MessageDetailProps {
  messageId: string
}

export function MessageDetail({ messageId }: MessageDetailProps) {
  const [message, setMessage] = useState<Message | null>(null)
  const [events, setEvents] = useState<MessageEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch(`/api/messages/${messageId}`)
        if (response.ok) {
          const data = await response.json() as { message?: Message; events?: MessageEvent[] }
          setMessage(data.message || null)
          setEvents(data.events || [])
        } else {
          throw new Error('Failed to fetch message')
        }
      } catch (error) {
        console.error('Error fetching message:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [messageId])

  if (loading) {
    return <div className="text-center py-4">로딩 중...</div>
  }

  if (!message) {
    return <div className="text-center py-4">메시지를 찾을 수 없습니다.</div>
  }

  const openCount = events.filter(e => e.type === 'open').length
  const clickCount = events.filter(e => e.type === 'click').length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {message.channel === 'email' ? (
              <Mail className="h-5 w-5" />
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
            <CardTitle className="text-lg">
              {message.subject || '제목 없음'}
            </CardTitle>
          </div>
          <Badge variant={message.status === 'sent' ? 'default' : 'secondary'}>
            {message.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">발송 시간</p>
            <p className="font-medium">
              {message.sent_at
                ? new Date(message.sent_at).toLocaleString('ko-KR')
                : '미발송'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">채널</p>
            <p className="font-medium">{message.channel.toUpperCase()}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">내용</p>
          <div
            className="prose prose-sm max-w-none p-4 bg-muted rounded-md"
            dangerouslySetInnerHTML={{ __html: message.body_rendered }}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">오픈:</span>
              <span className="font-medium">{openCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">클릭:</span>
              <span className="font-medium">{clickCount}</span>
            </div>
          </div>
        </div>

        {events.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">이벤트 타임라인</p>
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Date(event.ts).toLocaleString('ko-KR')}
                  </span>
                  <Badge variant="outline">{event.type}</Badge>
                  {event.meta && (
                    <span className="text-xs text-muted-foreground">
                      {JSON.parse(event.meta).url || ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

