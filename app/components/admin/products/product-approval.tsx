"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock product data
const products = [
  {
    id: 1,
    title: "팀빌딩 워크샵",
    summary: "팀워크를 강화하고 협업 능력을 향상시키는 인기 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 150000,
    minParticipants: 10,
    maxParticipants: 30,
    duration: 180,
    format: "오프라인",
    category: "팀빌딩",
    status: "검수 대기",
    seller: {
      name: "임성규",
      company: "위드지스",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-15 14:30",
  },
  {
    id: 2,
    title: "리더십 트레이닝",
    summary: "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 200000,
    minParticipants: 5,
    maxParticipants: 15,
    duration: 240,
    format: "오프라인",
    category: "리더십",
    status: "검수 중",
    seller: {
      name: "김준영",
      company: "에이스컴퍼니",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-10 09:15",
  },
  {
    id: 3,
    title: "온라인 커뮤니케이션 워크샵",
    summary: "원격 근무 환경에서의 효과적인 의사소통 기술을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 120000,
    minParticipants: 5,
    maxParticipants: 20,
    duration: 120,
    format: "온라인",
    category: "커뮤니케이션",
    status: "승인 완료",
    seller: {
      name: "박소연",
      company: "테크솔루션",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-05 11:20",
    approvedAt: "2023-06-07 14:45",
  },
  {
    id: 4,
    title: "창의력 개발 워크샵",
    summary: "창의적 사고와 문제 해결 능력을 키우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 130000,
    minParticipants: 8,
    maxParticipants: 25,
    duration: 150,
    format: "혼합",
    category: "창의력",
    status: "미승인",
    seller: {
      name: "최현우",
      company: "크리에이티브랩",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-01 16:10",
    rejectionReason: "상품 설명이 불충분하며, 가격 정책이 명확하지 않습니다. 수정 후 재검수 요청해주세요.",
  },
  {
    id: 5,
    title: "스트레스 관리 워크샵",
    summary: "직장 내 스트레스를 효과적으로 관리하는 방법을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 110000,
    minParticipants: 10,
    maxParticipants: 30,
    duration: 120,
    format: "오프라인",
    category: "웰빙",
    status: "승인 완료",
    seller: {
      name: "정민지",
      company: "웰니스그룹",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-05-25 10:30",
    approvedAt: "2023-05-27 09:15",
  },
]

export default function ProductApproval() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isApproveOpen, setIsApproveOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  // Filter products based on search term, status filter, and active tab
  const filteredProducts = products.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" ||
        (statusFilter === "pending" && (product.status === "검수 대기" || product.status === "검수 중")) ||
        (statusFilter === "approved" && product.status === "승인 완료") ||
        (statusFilter === "rejected" && product.status === "미승인")) &&
      ((activeTab === "pending" && (product.status === "검수 대기" || product.status === "검수 중")) ||
        (activeTab === "approved" && product.status === "승인 완료") ||
        (activeTab === "rejected" && product.status === "미승인")),
  )

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product)
    setIsDetailsOpen(true)
  }

  const handleApprove = (product: any) => {
    setSelectedProduct(product)
    setIsApproveOpen(true)
  }

  const handleReject = (product: any) => {
    setSelectedProduct(product)
    setIsRejectOpen(true)
  }

  const confirmApprove = () => {
    // In a real app, this would update the product status in the database
    alert(`${selectedProduct.title} 상품이 승인되었습니다. 프론트페이지에 자동으로 반영됩니다.`)
    setIsApproveOpen(false)
    setIsDetailsOpen(false)
  }

  const confirmReject = () => {
    // In a real app, this would update the product status in the database
    alert(`${selectedProduct.title} 상품이 미승인되었습니다.`)
    setIsRejectOpen(false)
    setIsDetailsOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "검수 대기":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            검수 대기
          </Badge>
        )
      case "검수 중":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            검수 중
          </Badge>
        )
      case "승인 완료":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            승인 완료
          </Badge>
        )
      case "미승인":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            미승인
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="상품명, 판매자, 업체명으로 검색"
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
              <SelectItem value="pending">검수 대기/중</SelectItem>
              <SelectItem value="approved">승인 완료</SelectItem>
              <SelectItem value="rejected">미승인</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">검수 대기/중</TabsTrigger>
          <TabsTrigger value="approved">승인 완료</TabsTrigger>
          <TabsTrigger value="rejected">미승인</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {getStatusBadge(product.status)}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.summary}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                        <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {product.seller.name} ({product.seller.company})
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>가격: {product.price.toLocaleString()}원</span>
                      <span>
                        인원: {product.minParticipants}-{product.maxParticipants}명
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>형식: {product.format}</span>
                      <span>시간: {product.duration}분</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(product)}>
                        <Eye className="h-4 w-4 mr-1" /> 상세보기
                      </Button>
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(product)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" /> 승인
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(product)}>
                          <XCircle className="h-4 w-4 mr-1" /> 미승인
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border rounded-md">
                <p className="text-gray-500">검수 대기 중인 상품이 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {getStatusBadge(product.status)}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.summary}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                        <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {product.seller.name} ({product.seller.company})
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>가격: {product.price.toLocaleString()}원</span>
                      <span>
                        인원: {product.minParticipants}-{product.maxParticipants}명
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>형식: {product.format}</span>
                      <span>시간: {product.duration}분</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">승인일: {product.approvedAt}</div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(product)}>
                      <Eye className="h-4 w-4 mr-1" /> 상세보기
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border rounded-md">
                <p className="text-gray-500">승인된 상품이 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {getStatusBadge(product.status)}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{product.summary}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                        <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {product.seller.name} ({product.seller.company})
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>가격: {product.price.toLocaleString()}원</span>
                      <span>
                        인원: {product.minParticipants}-{product.maxParticipants}명
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>형식: {product.format}</span>
                      <span>시간: {product.duration}분</span>
                    </div>
                    <div className="mt-2 p-2 bg-red-50 rounded-md text-sm text-red-800">
                      <p className="font-medium">미승인 사유:</p>
                      <p>{product.rejectionReason}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(product)}>
                      <Eye className="h-4 w-4 mr-1" /> 상세보기
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border rounded-md">
                <p className="text-gray-500">미승인된 상품이 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>상품 상세 정보</DialogTitle>
            <DialogDescription>상품의 상세 정보를 확인하고 승인 여부를 결정합니다.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="relative h-64 rounded-md overflow-hidden mb-4">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">상품명:</span>
                    <span className="text-sm">{selectedProduct.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">카테고리:</span>
                    <span className="text-sm">{selectedProduct.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">가격:</span>
                    <span className="text-sm">{selectedProduct.price.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">인원:</span>
                    <span className="text-sm">
                      {selectedProduct.minParticipants}-{selectedProduct.maxParticipants}명
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">진행 방식:</span>
                    <span className="text-sm">{selectedProduct.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">소요 시간:</span>
                    <span className="text-sm">{selectedProduct.duration}분</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">상태:</span>
                    {getStatusBadge(selectedProduct.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">등록일:</span>
                    <span className="text-sm">{selectedProduct.submittedAt}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">상품 설명</h3>
                <p className="text-sm mb-4">{selectedProduct.summary}</p>

                <h3 className="text-lg font-medium mb-2">판매자 정보</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={selectedProduct.seller.avatar || "/placeholder.svg"}
                      alt={selectedProduct.seller.name}
                    />
                    <AvatarFallback>{selectedProduct.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedProduct.seller.name}</p>
                    <p className="text-sm text-gray-500">{selectedProduct.seller.company}</p>
                  </div>
                </div>

                {selectedProduct.status === "미승인" && (
                  <div className="p-3 bg-red-50 rounded-md mb-4">
                    <p className="font-medium text-red-800">미승인 사유:</p>
                    <p className="text-sm text-red-800">{selectedProduct.rejectionReason}</p>
                  </div>
                )}

                {(selectedProduct.status === "검수 대기" || selectedProduct.status === "검수 중") && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedProduct)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> 승인
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleReject(selectedProduct)}>
                      <XCircle className="h-4 w-4 mr-1" /> 미승인
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Dialog */}
      <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>상품 승인</DialogTitle>
            <DialogDescription>
              이 상품을 승인하시겠습니까? 승인 시 프론트페이지에 자동으로 노출됩니다.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="flex items-center p-4 border rounded-md bg-green-50">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="font-medium">{selectedProduct.title}</p>
                <p className="text-sm text-gray-500">
                  {selectedProduct.seller.name} ({selectedProduct.seller.company})
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveOpen(false)}>
              취소
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={confirmApprove}>
              승인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>상품 미승인</DialogTitle>
            <DialogDescription>이 상품을 미승인하는 이유를 입력해주세요.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="flex items-center p-4 border rounded-md bg-red-50 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <div>
                <p className="font-medium">{selectedProduct.title}</p>
                <p className="text-sm text-gray-500">
                  {selectedProduct.seller.name} ({selectedProduct.seller.company})
                </p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">미승인 사유</label>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="미승인 사유를 상세히 입력해주세요. 판매자에게 전달됩니다."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={confirmReject} disabled={!rejectionReason.trim()}>
              미승인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
