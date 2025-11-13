import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsOverview } from '@/components/admin/stats-overview'
import { QuickActions } from '@/components/admin/quick-actions'

// 무거운 컴포넌트들을 동적 로드 (코드 스플리팅)
// static export 환경에서는 ssr 옵션이 필요 없습니다
const StatsChart = dynamic(
  () => import('@/components/admin/stats-chart').then((mod) => ({ default: mod.StatsChart })),
  {
    loading: () => <div className="text-center py-8 text-muted-foreground">차트 로딩 중...</div>,
  }
)

const LeadsBoard = dynamic(
  () => import('@/components/admin/leads-board').then((mod) => ({ default: mod.LeadsBoard })),
  {
    loading: () => <div className="text-center py-8 text-muted-foreground">리드 목록 로딩 중...</div>,
  }
)

const ABTestManager = dynamic(
  () => import('@/components/admin/ab-test-manager').then((mod) => ({ default: mod.ABTestManager })),
  {
    loading: () => <div className="text-center py-8 text-muted-foreground">A/B 테스트 데이터 로딩 중...</div>,
  }
)

const SequencePerformance = dynamic(
  () => import('@/components/admin/sequence-performance').then((mod) => ({ default: mod.SequencePerformance })),
  {
    loading: () => <div className="text-center py-8 text-muted-foreground">시퀀스 성과 로딩 중...</div>,
  }
)

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-dark-gray-text dark:text-white text-3xl font-bold leading-tight tracking-[-0.033em]">
          대시보드
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
          리드 관리 및 통계를 확인하세요
        </p>
      </div>

      <StatsOverview />

      <div className="mt-6">
        <QuickActions />
      </div>

      <div className="mt-6">
        <StatsChart />
      </div>

      <Tabs defaultValue="leads" className="mt-6">
        <TabsList className="bg-white dark:bg-gray-900">
          <TabsTrigger value="leads">리드 관리</TabsTrigger>
          <TabsTrigger value="messages">메시지</TabsTrigger>
          <TabsTrigger value="sequences">시퀀스</TabsTrigger>
          <TabsTrigger value="ab-tests">A/B 테스트</TabsTrigger>
        </TabsList>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <a href="/admin/templates" className="text-mint-accent hover:underline">
            템플릿 관리 →
          </a>
        </div>

        <TabsContent value="leads" className="mt-6">
          <LeadsBoard />
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>메시지</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400 mb-4">발송된 메시지 목록을 확인할 수 있습니다.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                각 리드 상세 페이지에서 발송된 메시지와 성과를 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequences" className="mt-6 space-y-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/admin/sequences" className="text-mint-accent hover:underline">
              시퀀스 관리 페이지로 이동 →
            </a>
          </div>
          <SequencePerformance />
        </TabsContent>

        <TabsContent value="ab-tests" className="mt-6">
          <ABTestManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

