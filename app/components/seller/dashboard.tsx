"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/app/hooks/use-auth"
import SellerLayout from "./layout"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Package, ShoppingBag, Star, TrendingUp, Clock, FileText } from "lucide-react"

// Mock data for charts
const salesData = [
  { name: "1월", sales: 4 },
  { name: "2월", sales: 6 },
  { name: "3월", sales: 5 },
  { name: "4월", sales: 8 },
  { name: "5월", sales: 10 },
  { name: "6월", sales: 7 },
]

const reviewsData = [
  { name: "1월", reviews: 2, rating: 4.5 },
  { name: "2월", reviews: 4, rating: 4.2 },
  { name: "3월", reviews: 3, rating: 4.7 },
  { name: "4월", reviews: 5, rating: 4.8 },
  { name: "5월", reviews: 6, rating: 4.6 },
  { name: "6월", reviews: 4, rating: 4.9 },
]

// Mock products
const products = [
  {
    id: 1,
    name: "팀빌딩 워크샵",
    status: "승인됨",
    views: 245,
    sales: 12,
    rating: 4.8,
  },
  {
    id: 2,
    name: "리더십 트레이닝",
    status: "승인됨",
    views: 189,
    sales: 8,
    rating: 4.6,
  },
  {
    id: 3,
    name: "커뮤니케이션 워크샵",
    status: "검토중",
    views: 0,
    sales: 0,
    rating: 0,
  },
]

export default function SellerDashboard() {
  const { user } = useAuth()

  return (
    <SellerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">판매자 대시보드</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              최근 30일
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              리포트 다운로드
            </Button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">등록 상품</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">승인됨 2 / 검토중 1</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 판매</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-muted-foreground">지난달 대비 +4 증가</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 평점</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">총 24개 리뷰</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 수익</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₩3.2M</div>
              <p className="text-xs text-muted-foreground">지난달 대비 +12% 증가</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>판매 추이</CardTitle>
              <CardDescription>월별 판매 건수</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" name="판매 건수" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Chart */}
          <Card>
            <CardHeader>
              <CardTitle>리뷰 및 평점</CardTitle>
              <CardDescription>월별 리뷰 수와 평균 평점</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reviewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="reviews"
                      stroke="#8884d8"
                      name="리뷰 수"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rating"
                      stroke="#82ca9d"
                      name="평균 평점"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>내 상품</CardTitle>
            <CardDescription>등록한 상품 목록 및 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">상품명</th>
                    <th className="text-left py-3 px-4">상태</th>
                    <th className="text-left py-3 px-4">조회수</th>
                    <th className="text-left py-3 px-4">판매</th>
                    <th className="text-left py-3 px-4">평점</th>
                    <th className="text-right py-3 px-4">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            product.status === "승인됨"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{product.views}</td>
                      <td className="py-3 px-4">{product.sales}</td>
                      <td className="py-3 px-4">
                        {product.rating > 0 ? (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{product.rating}</span>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          수정
                        </Button>
                        <Button variant="outline" size="sm">
                          통계
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>새 상품 등록</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
