"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const companyLogos = [
  { name: "KB국민은행", logo: "/placeholder.svg?height=40&width=120" },
  { name: "법무부", logo: "/placeholder.svg?height=40&width=120" },
  { name: "GS칼텍스", logo: "/placeholder.svg?height=40&width=120" },
  { name: "삼성", logo: "/placeholder.svg?height=40&width=120" },
  { name: "롯데", logo: "/placeholder.svg?height=40&width=120" },
  { name: "네이버", logo: "/placeholder.svg?height=40&width=120" },
  { name: "현대카드", logo: "/placeholder.svg?height=40&width=120" },
  { name: "SK", logo: "/placeholder.svg?height=40&width=120" },
  { name: "LG", logo: "/placeholder.svg?height=40&width=120" },
  { name: "카카오", logo: "/placeholder.svg?height=40&width=120" },
]

export default function CompanyLogosSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const scroll = () => {
      if (isHovered || !scrollContainer) return

      scrollPosition += 0.5
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isHovered])

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">워크샵, 똑똑하게 준비하는 방법</h2>
          <p className="text-xl">
            <span className="text-blue-500 font-bold">4,200</span>개 이상의 기업과{" "}
            <span className="text-blue-500 font-bold">300,000</span>여 명의 직장인이
            <br />
            위버와 함께 건강한 조직문화를 만들어가고 있어요
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide py-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {/* Double the logos for infinite scroll effect */}
            {[...companyLogos, ...companyLogos].map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
