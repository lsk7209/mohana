import { create } from "zustand"

// Workshop type definition
interface Workshop {
  id: number
  title: string
  description: string
  summary: string
  image: string
  price: number
  priceType: "per_person" | "per_session"
  minParticipants: number
  maxParticipants: number
  duration: number
  format: "온라인" | "오프라인" | "혼합"
  category: string
  status: "검수 대기" | "검수 중" | "승인 완료" | "미승인"
  seller: {
    name: string
    company: string
    avatar: string
  }
  submittedAt: string
  approvedAt?: string
  rejectionReason?: string
  views: number
  isAd?: boolean
}

interface WorkshopState {
  workshops: Workshop[]
  isLoading: boolean
  error: string | null
  fetchWorkshops: () => Promise<void>
  approveWorkshop: (id: number) => Promise<void>
  rejectWorkshop: (id: number, reason: string) => Promise<void>
}

// Mock data for workshops
const mockWorkshops: Workshop[] = [
  {
    id: 1,
    title: "팀빌딩 워크샵",
    description:
      "팀워크를 강화하고 협업 능력을 향상시키는 인기 워크샵입니다. 다양한 활동을 통해 팀원들 간의 신뢰와 소통을 증진시킵니다.",
    summary: "팀워크를 강화하고 협업 능력을 향상시키는 인기 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 150000,
    priceType: "per_person",
    minParticipants: 10,
    maxParticipants: 30,
    duration: 180,
    format: "오프라인",
    category: "팀빌딩",
    status: "승인 완료",
    seller: {
      name: "임성규",
      company: "위드지스",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-15 14:30",
    approvedAt: "2023-06-17 10:15",
    views: 255,
  },
  {
    id: 2,
    title: "리더십 트레이닝",
    description:
      "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵입니다. 리더로서의 역할과 책임, 팀 관리 기술을 배웁니다.",
    summary: "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 200000,
    priceType: "per_person",
    minParticipants: 5,
    maxParticipants: 15,
    duration: 240,
    format: "오프라인",
    category: "리더십",
    status: "승인 완료",
    seller: {
      name: "김준영",
      company: "에이스컴퍼니",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-10 09:15",
    approvedAt: "2023-06-12 14:30",
    views: 189,
  },
  {
    id: 3,
    title: "온라인 커뮤니케이션 워크샵",
    description:
      "원격 근무 환경에서의 효과적인 의사소통 기술을 배우는 워크샵입니다. 화상 회의, 이메일, 메시징 도구를 활용한 소통 방법을 익힙니다.",
    summary: "원격 근무 환경에서의 효과적인 의사소통 기술을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 120000,
    priceType: "per_person",
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
    views: 175,
  },
  {
    id: 4,
    title: "창의력 개발 워크샵",
    description:
      "창의적 사고와 문제 해결 능력을 키우는 워크샵입니다. 브레인스토밍, 디자인 씽킹 등 다양한 기법을 배웁니다.",
    summary: "창의적 사고와 문제 해결 능력을 키우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 130000,
    priceType: "per_person",
    minParticipants: 8,
    maxParticipants: 25,
    duration: 150,
    format: "혼합",
    category: "창의력",
    status: "검수 중",
    seller: {
      name: "최현우",
      company: "크리에이티브랩",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-06-01 16:10",
    views: 0,
  },
  {
    id: 5,
    title: "스트레스 관리 워크샵",
    description:
      "직장 내 스트레스를 효과적으로 관리하는 방법을 배우는 워크샵입니다. 명상, 호흡법, 시간 관리 기술을 익힙니다.",
    summary: "직장 내 스트레스를 효과적으로 관리하는 방법을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 110000,
    priceType: "per_person",
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
    views: 210,
  },
  {
    id: 6,
    title: "팀 소통 향상 워크샵",
    description:
      "팀 내 소통을 개선하고 갈등을 해결하는 방법을 배우는 워크샵입니다. 적극적 경청, 피드백 기술을 익힙니다.",
    summary: "팀 내 소통을 개선하고 갈등을 해결하는 방법을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 140000,
    priceType: "per_person",
    minParticipants: 8,
    maxParticipants: 20,
    duration: 180,
    format: "오프라인",
    category: "커뮤니케이션",
    status: "승인 완료",
    seller: {
      name: "이지민",
      company: "커뮤니케이션랩",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-05-20 13:45",
    approvedAt: "2023-05-22 10:30",
    views: 165,
  },
  {
    id: 7,
    title: "프로젝트 관리 워크샵",
    description:
      "효율적인 프로젝트 관리 기술을 배우는 워크샵입니다. 계획 수립, 리소스 관리, 일정 관리 방법을 익힙니다.",
    summary: "효율적인 프로젝트 관리 기술을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 160000,
    priceType: "per_person",
    minParticipants: 5,
    maxParticipants: 15,
    duration: 240,
    format: "혼합",
    category: "리더십",
    status: "승인 완료",
    seller: {
      name: "김준영",
      company: "에이스컴퍼니",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-05-15 09:30",
    approvedAt: "2023-05-17 14:20",
    views: 145,
    isAd: true,
  },
  {
    id: 8,
    title: "혁신 워크샵",
    description: "조직 내 혁신 문화를 조성하는 방법을 배우는 워크샵입니다. 창의적 사고, 변화 관리 기술을 익힙니다.",
    summary: "조직 내 혁신 문화를 조성하는 방법을 배우는 워크샵입니다.",
    image: "/placeholder.svg?height=400&width=600",
    price: 180000,
    priceType: "per_person",
    minParticipants: 10,
    maxParticipants: 25,
    duration: 210,
    format: "오프라인",
    category: "창의력",
    status: "승인 완료",
    seller: {
      name: "최현우",
      company: "크리에이티브랩",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    submittedAt: "2023-05-10 11:15",
    approvedAt: "2023-05-12 16:30",
    views: 130,
  },
]

export const useWorkshopStore = create<WorkshopState>((set) => ({
  workshops: [],
  isLoading: false,
  error: null,

  fetchWorkshops: async () => {
    set({ isLoading: true })
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/workshops')
      // const data = await response.json()

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set({ workshops: mockWorkshops, isLoading: false })
    } catch (error) {
      set({ error: "Failed to fetch workshops", isLoading: false })
    }
  },

  approveWorkshop: async (id: number) => {
    set({ isLoading: true })
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/workshops/${id}/approve`, { method: 'POST' })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => ({
        workshops: state.workshops.map((workshop) =>
          workshop.id === id
            ? {
                ...workshop,
                status: "승인 완료",
                approvedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
              }
            : workshop,
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: "Failed to approve workshop", isLoading: false })
    }
  },

  rejectWorkshop: async (id: number, reason: string) => {
    set({ isLoading: true })
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/workshops/${id}/reject`, {
      //   method: 'POST',
      //   body: JSON.stringify({ reason }),
      //   headers: { 'Content-Type': 'application/json' }
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => ({
        workshops: state.workshops.map((workshop) =>
          workshop.id === id ? { ...workshop, status: "미승인", rejectionReason: reason } : workshop,
        ),
        isLoading: false,
      }))
    } catch (error) {
      set({ error: "Failed to reject workshop", isLoading: false })
    }
  },
}))
