"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkshopCard from "./workshop-card"
import { useInView } from "react-intersection-observer"

const themes = [
  {
    id: "teambuilding",
    name: "팀빌딩",
    workshops: [
      {
        title: "협업 게임 워크샵",
        description: "팀원 간의 협업과 의사소통을 향상시키는 게임 중심 워크샵입니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "120,000원",
        rating: 4.7,
        participants: "10-30명",
        duration: "2시간",
      },
      {
        title: "아웃도어 팀빌딩",
        description: "야외에서 진행되는 활동적인 팀빌딩 프로그램입니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "180,000원",
        rating: 4.8,
        participants: "15-40명",
        duration: "4시간",
      },
      {
        title: "요리 팀빌딩",
        description: "함께 요리하며 팀워크를 기르는 창의적인 워크샵입니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "150,000원",
        rating: 4.9,
        participants: "8-20명",
        duration: "3시간",
      },
    ],
  },
  {
    id: "creativity",
    name: "창의력",
    workshops: [
      {
        title: "디자인 씽킹 워크샵",
        description: "창의적 문제 해결을 위한 디자인 씽킹 방법론을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "140,000원",
        rating: 4.6,
        participants: "5-15명",
        duration: "3시간",
      },
      {
        title: "아이디어 발상 워크샵",
        description: "혁신적인 아이디어를 발상하는 다양한 기법을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "130,000원",
        rating: 4.5,
        participants: "5-20명",
        duration: "2.5시간",
      },
      {
        title: "스토리텔링 워크샵",
        description: "효과적인 스토리텔링 기법을 배우는 창의적 워크샵입니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "120,000원",
        rating: 4.7,
        participants: "5-15명",
        duration: "2시간",
      },
    ],
  },
  {
    id: "leadership",
    name: "리더십",
    workshops: [
      {
        title: "리더십 역량 강화 워크샵",
        description: "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵입니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "200,000원",
        rating: 4.8,
        participants: "5-15명",
        duration: "4시간",
      },
      {
        title: "코칭 리더십 워크샵",
        description: "팀원의 성장을 돕는 코칭 리더십 기술을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "180,000원",
        rating: 4.7,
        participants: "5-12명",
        duration: "3시간",
      },
      {
        title: "변화 관리 리더십",
        description: "조직 변화를 효과적으로 이끄는 리더십 기술을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "220,000원",
        rating: 4.9,
        participants: "5-15명",
        duration: "4시간",
      },
    ],
  },
  {
    id: "communication",
    name: "의사소통",
    workshops: [
      {
        title: "효과적인 커뮤니케이션 워크샵",
        description: "명확하고 효과적인 의사소통 기술을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "130,000원",
        rating: 4.6,
        participants: "8-20명",
        duration: "2.5시간",
      },
      {
        title: "갈등 해결 워크샵",
        description: "직장 내 갈등을 건설적으로 해결하는 방법을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "150,000원",
        rating: 4.7,
        participants: "5-15명",
        duration: "3시간",
      },
      {
        title: "프레젠테이션 스킬 워크샵",
        description: "설득력 있는 프레젠테이션 기술을 배웁니다.",
        image: "/placeholder.svg?height=400&width=600",
        price: "140,000원",
        rating: 4.8,
        participants: "5-12명",
        duration: "3시간",
      },
    ],
  },
]

export default function ThemeWorkshops() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100" : "opacity-0"}`}>
      <Tabs defaultValue="teambuilding" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          {themes.map((theme) => (
            <TabsTrigger key={theme.id} value={theme.id} className="text-sm md:text-base">
              {theme.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {themes.map((theme) => (
          <TabsContent key={theme.id} value={theme.id}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {theme.workshops.map((workshop, index) => (
                <WorkshopCard
                  key={index}
                  title={workshop.title}
                  description={workshop.description}
                  image={workshop.image}
                  price={workshop.price}
                  rating={workshop.rating}
                  participants={workshop.participants}
                  duration={workshop.duration}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
