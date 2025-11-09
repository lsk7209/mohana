'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts'

interface DailyStats {
  date: string
  leads: number
  emails: number
  opens: number
  clicks: number
}

export function StatsChart() {
  const [data, setData] = useState<DailyStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats/daily?days=7')
        if (response.ok) {
          const result = await response.json()
          // 날짜 포맷팅
          const formattedData = result.data.map((item: any) => ({
            ...item,
            date: new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
          }))
          setData(formattedData)
        } else {
          throw new Error('Failed to fetch stats')
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // 에러 발생 시 빈 데이터
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>일별 리드 수</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              leads: {
                label: '리드',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="leads" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>이메일 성과</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              emails: {
                label: '발송',
                color: 'hsl(var(--chart-2))',
              },
              opens: {
                label: '오픈',
                color: 'hsl(var(--chart-3))',
              },
              clicks: {
                label: '클릭',
                color: 'hsl(var(--chart-4))',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="emails"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="opens"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

