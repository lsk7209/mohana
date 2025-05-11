"use client"
import Link from "next/link"
import SearchBar from "./components/search-bar"
import ImageSlider from "./components/image-slider"
import WorkshopCard from "./components/workshop-card"
import { useInView } from "react-intersection-observer"
import MainNav from "./components/main-nav"
import CompanyLogosSection from "./components/company-logos-section"
import Footer from "./components/footer"
import { useState } from "react"

export default function Page() {
  // Animation refs
  const { ref: bestRef, inView: bestInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: themesRef, inView: themesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [searchKeyword, setSearchKeyword] = useState("")

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
    },
    {
      id: 2,
      title: "창의력 개발 워크샵",
      description: "창의적 사고와 문제 해결 능력을 키우는 워크샵입니다.",
      image: "/placeholder.svg?height=400&width=600",
      price: "120,000원",
      rating: 4.8,
      participants: "5-20명",
      duration: "2시간",
      type: "ONLINE",
      hoverMessage: "새로운 아이디어를 발견하고 문제 해결 능력을 키워보세요!",
    },
    {
      id: 3,
      title: "리더십 트레이닝",
      description: "효과적인 리더십 스킬을 개발하는 프리미엄 워크샵입니다.",
      image: "/placeholder.svg?height=400&width=600",
      price: "200,000원",
      rating: 4.7,
      participants: "5-15명",
      duration: "4시간",
      type: "HYBRID",
      hoverMessage: "팀을 이끄는 진정한 리더의 자질을 배워보세요!",
    },
  ]

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
  }

  const filteredWorkshops = featuredWorkshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container px-4 md:px-6">
        {/* Search Bar Section */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Image Slider Section */}
        <section className="py-4 md:py-8">
          <div className="container px-4 md:px-6">
            <ImageSlider />
          </div>
        </section>

        {/* Best Workshops Section */}
        <section id="best" className="py-12 md:py-16" ref={bestRef}>
          <div
            className={`container px-4 md:px-6 transition-all duration-1000 transform ${
              bestInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">워크샵 BEST</h2>
              <Link href="/workshops" className="text-blue-600 hover:underline">
                더 보기 &rarr;
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkshops.map((workshop, index) => (
                <WorkshopCard
                  key={index}
                  id={workshop.id}
                  title={workshop.title}
                  description={workshop.description}
                  image={workshop.image}
                  price={workshop.price}
                  rating={workshop.rating}
                  participants={workshop.participants}
                  duration={workshop.duration}
                  type={workshop.type}
                  hoverMessage={workshop.hoverMessage}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Company Logos Section - Moved below 워크샵 BEST as requested */}
        <CompanyLogosSection />

        {/* Reviews Preview Section */}
        <section className="py-12 md:py-16" ref={themesRef}>
          <div
            className={`container px-4 md:px-6 transition-all duration-1000 transform ${
              themesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">워크샵 후기</h2>
              <Link href="/reviews" className="text-blue-600 hover:underline">
                더 보기 &rarr;
              </Link>
            </div>
            <div className="bg-orange-400 rounded-lg p-6 md:p-10 text-white mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">리뷰 이벤트</h3>
                  <p className="mb-1">30초면에 리뷰 작성하고</p>
                  <p>커피쿠폰 받아가세요.</p>
                </div>
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 right-0">
                    <div className="bg-white text-yellow-400 px-2 py-1 rounded-lg flex">★★★★★</div>
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <div className="w-16 h-16 bg-amber-700 rounded-lg transform rotate-12"></div>
                    <div className="w-16 h-16 bg-amber-500 rounded-lg absolute top-2 left-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
