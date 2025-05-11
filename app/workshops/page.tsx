"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Search } from "lucide-react"
import Footer from "../components/footer"
import MainNav from "../components/main-nav"
import { useWorkshopStore } from "../stores/workshop-store"

export default function WorkshopsPage() {
  const [category, setCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [participantsRange, setParticipantsRange] = useState("all")
  const [format, setFormat] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [searchTerm, setSearchTerm] = useState("")

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get workshops from store
  const { workshops, fetchWorkshops, isLoading } = useWorkshopStore()

  // Fetch workshops on component mount
  useEffect(() => {
    fetchWorkshops()
  }, [fetchWorkshops])

  // Filter workshops based on search term, category, price range, participants range, and format
  const filteredWorkshops = workshops.filter((workshop) => {
    // Only show approved workshops
    if (workshop.status !== "승인 완료") return false

    // Filter by search term
    if (
      searchTerm &&
      !workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (category !== "all" && workshop.category !== category) {
      return false
    }

    // Filter by price range
    if (priceRange !== "all") {
      const price = workshop.price
      if (priceRange === "under50k" && price >= 50000) return false
      if (priceRange === "50k-100k" && (price < 50000 || price > 100000)) return false
      if (priceRange === "100k-150k" && (price < 100000 || price > 150000)) return false
      if (priceRange === "over150k" && price <= 150000) return false
    }

    // Filter by participants range
    if (participantsRange !== "all") {
      const minParticipants = workshop.minParticipants
      if (participantsRange === "under10" && minParticipants >= 10) return false
      if (participantsRange === "10-20" && (minParticipants < 10 || minParticipants > 20)) return false
      if (participantsRange === "20-50" && (minParticipants < 20 || minParticipants > 50)) return false
      if (participantsRange === "over50" && minParticipants <= 50) return false
    }

    // Filter by format
    if (format !== "all" && workshop.format !== format) {
      return false
    }

    return true
  })

  // Sort workshops
  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime()
    } else if (sortBy === "priceAsc") {
      return a.price - b.price
    } else if (sortBy === "priceDesc") {
      return b.price - a.price
    } else if (sortBy === "popular") {
      return b.views - a.views
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">워크샵 프로그램</h1>

        {/* Search Bar */}
        <Card className="w-full overflow-hidden shadow-md rounded-full mb-8">
          <form className="flex items-center">
            <div className="flex items-center pl-6 py-3 flex-1">
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                placeholder="찾고 싶은 상품을 검색해보세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button type="submit" className="rounded-full px-8 py-6 m-1 bg-blue-600 hover:bg-blue-700">
              검색
            </Button>
          </form>
        </Card>

        {/* Sort and Filter Options */}
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="all" className="mb-4">
            <TabsList className="grid grid-cols-4 md:w-fit">
              <TabsTrigger value="all" onClick={() => setCategory("all")}>
                전체
              </TabsTrigger>
              <TabsTrigger value="teambuilding" onClick={() => setCategory("팀빌딩")}>
                팀빌딩
              </TabsTrigger>
              <TabsTrigger value="leadership" onClick={() => setCategory("리더십")}>
                리더십
              </TabsTrigger>
              <TabsTrigger value="communication" onClick={() => setCategory("커뮤니케이션")}>
                커뮤니케이션
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="priceAsc">가격 낮은순</SelectItem>
              <SelectItem value="priceDesc">가격 높은순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workshop Grid */}
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {isLoading ? (
            // Loading skeleton
            Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              ))
          ) : sortedWorkshops.length > 0 ? (
            sortedWorkshops.map((workshop) => (
              <a href={`/workshops/${workshop.id}`} key={workshop.id} className="group">
                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={workshop.image || "/placeholder.svg"}
                        alt={workshop.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {workshop.isAd && <Badge className="absolute top-2 right-2 bg-gray-200 text-gray-700">AD</Badge>}
                    </div>
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {workshop.format}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-blue-600 mb-2">{workshop.category}</div>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{workshop.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-bold">
                        {workshop.price.toLocaleString()}원{workshop.priceType === "per_person" && " /인"}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div>👁️ {workshop.views}</div>
                      <div>
                        👥 {workshop.minParticipants}-{workshop.maxParticipants}명
                      </div>
                      <div>⏱️ {workshop.duration}분</div>
                    </div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center p-8 border rounded-md">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
