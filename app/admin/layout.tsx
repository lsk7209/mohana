import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 border-r flex flex-col py-8 px-4">
        <h2 className="text-xl font-bold mb-8">관리자센터</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin/workshops" className={`py-2 px-3 rounded ${pathname.startsWith("/admin/workshops") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>워크샵 관리</Link>
          <Link href="/admin/sellers" className={`py-2 px-3 rounded ${pathname.startsWith("/admin/sellers") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>판매자 관리</Link>
          <Link href="/admin/inquiries" className={`py-2 px-3 rounded ${pathname.startsWith("/admin/inquiries") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>문의 접수 내역</Link>
          <Link href="/admin/reviews" className={`py-2 px-3 rounded ${pathname.startsWith("/admin/reviews") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>후기 관리</Link>
          <Link href="/admin/stats" className={`py-2 px-3 rounded ${pathname.startsWith("/admin/stats") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"}`}>정산/통계</Link>
          <Link href="/" className={`py-2 px-3 rounded hover:bg-gray-200`}>홈</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  )
} 