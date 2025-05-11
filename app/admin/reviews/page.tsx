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
import { Search, Edit, Trash2, MoreHorizontal } from "lucide-react"
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

// Mock review data
const reviews = [
  {
    id: 1,
    name: "김지민",
    workshop: "팀 빌딩 워크샵",
    rating: 5,
    date: "2024-04-15",
    content: "우리 팀의 협업 능력이 크게 향상되었습니다. 강사님의 전문성과 프로그램 구성이 매우 좋았습니다.",
    status: "승인됨",
  },
  {
    id: 2,
    name: "이승우",
    workshop: "창의력 개발 워크샵",
    rating: 4,
    date: "2024-04-10",
    content:
      "창의적인 사고 방식을 배울 수 있는 좋은 기회였습니다. 다양한 문제 해결 방법을 배우고 실제로 적용해볼 수 있어서 유익했습니다.",
    status: "승인됨",
  },
  {
    id: 3,
    name: "박소연",
    workshop: "리더십 트레이닝",
    rating: 5,
    date: "2024-04-05",
    content: "리더로서의 역할과 책임에 대해 깊이 생각해볼 수 있는 시간이었습니다.",
    status: "승인됨",
  },
  {
    id: 4,
    name: "최준호",
    workshop: "요리 팀빌딩",
    rating: 3,
    date: "2024-03-28",
    content: "팀원들과 함께 요리하며 자연스럽게 소통하고 협력하는 경험이 정말 좋았습니다.",
    status: "대기중",
  },
  {
    id: 5,
    name: "정민지",
    workshop: "스트레스 관리 워크샵",
    rating: 2,
    date: "2024-03-25",
    content: "기대했던 것보다 내용이 부실했습니다. 좀 더 실질적인 스트레스 관리 방법을 배우고 싶었습니다.",
    status: "거부됨",
  },
]

export default function AdminReviewsPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editedContent, setEditedContent] = useState("")
  const [editedRating, setEditedRating] = useState(0)

  if (!isAuthenticated || !isAdmin) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  // Filter reviews based on search term and status
  const filteredReviews = reviews.filter(
    (review) =>
      (review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.workshop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || review.status === statusFilter),
  )

  const handleEditClick = (review: any) => {
    setSelectedReview(review)
    setEditedContent(review.content)
    setEditedRating(review.rating)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (review: any) => {
    setSelectedReview(review)
    setIsDeleteModalOpen(true)
  }

  const handleSaveEdit = () => {
    // In a real app, this would update the review in the database
    console.log("Saving edited review:", { ...selectedReview, content: editedContent, rating: editedRating })
    setIsEditModalOpen(false)
  }

  const handleConfirmDelete = () => {
    // In a real app, this would delete the review from the database
    console.log("Deleting review:", selectedReview)
    setIsDeleteModalOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "승인됨":
        return <Badge className="bg-green-100 text-green-800">승인됨</Badge>
      case "대기중":
        return <Badge className="bg-yellow-100 text-yellow-800">대기중</Badge>
      case "거부됨":
        return <Badge className="bg-red-100 text-red-800">거부됨</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">후기 관리</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="이름, 워크샵, 내용으로 검색"
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
                <SelectItem value="승인됨">승인됨</SelectItem>
                <SelectItem value="대기중">대기중</SelectItem>
                <SelectItem value="거부됨">거부됨</SelectItem>
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
                <TableHead>워크샵</TableHead>
                <TableHead>평점</TableHead>
                <TableHead>내용</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.workshop}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{review.content}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(review)}>
                          <Edit className="h-4 w-4 mr-2" />
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteClick(review)} className="text-red-600">
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

        {/* Edit Review Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>후기 수정</DialogTitle>
              <DialogDescription>후기 내용과 평점을 수정합니다.</DialogDescription>
            </DialogHeader>
            {selectedReview && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">워크샵</label>
                  <p className="font-medium">{selectedReview.workshop}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">평점</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditedRating(star)}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= editedRating ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">후기 내용</label>
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">상태</label>
                  <Select defaultValue={selectedReview.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="승인됨">승인됨</SelectItem>
                      <SelectItem value="대기중">대기중</SelectItem>
                      <SelectItem value="거부됨">거부됨</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleSaveEdit}>저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Review Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>후기 삭제</DialogTitle>
              <DialogDescription>이 후기를 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
            </DialogHeader>
            {selectedReview && (
              <div className="border rounded-md p-4 bg-red-50">
                <p className="font-medium">{selectedReview.name}님의 후기</p>
                <p className="text-sm text-gray-500">{selectedReview.workshop}</p>
                <p className="text-sm mt-2">{selectedReview.content}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
