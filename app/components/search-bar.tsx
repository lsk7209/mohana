"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (keyword: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <Card className="w-full overflow-hidden shadow-md rounded-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="flex items-center pl-6 py-3 flex-1">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            placeholder="찾고 싶은 상품을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="워크샵 검색어 입력"
            tabIndex={0}
          />
        </div>

        <Button
          type="submit"
          className="rounded-full px-8 py-6 m-1 bg-blue-600 hover:bg-blue-700"
          aria-label="검색"
          tabIndex={0}
        >
          검색
        </Button>
      </form>
    </Card>
  )
}
