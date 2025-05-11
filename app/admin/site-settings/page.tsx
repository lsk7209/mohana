"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"
import AdminLayout from "@/app/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageIcon, Layout, FootprintsIcon as Footer } from "lucide-react"

export default function SiteSettingsPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("slider")

  if (!isAuthenticated || !isAdmin) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">사이트 설정</h1>
          <Button>변경사항 저장</Button>
        </div>

        <Tabs defaultValue="slider" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slider">
              <ImageIcon className="h-4 w-4 mr-2" />
              슬라이드 설정
            </TabsTrigger>
            <TabsTrigger value="banner">
              <Layout className="h-4 w-4 mr-2" />
              배너 설정
            </TabsTrigger>
            <TabsTrigger value="footer">
              <Footer className="h-4 w-4 mr-2" />
              푸터 설정
            </TabsTrigger>
          </TabsList>

          {/* Slider Settings */}
          <TabsContent value="slider" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>메인 슬라이드 설정</CardTitle>
                <CardDescription>홈페이지 상단에 표시되는 슬라이드를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="border rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">슬라이드 {index}</h3>
                      <Button variant="outline" size="sm">
                        이미지 변경
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`slide-title-${index}`}>제목</Label>
                        <Input id={`slide-title-${index}`} defaultValue={`슬라이드 ${index} 제목`} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`slide-subtitle-${index}`}>부제목</Label>
                        <Input id={`slide-subtitle-${index}`} defaultValue={`슬라이드 ${index} 부제목`} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`slide-link-${index}`}>링크 URL</Label>
                      <Input id={`slide-link-${index}`} defaultValue="#" />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm">
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full">슬라이드 추가</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banner Settings */}
          <TabsContent value="banner" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>배너 설정</CardTitle>
                <CardDescription>사이트 내 다양한 배너를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium">메인 페이지 하단 배너</h3>

                  <div className="space-y-2">
                    <Label htmlFor="main-banner-title">제목</Label>
                    <Input id="main-banner-title" defaultValue="리뷰 이벤트" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="main-banner-content">내용</Label>
                    <Textarea id="main-banner-content" defaultValue="30초면에 리뷰 작성하고 커피쿠폰 받아가세요." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="main-banner-bg">배경색</Label>
                    <div className="flex space-x-2">
                      <Input id="main-banner-bg" defaultValue="#F97316" />
                      <div className="w-10 h-10 rounded bg-orange-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="main-banner-link">링크 URL</Label>
                    <Input id="main-banner-link" defaultValue="/reviews" />
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium">워크샵 목록 페이지 배너</h3>

                  <div className="space-y-2">
                    <Label>배너 활성화</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="workshop-banner-active" defaultChecked />
                      <label htmlFor="workshop-banner-active">활성화</label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workshop-banner-title">제목</Label>
                    <Input id="workshop-banner-title" defaultValue="워크샵 할인 이벤트" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workshop-banner-image">배너 이미지</Label>
                    <div className="flex space-x-2">
                      <Input id="workshop-banner-image" defaultValue="/banner-image.jpg" disabled />
                      <Button variant="outline">이미지 변경</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Settings */}
          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>푸터 설정</CardTitle>
                <CardDescription>사이트 하단에 표시되는 정보를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">회사명</Label>
                  <Input id="company-name" defaultValue="(주)이너트립" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ceo-name">대표자명</Label>
                  <Input id="ceo-name" defaultValue="김동현" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">회사 주소</Label>
                  <Input
                    id="company-address"
                    defaultValue="인천광역시 부평구 부평대로 293, 903호(청천동, 부평 대크리티)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-number">사업자 등록번호</Label>
                  <Input id="business-number" defaultValue="111-81-35638" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-number">통신판매업 신고번호</Label>
                  <Input id="sales-number" defaultValue="2022-인천부평-0422" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacy-officer">개인정보관리책임자</Label>
                  <Input id="privacy-officer" defaultValue="김준영 (admin@innertrip.co.kr)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-center">고객센터 정보</Label>
                  <Textarea
                    id="customer-center"
                    defaultValue="평일 오전 10:00 ~ 오후 6:00&#10;070-7728-0403&#10;(통화량이 많을 때는 채팅상담을 이용해주세요.)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="copyright">저작권 정보</Label>
                  <Input id="copyright" defaultValue="Copyright © 2019-2025 이너트립. All rights reserved." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
