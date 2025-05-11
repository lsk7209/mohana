"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/hooks/use-auth"
import {
  BarChart,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Tag,
  User,
  Users,
  MessageSquare,
  Flag,
  Star,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState(5)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <Link href="/admin/dashboard" className="flex items-center">
                <span className="text-xl font-bold">관리자 대시보드</span>
              </Link>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    <span>대시보드</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/sellers"}>
                  <Link href="/admin/sellers">
                    <Users className="h-5 w-5 mr-3" />
                    <span>판매자관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/proposals"}>
                  <Link href="/admin/proposals">
                    <FileText className="h-5 w-5 mr-3" />
                    <span>제안서관리</span>
                    {notifications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {notifications}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/products"}>
                  <Link href="/admin/products">
                    <Package className="h-5 w-5 mr-3" />
                    <span>상품관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/users"}>
                  <Link href="/admin/users">
                    <User className="h-5 w-5 mr-3" />
                    <span>회원등급관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/categories"}>
                  <Link href="/admin/categories">
                    <Tag className="h-5 w-5 mr-3" />
                    <span>카테고리/배너관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/statistics"}>
                  <Link href="/admin/statistics">
                    <BarChart className="h-5 w-5 mr-3" />
                    <span>통계 리포트</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/inquiries"}>
                  <Link href="/admin/inquiries">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    <span>문의/CS관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/reports"}>
                  <Link href="/admin/reports">
                    <Flag className="h-5 w-5 mr-3" />
                    <span>신고관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* New menu items for site settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/reviews"}>
                  <Link href="/admin/reviews">
                    <Star className="h-5 w-5 mr-3" />
                    <span>후기관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/site-settings")}>
                  <Link href="/admin/site-settings">
                    <Settings className="h-5 w-5 mr-3" />
                    <span>사이트 설정</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2 border-t">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.name || "관리자"}</p>
                    <p className="text-xs text-muted-foreground">{user?.role === "admin" ? "관리자" : "스텝"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </SidebarProvider>
  )
}
