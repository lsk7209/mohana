'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'
import { Users, Mail, MousePointerClick, TrendingUp, Calendar } from 'lucide-react'

interface DailyStats {
  date: string
  leads: number
  messages: number
  opens: number
  clicks: number
}

/**
 * 통계 상세 페이지
 * 일별/주별/월별 통계를 조회할 수 있는 페이지
 */
export default function AdminStatsPage() {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'7days' | '30days' | '90days'>('30days')

  useEffect(() => {
    fetchStats()
  }, [period])

  async function fetchStats() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl('/api/admin/stats/daily')
      const response = await fetch(apiUrl)
      
      if (response.ok) {
        const data = await response.json() as { stats?: DailyStats[] }
        const stats = data.stats || []
        
        // 기간 필터링
        const now = Date.now()
        const periodMs = {
          '7days': 7 * 24 * 60 * 60 * 1000,
          '30days': 30 * 24 * 60 * 60 * 1000,
          '90days': 90 * 24 * 60 * 60 * 1000,
        }[period]
        
        const filteredStats = stats.filter(stat => {
          const statDate = new Date(stat.date).getTime()
          return statDate >= now - periodMs
        })
        
        setDailyStats(filteredStats)
      } else {
        setDailyStats([])
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setDailyStats([])
    } finally {
      setLoading(false)
    }
  }

  const totalLeads = dailyStats.reduce((sum, stat) => sum + stat.leads, 0)
  const totalMessages = dailyStats.reduce((sum, stat) => sum + stat.messages, 0)
  const totalOpens = dailyStats.reduce((sum, stat) => sum + stat.opens, 0)
  const totalClicks = dailyStats.reduce((sum, stat) => sum + stat.clicks, 0)
  const openRate = totalMessages > 0 ? ((totalOpens / totalMessages) * 100).toFixed(1) : '0'
  const clickRate = totalOpens > 0 ? ((totalClicks / totalOpens) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
            통계 상세
          </h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
            일별/주별/월별 통계를 조회합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={period === '7days' ? 'default' : 'outline'}
            onClick={() => setPeriod('7days')}
          >
            7일
          </Button>
          <Button
            variant={period === '30days' ? 'default' : 'outline'}
            onClick={() => setPeriod('30days')}
          >
            30일
          </Button>
          <Button
            variant={period === '90days' ? 'default' : 'outline'}
            onClick={() => setPeriod('90days')}
          >
            90일
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 리드</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              {period === '7days' ? '최근 7일' : period === '30days' ? '최근 30일' : '최근 90일'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 발송</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              이메일 및 SMS 합계
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오픈율</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRate}%</div>
            <p className="text-xs text-muted-foreground">
              {totalOpens} / {totalMessages} 오픈
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">클릭율</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              {totalClicks} / {totalOpens} 클릭
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>일별 통계</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-gray-500">로딩 중...</div>
          ) : dailyStats.length === 0 ? (
            <div className="text-center py-12 text-gray-500">통계 데이터가 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">날짜</th>
                    <th className="text-right p-3 font-semibold">리드</th>
                    <th className="text-right p-3 font-semibold">발송</th>
                    <th className="text-right p-3 font-semibold">오픈</th>
                    <th className="text-right p-3 font-semibold">클릭</th>
                    <th className="text-right p-3 font-semibold">오픈율</th>
                    <th className="text-right p-3 font-semibold">클릭율</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyStats.map((stat, idx) => {
                    const openRate = stat.messages > 0 ? ((stat.opens / stat.messages) * 100).toFixed(1) : '0'
                    const clickRate = stat.opens > 0 ? ((stat.clicks / stat.opens) * 100).toFixed(1) : '0'
                    return (
                      <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3">
                          {new Date(stat.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </td>
                        <td className="text-right p-3">{stat.leads}</td>
                        <td className="text-right p-3">{stat.messages}</td>
                        <td className="text-right p-3">{stat.opens}</td>
                        <td className="text-right p-3">{stat.clicks}</td>
                        <td className="text-right p-3">{openRate}%</td>
                        <td className="text-right p-3">{clickRate}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

