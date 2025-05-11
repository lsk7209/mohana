"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 이력 데이터 샘플
const histories = [
  {
    id: 1,
    title: "노르드 언론자동화 교육 진행",
    category: "교육",
    seller: "임성규",
    company: "위드지스",
    date: "2023-05-15",
    status: "완료",
  },
  {
    id: 2,
    title: "팀워크 향상 워크샵",
    category: "팀빌딩",
    seller: "김준영",
    company: "에이스컴퍼니",
    date: "2023-06-20",
    status: "진행중",
  },
  {
    id: 3,
    title: "창의력 개발 워크샵",
    category: "창의력",
    seller: "박소연",
    company: "테크솔루션",
    date: "2023-07-10",
    status: "예정",
  },
  {
    id: 4,
    title: "리더십 트레이닝",
    category: "리더십",
    seller: "임성규",
    company: "위드지스",
    date: "2023-08-05",
    status: "완료",
  },
]

export default function HistoryManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredHistories = histories.filter((history) => {
    const matchesSearch =
      history.title.includes(searchTerm) || history.seller.includes(searchTerm) || history.company.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || history.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">이력 관리</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          이력 추가
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="제목, 판매자, 업체명으로 검색"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="완료">완료</SelectItem>
            <SelectItem value="진행중">진행중</SelectItem>
            <SelectItem value="예정">예정</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>판매자</TableHead>
              <TableHead>업체</TableHead>
              <TableHead>날짜</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistories.map((history) => (
              <TableRow key={history.id}>
                <TableCell>{history.id}</TableCell>
                <TableCell>{history.title}</TableCell>
                <TableCell>{history.category}</TableCell>
                <TableCell>{history.seller}</TableCell>
                <TableCell>{history.company}</TableCell>
                <TableCell>{history.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      history.status === "완료"
                        ? "bg-green-100 text-green-800"
                        : history.status === "진행중"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {history.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
