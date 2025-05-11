"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=500&width=1200",
    title: "팀워크 향상 워크샵",
    description: "팀의 협업 능력을 향상시키는 다양한 프로그램",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=500&width=1200",
    title: "창의력 개발 워크샵",
    description: "혁신적인 아이디어 발상을 위한 창의력 프로그램",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=500&width=1200",
    title: "리더십 트레이닝",
    description: "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=500&width=1200",
    title: "의사소통 워크샵",
    description: "명확하고 효과적인 의사소통 기술을 배우는 워크샵",
  },
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)),
      5000,
    )

    return () => {
      resetTimeout()
    }
  }, [currentIndex])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <div
        className="w-full h-full transition-transform duration-500 ease-out flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-10">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === slideIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => goToSlide(slideIndex)}
          >
            <span className="sr-only">Go to slide {slideIndex + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
