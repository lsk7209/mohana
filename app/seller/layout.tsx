"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SellerLayoutProps {
  children: ReactNode
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 border-r flex flex-col py-8 px-4">
        <h2 className="text-xl font-bold mb-8">판매자센터</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/seller/my-workshops" className={`py-2 px-3 rounded ${pathname.startsWith("/seller/my-workshops") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>내 워크샵 목록</Link>
          <Link href="/seller/workshops/new" className={`py-2 px-3 rounded ${pathname.startsWith("/seller/workshops/new") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>워크샵 등록</Link>
          <Link href="/seller/reviews" className={`py-2 px-3 rounded ${pathname.startsWith("/seller/reviews") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>후기 관리</Link>
          <Link href="/seller/profile" className={`py-2 px-3 rounded ${pathname.startsWith("/seller/profile") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>프로필 정보</Link>
          <Link href="/" className={`py-2 px-3 rounded hover:bg-gray-200`}>홈</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  )
} 