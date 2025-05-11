"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"
import AdminLayout from "@/app/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock proposal data
const proposals = [
  {
    id: 1,
    company: "ABC 기업",
    contact: "김철수",
    email: "kim@abc.com",
    phone: "010-1234-5678",
    type: "팀빌딩",
    participants: "30명",
    status: "신규",
    date: "2023-06-15",
  },
  {
    id: 2,
    company: "XYZ 주식회사",
    contact: "이영희",
    email: "lee@xyz.com",
    phone: "010-9876-5432",
    type: "리더십",
    participants: "15명",
    status: "검토중",
    date: "2023-06-10",
  },
  {
    id: 3,
    company: "테크 솔루션",
    contact: "박지민",
    email: "park@tech.com",
    phone: "010-5555-6666",
    type: "커뮤니케이션",
    participants: "25명",
    status: "판매자 연결",
    date: "2023-06-05",
  },
  {
    id: 4,
    company: "글로벌 그룹",
    contact: "최현우",
    email: "choi@global.com",
    phone: "010-7777-8888",
    type: "팀빌딩",
    participants: "50명",
    status: "제안 발송",
    date: "2023-06-01",
  },
  {
    id: 5,
    company: "스타트업 허브",
    contact: "정민지",
    email: "jung@startup.com",
    phone: "010-2222-3333",
    type: "창의력",
    participants: "12명",
    status: "완료",
    date: "2023-05-25",
  },
]

export default function ProposalsPage() {
  const { isAuthenticated, isAdmin, isStaff } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProposal, setSelectedProposal] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [responseText, setResponseText] = useState("")
  const [matchingNote, setMatchingNote] = useState("")
  const [activeTab, setActiveTab] = useState("details")

  // Filter proposals based on search term and status
  const filteredProposals = proposals.filter(
    (proposal) =>
      (proposal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || proposal.status === statusFilter)
  )

  const handleViewDetails = (proposal: any) => {
    setSelectedProposal(proposal)
    setIsDetailsOpen(true)
    // In a real app, we would fetch additional details here
    setResponseText(
      proposal.status === "완료" || proposal.status === "제안 발송"
        ? "안녕하세요, ABC 기업 김철수님.\n\n귀사의 팀빌딩 워크샵 제안 요청에 감사드립니다. 요청하신 내용을 바탕으로 다음과 같은 프로그램을 제안드립니다:\n\n1. 팀 빌딩 워크샵 (3시간)\n2. 리더십 트레이닝 (2시간)\n\n자세한 내용은 첨부된 제안서를 참고해주시기 바랍니다. 추가 문의사항이 있으시면 언제든지 연락주세요."
        : ""
    )
    setMatchingNote(
      proposal.status === "판매자 연결" || proposal.status === "제안 발송" || proposal.status === "완료"
        ? "이 고객은 팀빌딩 워크샵을 원하며, 임성규 판매자의 '팀 빌딩 워크샵' 상품이 적합할 것으로 판단됩니다. 고객은 예산에 민감하며, 30명 규모의 워크샵을 원합니다."
        : ""
    )
  }

  const handleStatusChange = (status: string) => {
    // In a real app, this would update the proposal's status in the database
    setSelectedProposal({ ...selectedProposal, status })
  }

  const handleSendResponse = () => {
    // In a real app, this would send the response to the customer
    alert("응답이 발송되었습니다.")
    handleStatusChange("제안 발송")
  }

  const handleSaveNote = () => {
    // In a real app, this would save the matching note to the database
    alert("매칭 메모가 저장되었습니다.")
  }

  if (!isAuthenticated || (!isAdmin && !isStaff)) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">제안서 관리</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="회사명, 담당자, 이메일로 검색"
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
                <SelectItem value="신규">신규</SelectItem>
                <SelectItem value="검토중">검토중</SelectItem>
                <SelectItem value="판매자 연결">판매자 연결</SelectItem>
                <SelectItem value="제안 발송">제안 발송</SelectItem>
                <SelectItem value="완료">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>회사명</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>인원</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>요청일</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>{proposal.id}</TableCell>
                  <TableCell>{proposal.company}</TableCell>
                  <TableCell>{proposal.contact}</TableCell>
                  <TableCell>{proposal.email}</TableCell>
                  <TableCell>{proposal.type}</TableCell>
                  <TableCell>{proposal.participants}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        proposal.status === "신규"
                          ? "bg-blue-100 text-blue-800"
                          : proposal.status === "검토중"
                          ? "bg-yellow-100 text-yellow-800"
                          : proposal.status === "판매자 연결"
                          ? "bg-purple-100 text-purple-800"
                          : proposal.status === "제안 발송"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{proposal.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        <Drop\
