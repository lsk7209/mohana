import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AdminSidebar from "@/app/components/admin/AdminSidebar"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-white">{children}</main>
    </div>
  )
} 