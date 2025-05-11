"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, Heart, Share2, ChevronDown } from "lucide-react"
import MobileMenu from "../../components/mobile-menu"
import Footer from "../../components/footer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReservationModal from "@/app/components/reservation-modal"
import ShareModal from "@/app/components/share-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useParams } from "next/navigation"
import WorkshopDetail from "../../components/workshop-detail"
import InquiryModal from "../../components/inquiry-modal"

// Review Modal Component
function ReviewModal({
  isOpen,
  onClose,
  workshopTitle,
}: { isOpen: boolean; onClose: () => void; workshopTitle: string }) {
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("")

  const handleSubmit = () => {
    if (!selectedProgram || !reviewText || !rating) {
      alert("모든 항목을 입력해 주세요.")
      return
    }
    // In a real app, this would submit the review to the server
    console.log("Submitting review:", { rating, reviewText, selectedProgram })
    onClose()
    alert("리뷰가 성공적으로 등록되었습니다.")
    setRating(5)
    setReviewText("")
    setSelectedProgram("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>워크샵 후기 작성</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">워크샵</label>
            <p className="font-medium">{workshopTitle}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="review-program">프로그램 선택</label>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger id="review-program" aria-label="프로그램 선택" tabIndex={0}>
                <SelectValue placeholder="프로그램을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teambuilding">팀빌딩 워크샵</SelectItem>
                <SelectItem value="leadership">리더십 트레이닝</SelectItem>
                <SelectItem value="communication">커뮤니케이션 워크샵</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">별점</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                  aria-label={`별점 ${star}점 선택`}
                  tabIndex={0}
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="review-text">후기 내용</label>
            <textarea
              id="review-text"
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="워크샵에 대한 후기를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              aria-label="후기 내용"
              tabIndex={0}
              required
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" aria-label="후기 등록하기" tabIndex={0}>
            후기 등록하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const featuredWorkshops = [
  {
    id: 1,
    title: "팀 빌딩 워크샵",
    description: "팀워크를 강화하고 협업 능력을 향상시키는 인기 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: "150,000원",
    rating: 4.9,
    participants: "10-30명",
    duration: "3시간",
    type: "OFFLINE",
    hoverMessage: "예능 게임으로 즐기는 공팀 레크레이션 프로그램들로 우리 모두 함께 즐겨요!",
    curriculum: "팀워크 게임, 협업 미션, 피드백 세션",
    notice: "준비물 없음, 편한 복장 권장",
    faq: [
      { q: "준비물이 필요한가요?", a: "별도 준비물은 없습니다." },
      { q: "최소 인원은?", a: "10명부터 진행 가능합니다." },
    ],
    reviews: [
      { user: "홍길동", rating: 5, content: "정말 유익했어요!" },
    ],
  },
  // ... (다른 워크샵도 필요시 추가)
]

export default function WorkshopDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const workshop = featuredWorkshops.find((w) => w.id === id)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const [activeSection, setActiveSection] = useState("details")
  const [reservationModalOpen, setReservationModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [transportationOption, setTransportationOption] = useState<string | null>(null)
  const [inquiryOpen, setInquiryOpen] = useState(false)

  // Refs for sections
  const detailsRef = useRef<HTMLDivElement>(null)
  const curriculumRef = useRef<HTMLDivElement>(null)
  const guideRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  // Calculate total price
  const basePrice = workshop?.price ? Number(workshop.price.replace(/,/g, '')) : 0
  const perPersonPrice = basePrice / (workshop?.participants ? Number(workshop.participants.split('-')[1]) : 1)
  const totalPrice = basePrice

  const handleDownloadProposal = () => {
    // In a real app, this would download the proposal file
    const link = document.createElement("a")
    link.href = workshop?.proposalFile || ""
    link.download = `${workshop?.title}_제안서.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Scroll to section when tab is clicked
  const scrollToSection = (section: string) => {
    setActiveSection(section)

    let ref
    switch (section) {
      case "details":
        ref = detailsRef
        break
      case "curriculum":
        ref = curriculumRef
        break
      case "guide":
        ref = guideRef
        break
      case "reviews":
        ref = reviewsRef
        break
      case "faq":
        ref = faqRef
        break
      default:
        ref = detailsRef
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header

      const sections = [
        { id: "details", ref: detailsRef },
        { id: "curriculum", ref: curriculumRef },
        { id: "guide", ref: guideRef },
        { id: "reviews", ref: reviewsRef },
        { id: "faq", ref: faqRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && scrollPosition >= section.ref.current.offsetTop) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!workshop) {
    return <div className="p-8 text-center">존재하지 않는 워크샵입니다.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">워크샵 포트폴리오</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/workshops" className="transition-colors hover:text-foreground/80 text-blue-600">
                워크샵
              </Link>
              <Link href="/reviews" className="transition-colors hover:text-foreground/80">
                워크샵 후기
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>

          <Link href="/" className="md:hidden mx-auto">
            <span className="font-bold">워크샵 포트폴리오</span>
          </Link>

          <Button variant="outline" className="ml-auto">
            로그인
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="container px-4 md:px-6 py-8">
        <WorkshopDetail workshop={workshop} onInquiry={() => setInquiryOpen(true)} />

        {/* Workshop Details Tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="border-b sticky top-14 bg-white z-10">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeSection === "details" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={() => scrollToSection("details")}
              >
                상세정보
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeSection === "curriculum" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={() => scrollToSection("curriculum")}
              >
                커리큘럼
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeSection === "guide" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={() => scrollToSection("guide")}
              >
                안내사항
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeSection === "reviews" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={() => scrollToSection("reviews")}
              >
                후기
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeSection === "faq" ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
                }`}
                onClick={() => scrollToSection("faq")}
              >
                FAQ
              </button>
            </div>
          </div>

          <div className="py-8">
            {/* Details Section */}
            <div ref={detailsRef} id="details" className="scroll-mt-24 mb-16">
              <h2 className="text-xl font-bold mb-4">상세 정보</h2>
              <div className="prose max-w-none">
                {workshop.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {workshop.gallery.map((img, index) => (
                  <div key={index} className="relative h-60 rounded-md overflow-hidden">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${workshop.title} 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Section */}
            <div ref={curriculumRef} id="curriculum" className="scroll-mt-24 mb-16">
              <h2 className="text-xl font-bold mb-6">커리큘럼</h2>
              <div className="space-y-6">
                {workshop.curriculum.split(", ").map((item, index) => (
                  <div key={index} className="flex border-b pb-6">
                    <div className="w-1/6 font-medium">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guide Section */}
            <div ref={guideRef} id="guide" className="scroll-mt-24 mb-16">
              <h2 className="text-xl font-bold mb-6">안내사항</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">참가 인원</h3>
                  <p>{workshop.participants}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">소요 시간</h3>
                  <p>{workshop.duration}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">준비물</h3>
                  <p>{workshop.notice}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">장소</h3>
                  <p>고객사 회의실 또는 요청하신 장소에서 진행 가능합니다.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">취소 및 환불 규정</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>워크샵 7일 전 취소: 100% 환불</li>
                    <li>워크샵 3~6일 전 취소: 50% 환불</li>
                    <li>워크샵 2일 전 ~ 당일 취소: 환불 불가</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div ref={reviewsRef} id="reviews" className="scroll-mt-24 mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">후기</h2>
                <Button onClick={() => setReviewModalOpen(true)}>후기 작성</Button>
              </div>
              <div className="space-y-6">
                {workshop.reviews.map((review, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{review.user.split(' ')[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.user}</div>
                          <div className="text-xs text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={i < review.rating ? "#FFCA28" : "none"}
                            stroke="#FFCA28"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </CardContent>
                    <p className="text-gray-700">{review.content}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div ref={faqRef} id="faq" className="scroll-mt-24 mb-16">
              <h2 className="text-xl font-bold mb-6">자주 묻는 질문</h2>
              <div className="space-y-4">
                {workshop.faq.map((qna, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-bold mb-2">{qna.q}</h3>
                    <p>{qna.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Process */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-6">오프라인 워크샵 예약과정</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workshop.reservationSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
                <div className="absolute top-6 right-6 text-gray-300">
                  {index < workshop.reservationSteps.length - 1 && <ChevronDown className="h-6 w-6 -rotate-90" />}
                </div>
                <div className="text-red-500 font-bold mb-2">STEP {step.step}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                {step.description && <p className="text-sm text-gray-600">{step.description}</p>}
                {index === 0 && (
                  <Button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => setReservationModalOpen(true)}
                  >
                    예약신청하기
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        workshopTitle={workshop.title}
        additionalOptions={workshop.additionalOptions}
      />

      {/* Share Modal */}
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />

      {/* Review Modal */}
      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} workshopTitle={workshop.title} />

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} workshopTitle={workshop.title} />

      <Footer />
    </div>
  )
}
