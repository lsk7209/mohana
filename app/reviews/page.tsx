"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useInView } from "react-intersection-observer"
import MainNav from "../components/main-nav"
import Footer from "../components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReviewsPage() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const reviews = [
    {
      id: 1,
      name: "김지민",
      avatar: "/placeholder.svg?height=40&width=40",
      workshop: "팀 빌딩 워크샵",
      rating: 5,
      date: "2024.04.15",
      content:
        "우리 팀의 협업 능력이 크게 향상되었습니다. 강사님의 전문성과 프로그램 구성이 매우 좋았습니다. 다양한 활동을 통해 팀원들과 더 가까워질 수 있었고, 서로를 이해하는 시간이 되었습니다.",
    },
    {
      id: 2,
      name: "이승우",
      avatar: "/placeholder.svg?height=40&width=40",
      workshop: "창의력 개발 워크샵",
      rating: 4,
      date: "2024.04.10",
      content:
        "창의적인 사고 방식을 배울 수 있는 좋은 기회였습니다. 다양한 문제 해결 방법을 배우고 실제로 적용해볼 수 있어서 유익했습니다. 다만 시간이 조금 부족했던 것 같습니다.",
    },
    {
      id: 3,
      name: "박소연",
      avatar: "/placeholder.svg?height=40&width=40",
      workshop: "리더십 트레이닝",
      rating: 5,
      date: "2024.04.05",
      content:
        "리더로서의 역할과 책임에 대해 깊이 생각해볼 수 있는 시간이었습니다. 실제 사례를 바탕으로 한 토론과 롤플레이가 매우 효과적이었습니다. 강사님의 피드백도 큰 도움이 되었습니다.",
    },
    {
      id: 4,
      name: "최준호",
      avatar: "/placeholder.svg?height=40&width=40",
      workshop: "요리 팀빌딩",
      rating: 5,
      date: "2024.03.28",
      content:
        "팀원들과 함께 요리하며 자연스럽게 소통하고 협력하는 경험이 정말 좋았습니다. 평소에 보지 못했던 팀원들의 새로운 모습을 발견할 수 있었고, 맛있는 음식까지 만들어 더욱 만족스러웠습니다.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">워크샵 후기</h1>
          <Button onClick={() => setReviewModalOpen(true)}>후기 작성</Button>
        </div>

        <div
          ref={ref}
          className={`grid gap-6 md:grid-cols-2 transition-all duration-1000 transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <p className="text-sm text-muted-foreground mr-2">{review.workshop}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-2">{review.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />

      <Footer />
    </div>
  )
}

// Review Modal Component
function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState("")
  const [selectedWorkshop, setSelectedWorkshop] = useState("")

  const handleSubmit = () => {
    // In a real app, this would submit the review to the server
    console.log("Submitting review:", { rating, reviewText, selectedWorkshop })
    onClose()
    alert("리뷰가 성공적으로 등록되었습니다.")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>워크샵 후기 작성</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">워크샵 선택</label>
            <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop}>
              <SelectTrigger>
                <SelectValue placeholder="워크샵을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teambuilding">팀빌딩 워크샵</SelectItem>
                <SelectItem value="leadership">리더십 트레이닝</SelectItem>
                <SelectItem value="communication">커뮤니케이션 워크샵</SelectItem>
                <SelectItem value="cooking">요리 팀빌딩</SelectItem>
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
                >
                  {star <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">후기 내용</label>
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md"
              placeholder="워크샵에 대한 후기를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            후기 등록하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
