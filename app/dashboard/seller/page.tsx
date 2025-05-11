"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

// 판매자 데이터 샘플
const sellers = [
  {
    id: 1,
    name: "임성규",
    email: "lsk7209@gmail.com",
    phone: "010-7152-7280",
    company: "위드지스",
    status: "활성",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    name: "김준영",
    email: "kim@example.com",
    phone: "010-1234-5678",
    company: "에이스컴퍼니",
    status: "활성",
    createdAt: "2023-06-20",
  },
  {
    id: 3,
    name: "박소연",
    email: "park@example.com",
    phone: "010-9876-5432",
    company: "테크솔루션",
    status: "비활성",
    createdAt: "2023-07-10",
  },
]

export default function SellerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.includes(searchTerm) || seller.email.includes(searchTerm) || seller.company.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">판매자 관리</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          판매자 추가
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="이름, 이메일, 업체명으로 검색"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>업체명</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell>{seller.id}</TableCell>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.phone}</TableCell>
                <TableCell>{seller.company}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      seller.status === "활성" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {seller.status}
                  </span>
                </TableCell>
                <TableCell>{seller.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
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
