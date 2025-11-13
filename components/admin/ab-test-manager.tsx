'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, Users, MousePointerClick } from 'lucide-react'

interface ABTestResult {
  ab_key: string
  variant: string
  sent: number
  opened: number
  clicked: number
  open_rate: number
  click_rate: number
}

export function ABTestManager() {
  const [tests, setTests] = useState<ABTestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKey, setSelectedKey] = useState<string>('')

  useEffect(() => {
    fetchABTests()
  }, [selectedKey])

  async function fetchABTests() {
    setLoading(true)
    try {
      const url = selectedKey
        ? `/api/admin/ab-tests?ab_key=${selectedKey}`
        : '/api/admin/ab-tests'
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json() as { tests?: ABTestResult[] }
        setTests(data.tests || [])
      }
    } catch (error) {
      console.error('Error fetching AB tests:', error)
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
          <CardTitle>A/B 테스트 결과</CardTitle>
          <Select value={selectedKey} onValueChange={setSelectedKey}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="테스트 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">전체</SelectItem>
              {/* TODO: 실제 AB 키 목록 로드 */}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {tests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            A/B 테스트 데이터가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{test.ab_key}</h3>
                    <Badge className="mt-1">{test.variant}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">발송</div>
                    <div className="text-lg font-bold">{test.sent}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4" />
                      오픈율
                    </div>
                    <div className="text-2xl font-bold">{test.open_rate.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {test.opened} / {test.sent}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <MousePointerClick className="h-4 w-4" />
                      클릭율
                    </div>
                    <div className="text-2xl font-bold">{test.click_rate.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {test.clicked} / {test.opened}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="h-4 w-4" />
                      전환율
                    </div>
                    <div className="text-2xl font-bold">
                      {((test.clicked / test.sent) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      클릭 / 발송
                    </div>
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

