'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'
import { Mail, MessageSquare, Calendar, User, CheckCircle2, XCircle, Clock } from 'lucide-react'

interface Message {
  id: string
  lead_id: string
  channel: 'email' | 'sms'
  template_id?: string
  subject?: string
  body_rendered: string
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced'
  error?: string
  created_at: number
  sent_at?: number
  lead?: {
    name?: string
    email?: string
    company?: string
  }
}

/**
 * 메시지 발송 이력 조회 페이지
 * 모든 이메일 및 SMS 발송 내역을 조회할 수 있는 페이지
 */
export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [channelFilter, setChannelFilter] = useState<'all' | 'email' | 'sms'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'delivered' | 'failed' | 'bounced'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    fetchMessages()
  }, [currentPage, channelFilter, statusFilter])

  async function fetchMessages() {
    setLoading(true)
    try {
      // 모든 리드의 메시지를 가져오기 위해 리드 목록을 먼저 가져옴
      const leadsUrl = getApiUrl('/api/admin/leads')
      const leadsResponse = await fetch(leadsUrl)
      
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json() as { leads?: Array<{ id: string; name?: string; email?: string; company?: string }> }
        const leads = leadsData.leads || []
        
        // 각 리드의 메시지 가져오기
        const allMessages: Message[] = []
        for (const lead of leads.slice(0, 50)) { // 최대 50개 리드만 조회
          try {
            const messagesUrl = getApiUrl(`/api/messages/lead/${lead.id}`)
            const messagesResponse = await fetch(messagesUrl)
            if (messagesResponse.ok) {
              const messagesData = await messagesResponse.json() as { messages?: Message[] }
              const leadMessages = (messagesData.messages || []).map(msg => ({
                ...msg,
                lead: {
                  name: lead.name,
                  email: lead.email,
                  company: lead.company,
                },
              }))
              allMessages.push(...leadMessages)
            }
          } catch (error) {
            // 개별 리드 메시지 조회 실패는 무시
          }
        }
        
        // 최신순 정렬
        allMessages.sort((a, b) => (b.created_at || 0) - (a.created_at || 0))
        setMessages(allMessages)
        setTotalPages(Math.ceil(allMessages.length / itemsPerPage))
      } else {
        setMessages([])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    pending: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
    sent: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    delivered: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:bg-green-300',
    failed: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    bounced: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
  }

  const statusLabels = {
    pending: '대기 중',
    sent: '발송 완료',
    delivered: '전달 완료',
    failed: '실패',
    bounced: '반송',
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = !searchQuery ||
      message.lead?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lead?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lead?.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesChannel = channelFilter === 'all' || message.channel === channelFilter
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    
    return matchesSearch && matchesChannel && matchesStatus
  })

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  function formatDate(timestamp?: number) {
    if (!timestamp) return '-'
    return new Date(timestamp).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          메시지 발송 이력
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          모든 이메일 및 SMS 발송 내역을 조회합니다.
        </p>
      </header>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[250px]">
              <Input
                placeholder="리드명, 이메일, 회사명, 제목으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={channelFilter}
                onChange={(e) => {
                  setChannelFilter(e.target.value as 'all' | 'email' | 'sms')
                  setCurrentPage(1)
                }}
              >
                <option value="all">전체 채널</option>
                <option value="email">이메일</option>
                <option value="sms">SMS</option>
              </select>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as 'all' | 'sent' | 'delivered' | 'failed' | 'bounced')
                  setCurrentPage(1)
                }}
              >
                <option value="all">전체 상태</option>
                <option value="sent">발송 완료</option>
                <option value="delivered">전달 완료</option>
                <option value="failed">실패</option>
                <option value="bounced">반송</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">로딩 중...</div>
      ) : paginatedMessages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            발송 이력이 없습니다.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedMessages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {message.channel === 'email' ? (
                      <Mail className="w-5 h-5 text-blue-500" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {message.subject || '(제목 없음)'}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {message.lead?.name && (
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {message.lead.name}
                          </span>
                        )}
                        {message.lead?.company && (
                          <span className="text-sm text-gray-500">
                            ({message.lead.company})
                          </span>
                        )}
                        {message.lead?.email && (
                          <span className="text-sm text-gray-500">
                            {message.lead.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={statusColors[message.status]}>
                    {statusLabels[message.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      생성: {formatDate(message.created_at)}
                    </span>
                    {message.sent_at && (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        발송: {formatDate(message.sent_at)}
                      </span>
                    )}
                  </div>
                  {message.error && (
                    <div className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-700 dark:text-red-300">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{message.error}</span>
                    </div>
                  )}
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm max-h-32 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: message.body_rendered }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {filteredMessages.length}개 중 {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredMessages.length)}개 표시
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

