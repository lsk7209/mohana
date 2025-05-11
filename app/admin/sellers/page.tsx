"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"
import AdminLayout from "@/app/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2, Eye, MoreHorizontal, AlertTriangle, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock seller data
const sellers = [
  {
    id: 1,
    name: "임성규",
    email: "lsk7209@gmail.com",
    phone: "010-7152-7280",
    company: "위드지스",
    status: "활성",
    role: "seller",
    products: 5,
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    name: "김준영",
    email: "kim@example.com",
    phone: "010-1234-5678",
    company: "에이스컴퍼니",
    status: "활성",
    role: "seller",
    products: 3,
    createdAt: "2023-06-20",
  },
  {
    id: 3,
    name: "박소연",
    email: "park@example.com",
    phone: "010-9876-5432",
    company: "테크솔루션",
    status: "비활성",
    role: "seller",
    products: 0,
    createdAt: "2023-07-10",
  },
  {
    id: 4,
    name: "이지민",
    email: "lee@example.com",
    phone: "010-5555-6666",
    company: "크리에이티브랩",
    status: "활성",
    role: "seller",
    products: 2,
    createdAt: "2023-08-05",
  },
  {
    id: 5,
    name: "최현우",
    email: "choi@example.com",
    phone: "010-7777-8888",
    company: "이노베이션그룹",
    status: "정지",
    role: "seller",
    products: 1,
    createdAt: "2023-09-15",
  },
]

export default function AdminSellersPage() {
  const { isAuthenticated, isAdmin, isStaff } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeller, setSelectedSeller] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [memo, setMemo] = useState("")

  // Filter sellers based on search term and status
  const filteredSellers = sellers.filter(
    (seller) =>
      (seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || seller.status === statusFilter),
  )

  const handleViewDetails = (seller: any) => {
    setSelectedSeller(seller)
    setIsDetailsOpen(true)
    // In a real app, we would fetch additional details here
    setMemo("이 판매자는 워크샵 진행 경험이 풍부하며, 고객 만족도가 높습니다. 최근 신규 상품 등록이 활발합니다.")
  }

  const handleEditSeller = (seller: any) => {
    setSelectedSeller(seller)
    setIsEditOpen(true)
  }

  const handleDeleteSeller = (seller: any) => {
    setSelectedSeller(seller)
    setIsDeleteOpen(true)
  }

  const handleStatusChange = (status: string) => {
    // In a real app, this would update the seller's status in the database
    setSelectedSeller({ ...selectedSeller, status })
    setIsEditOpen(false)
  }

  const handleRoleChange = (role: string) => {
    // In a real app, this would update the seller's role in the database
    setSelectedSeller({ ...selectedSeller, role })
  }

  const handleSaveMemo = () => {
    // In a real app, this would save the memo to the database
    alert("메모가 저장되었습니다.")
  }

  const confirmDelete = () => {
    // In a real app, this would delete the seller from the database
    alert(`${selectedSeller.name} 판매자가 삭제되었습니다.`)
    setIsDeleteOpen(false)
  }

  if (!isAuthenticated || (!isAdmin && !isStaff)) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">판매자 관리</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            판매자 추가
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="이름, 이메일, 업체명으로 검색"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="활성">활성</SelectItem>
                <SelectItem value="비활성">비활성</SelectItem>
                <SelectItem value="정지">정지</SelectItem>
              </SelectContent>
            </Select>
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
                <TableHead>등록 상품</TableHead>
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
                    <Badge
                      variant="outline"
                      className={
                        seller.status === "활성"
                          ? "bg-green-100 text-green-800"
                          : seller.status === "비활성"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {seller.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{seller.products}</TableCell>
                  <TableCell>{seller.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(seller)}>
                          <Eye className="h-4 w-4 mr-2" />
                          상세 정보
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSeller(seller)}>
                          <Edit className="h-4 w-4 mr-2" />
                          정보 수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteSeller(seller)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Seller Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>판매자 상세 정보</DialogTitle>
              <DialogDescription>판매자의 상세 정보 및 활동 내역을 확인합니다.</DialogDescription>
            </DialogHeader>
            {selectedSeller && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">기본 정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">이름:</span>
                      <span className="text-sm">{selectedSeller.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">이메일:</span>
                      <span className="text-sm">{selectedSeller.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">연락처:</span>
                      <span className="text-sm">{selectedSeller.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">업체명:</span>
                      <span className="text-sm">{selectedSeller.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">상태:</span>
                      <Badge
                        variant="outline"
                        className={
                          selectedSeller.status === "활성"
                            ? "bg-green-100 text-green-800"
                            : selectedSeller.status === "비활성"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {selectedSeller.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">등급:</span>
                      <span className="text-sm">{selectedSeller.role === "seller" ? "판매자" : "관리자"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">등록일:</span>
                      <span className="text-sm">{selectedSeller.createdAt}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-4">내부 메모</h3>
                  <Textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="판매자에 대한 내부 메모를 작성하세요."
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSaveMemo} className="mt-2">
                    메모 저장
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">등록 상품</h3>
                  {selectedSeller.products > 0 ? (
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">팀빌딩 워크샵</span>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            승인됨
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">등록일: 2023-06-10</div>
                      </div>
                      {selectedSeller.products > 1 && (
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">리더십 트레이닝</span>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              승인됨
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">등록일: 2023-07-22</div>
                        </div>
                      )}
                      {selectedSeller.products > 2 && (
                        <Button variant="outline" className="w-full mt-2">
                          모든 상품 보기
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-4 border rounded-md">
                      <p className="text-gray-500">등록된 상품이 없습니다.</p>
                    </div>
                  )}

                  <h3 className="text-lg font-medium mt-6 mb-4">활동 이력</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="text-sm">상품 등록: 팀빌딩 워크샵</div>
                      <div className="text-xs text-gray-500">2023-06-10 14:25</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm">프로필 정보 수정</div>
                      <div className="text-xs text-gray-500">2023-05-20 09:12</div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm">회원 가입</div>
                      <div className="text-xs text-gray-500">{selectedSeller.createdAt} 11:30</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Seller Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>판매자 정보 수정</DialogTitle>
              <DialogDescription>판매자의 정보와 상태를 수정합니다.</DialogDescription>
            </DialogHeader>
            {selectedSeller && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">이름</label>
                  <Input defaultValue={selectedSeller.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">이메일</label>
                  <Input defaultValue={selectedSeller.email} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">연락처</label>
                  <Input defaultValue={selectedSeller.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">업체명</label>
                  <Input defaultValue={selectedSeller.company} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">상태</label>
                  <Select defaultValue={selectedSeller.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                      <SelectItem value="정지">정지</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">등급</label>
                  <Select defaultValue={selectedSeller.role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="등급 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seller">판매자</SelectItem>
                      <SelectItem value="staff">스텝</SelectItem>
                      <SelectItem value="admin">관리자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>판매자 삭제</DialogTitle>
              <DialogDescription>이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
            </DialogHeader>
            {selectedSeller && (
              <div className="flex items-center p-4 border rounded-md bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-medium">
                    {selectedSeller.name} ({selectedSeller.email})
                  </p>
                  <p className="text-sm text-gray-500">{selectedSeller.company}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
