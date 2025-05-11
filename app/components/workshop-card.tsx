"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface WorkshopCardProps {
  title: string
  description: string
  image: string
  price: string
  rating: number
  participants: string
  duration: string
  id: number
  type?: "OFFLINE" | "ONLINE" | "HYBRID"
  hoverMessage?: string
}

export default function WorkshopCard({
  title,
  description,
  image,
  price,
  rating,
  participants,
  duration,
  id,
  type = "OFFLINE",
  hoverMessage = "예능 게임으로 즐기는 공팀 레크레이션 프로그램들로 우리 모두 함께 즐겨요!",
}: WorkshopCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/workshops/${id}`)
  }

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleCardClick()
    }
  }

  return (
    <Card
      className="overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`${title} 워크샵 카드. 자세히 보려면 Enter 또는 Space를 누르세요.`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${type === "OFFLINE" ? "bg-red-500" : type === "ONLINE" ? "bg-green-600" : "bg-yellow-500"}`}>{type}</div>
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300">
            <div className="relative">
              <p className="text-white text-sm mb-4">{hoverMessage}</p>
              <p className="text-white text-xs font-medium">워크샵 소개</p>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">{price}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
            {participants}
          </span>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
            {duration}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
