"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import MainNav from "../../components/main-nav"
import Footer from "../../components/footer"

// 프로그램 데이터 샘플
const programs = [
  {
    id: 1,
    title: "ZAPIER 업무 자동화로 칼퇴근하기",
    status: "판매중",
    type: "온라인",
    image: "/placeholder.svg?height=100&width=150",
  },
]

export default function ProgramManagePage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-bold">프로그램 관리</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="상품명을 검색해 보세요"
                className="pl-9 w-[240px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600" asChild>
            <Link href="/workshops/manage/create">
              <Plus className="h-4 w-4 mr-2" />
              프로그램 생성하기
            </Link>
          </Button>
        </div>

        <div className="border rounded-md">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center">
              <input type="checkbox" className="mr-4" />
              <div className="grid grid-cols-12 w-full text-sm font-medium">
                <div className="col-span-6">상품명</div>
                <div className="col-span-3">프로필 영상</div>
                <div className="col-span-3">경력 및 이력</div>
              </div>
            </div>
          </div>

          {programs.length > 0 ? (
            programs.map((program) => (
              <div key={program.id} className="p-4 border-b hover:bg-gray-50">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-4" />
                  <div className="grid grid-cols-12 w-full">
                    <div className="col-span-6 flex items-center">
                      <div className="relative h-16 w-24 mr-4 overflow-hidden rounded">
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{program.title}</div>
                        <div className="flex items-center mt-1">
                          <span className="px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-800 mr-2">
                            {program.status}
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800">{program.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm">동영상</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm">
                        노르드 언론자동화 교육 진행 회사 대표 / 현대자동차, 대전대학교, 뉴미디어캠퍼스 출강
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">등록된 프로그램이 없습니다. 새 프로그램을 생성해보세요.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
