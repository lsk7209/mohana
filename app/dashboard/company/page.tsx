"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

// 업체 데이터 샘플
const companies = [
  {
    id: 1,
    name: "위드지스",
    businessNumber: "123-45-67890",
    representative: "임성규",
    address: "인천광역시 부평구 부평대로 293, 903호",
    phone: "010-7152-7280",
    status: "활성",
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    name: "에이스컴퍼니",
    businessNumber: "234-56-78901",
    representative: "김준영",
    address: "서울특별시 강남구 테헤란로 152",
    phone: "02-1234-5678",
    status: "활성",
    createdAt: "2023-06-20",
  },
  {
    id: 3,
    name: "테크솔루션",
    businessNumber: "345-67-89012",
    representative: "박소연",
    address: "서울특별시 서초구 서초대로 398",
    phone: "02-9876-5432",
    status: "비활성",
    createdAt: "2023-07-10",
  },
]

export default function CompanyManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.includes(searchTerm) ||
      company.businessNumber.includes(searchTerm) ||
      company.representative.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">업체 관리</h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          업체 추가
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="업체명, 사업자번호, 대표자명으로 검색"
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
              <TableHead>업체명</TableHead>
              <TableHead>사업자번호</TableHead>
              <TableHead>대표자</TableHead>
              <TableHead>연락처</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.businessNumber}</TableCell>
                <TableCell>{company.representative}</TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      company.status === "활성" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {company.status}
                  </span>
                </TableCell>
                <TableCell>{company.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
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
