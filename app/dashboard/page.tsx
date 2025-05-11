"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, Building, History, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">대시보드</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 프로그램</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">지난달 대비 +3 증가</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">판매자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">지난달 대비 +1 증가</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">업체</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">지난달 대비 변동 없음</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이력</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">지난달 대비 +8 증가</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>최근 7일간의 활동 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-2">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">새 프로그램 등록</p>
                  <p className="text-xs text-muted-foreground">오늘 09:32</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-100 p-2">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">새 판매자 등록</p>
                  <p className="text-xs text-muted-foreground">어제 14:05</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-orange-100 p-2">
                  <Building className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">업체 정보 수정</p>
                  <p className="text-xs text-muted-foreground">3일 전 11:23</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>인기 프로그램</CardTitle>
            <CardDescription>가장 많이 조회된 프로그램입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-gray-200 p-1 text-center w-6 h-6 flex items-center justify-center">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-sm">팀 빌딩 워크샵</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  1,245
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-gray-200 p-1 text-center w-6 h-6 flex items-center justify-center">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-sm">창의력 개발 워크샵</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  987
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 rounded-full bg-gray-200 p-1 text-center w-6 h-6 flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-sm">리더십 트레이닝</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  756
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
