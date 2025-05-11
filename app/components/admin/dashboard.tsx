"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/app/hooks/use-auth"
import AdminLayout from "./layout"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Clock,
  FileText,
  Package,
  ShoppingBag,
  User,
  Users,
  AlertTriangle,
  MessageSquare,
  Flag,
  TrendingUp,
  DollarSign,
} from "lucide-react"

// Mock data for charts
const proposalData = [
  { name: "1월", count: 12 },
  { name: "2월", count: 19 },
  { name: "3월", count: 15 },
  { name: "4월", count: 27 },
  { name: "5월", count: 32 },
  { name: "6월", count: 24 },
]

const reservationData = [
  { name: "1월", count: 8 },
  { name: "2월", count: 12 },
  { name: "3월", count: 10 },
  { name: "4월", count: 18 },
  { name: "5월", count: 22 },
  { name: "6월", count: 16 },
]

const categoryData = [
  { name: "팀빌딩", value: 35 },
  { name: "리더십", value: 25 },
  { name: "커뮤니케이션", value: 20 },
  { name: "창의력", value: 15 },
  { name: "기타", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Mock notifications
const notifications = [
  {
    id: 1,
    type: "proposal",
    title: "신규 제안서 접수",
    message: "ABC 기업에서 팀빌딩 워크샵 제안서를 요청했습니다.",
    time: "10분 전",
    read: false,
  },
  {
    id: 2,
    type: "product",
    title: "상품 등록 승인 대기",
    message: "김강사님이 새로운 워크샵 상품을 등록했습니다.",
    time: "1시간 전",
    read: false,
  },
  {
    id: 3,
    type: "inquiry",
    title: "새로운 문의",
    message: "워크샵 진행 방식에 대한 문의가 접수되었습니다.",
    time: "3시간 전",
    read: true,
  },
  {
    id: 4,
    type: "report",
    title: "신고 접수",
    message: "부적절한 내용의 상품에 대한 신고가 접수되었습니다.",
    time: "어제",
    read: true,
  },
]

// Mock todo items
const todoItems = [
  {
    id: 1,
    title: "상품 승인 대기",
    count: 5,
    icon: <Package className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "제안서 답변 대기",
    count: 12,
    icon: <FileText className="h-5 w-5" />,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "신고 처리",
    count: 3,
    icon: <Flag className="h-5 w-5" />,
    color: "bg-red-100 text-red-800",
  },
  {
    id: 4,
    title: "문의 답변",
    count: 8,
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-800",
  },
]

// Mock seller activity
const sellerActivity = [
  {
    id: 1,
    name: "김강사",
    activity: "신규 상품 등록",
    product: "팀빌딩 워크샵",
    time: "1시간 전",
  },
  {
    id: 2,
    name: "이강사",
    activity: "상품 수정",
    product: "리더십 트레이닝",
    time: "3시간 전",
  },
  {
    id: 3,
    name: "박강사",
    activity: "신규 상품 등록",
    product: "커뮤니케이션 워크샵",
    time: "어제",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              최근 7일
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              리포트 다운로드
            </Button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">신규 제안서</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">지난주 대비 +3 증가</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">신규 회원</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">지난주 대비 +5 증가</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">신규 판매자</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">지난주 대비 +1 증가</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">예약 요청</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">지난주 대비 +2 증가</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 매출</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₩12.5M</div>
              <p className="text-xs text-muted-foreground">지난주 대비 +8% 증가</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Notification Panel */}
          <Card className="col-span-7 md:col-span-2">
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>최근 알림 및 업데이트</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        notification.type === "proposal"
                          ? "bg-blue-100"
                          : notification.type === "product"
                            ? "bg-green-100"
                            : notification.type === "inquiry"
                              ? "bg-yellow-100"
                              : "bg-red-100"
                      }`}
                    >
                      {notification.type === "proposal" ? (
                        <FileText className="h-4 w-4 text-blue-600" />
                      ) : notification.type === "product" ? (
                        <Package className="h-4 w-4 text-green-600" />
                      ) : notification.type === "inquiry" ? (
                        <MessageSquare className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                모든 알림 보기
              </Button>
            </CardContent>
          </Card>

          {/* To-Do List */}
          <Card className="col-span-7 md:col-span-2">
            <CardHeader>
              <CardTitle>To-Do List</CardTitle>
              <CardDescription>처리가 필요한 작업</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todoItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-full p-2 ${item.color}`}>{item.icon}</div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <Badge variant="outline" className={item.color}>
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                모든 작업 보기
              </Button>
            </CardContent>
          </Card>

          {/* Activity Charts */}
          <Card className="col-span-7 md:col-span-3">
            <CardHeader>
              <CardTitle>활동 분석</CardTitle>
              <CardDescription>제안서 접수 및 예약 추이</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="proposals">
                <TabsList className="mb-4">
                  <TabsTrigger value="proposals">제안서 접수</TabsTrigger>
                  <TabsTrigger value="reservations">예약 수</TabsTrigger>
                  <TabsTrigger value="categories">인기 카테고리</TabsTrigger>
                </TabsList>
                <TabsContent value="proposals">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={proposalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="reservations">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reservationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="categories">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Seller Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>판매자 모니터링</CardTitle>
            <CardDescription>최근 판매자 활동</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">신규 등록 상품</h3>
                  <div className="space-y-2">
                    {sellerActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="text-sm font-medium">{activity.product}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.name} · {activity.time}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          검토
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">활동 많은 판매자</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">김강사</p>
                        <p className="text-xs text-muted-foreground">상품 5개 · 예약 12건</p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">이강사</p>
                        <p className="text-xs text-muted-foreground">상품 3개 · 예약 8건</p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">박강사</p>
                        <p className="text-xs text-muted-foreground">상품 4개 · 예약 6건</p>
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">응답률 낮은 판매자</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">최강사</p>
                        <p className="text-xs text-muted-foreground">응답률 65% · 평균 응답 시간 12시간</p>
                      </div>
                      <Button variant="outline" size="sm">
                        알림
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="text-sm font-medium">정강사</p>
                        <p className="text-xs text-muted-foreground">응답률 72% · 평균 응답 시간 8시간</p>
                      </div>
                      <Button variant="outline" size="sm">
                        알림
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
