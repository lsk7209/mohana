'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Mail, MousePointerClick, TrendingUp } from 'lucide-react'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'

interface Stats {
  totalLeads: number
  newLeads: number
  hotLeads: number
  totalMessages: number
  openRate: number
  clickRate: number
}

export function StatsOverview() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    hotLeads: 0,
    totalMessages: 0,
    openRate: 0,
    clickRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const apiUrl = getApiUrl('/api/admin/stats/overview')
        const response = await fetch(apiUrl)
        if (response.ok) {
          const data = await response.json() as Stats
          setStats(data)
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

    fetchStats()
    // 30초마다 자동 새로고침
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">전체 리드</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalLeads}</div>
          <p className="text-xs text-muted-foreground">신규: {stats.newLeads}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">핫리드</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.hotLeads}</div>
          <p className="text-xs text-muted-foreground">10점 이상</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">오픈율</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.openRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">총 {stats.totalMessages}개 발송</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">클릭율</CardTitle>
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.clickRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">오픈 대비</p>
        </CardContent>
      </Card>
    </div>
  )
}

