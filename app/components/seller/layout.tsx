"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/hooks/use-auth"
import { BarChart, LayoutDashboard, LogOut, Package, Settings, ShoppingBag, User } from "lucide-react"
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

interface SellerLayoutProps {
  children: React.ReactNode
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState(2)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <Link href="/seller/dashboard" className="flex items-center">
                <span className="text-xl font-bold">판매자 대시보드</span>
              </Link>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/dashboard"}>
                  <Link href="/seller/dashboard">
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    <span>대시보드</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/products"}>
                  <Link href="/seller/products">
                    <Package className="h-5 w-5 mr-3" />
                    <span>상품 관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/orders"}>
                  <Link href="/seller/orders">
                    <ShoppingBag className="h-5 w-5 mr-3" />
                    <span>예약 관리</span>
                    {notifications > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {notifications}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/statistics"}>
                  <Link href="/seller/statistics">
                    <BarChart className="h-5 w-5 mr-3" />
                    <span>통계</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/profile"}>
                  <Link href="/seller/profile">
                    <User className="h-5 w-5 mr-3" />
                    <span>프로필 관리</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/seller/settings"}>
                  <Link href="/seller/settings">
                    <Settings className="h-5 w-5 mr-3" />
                    <span>설정</span>
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
                    {user?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.name || "판매자"}</p>
                    <p className="text-xs text-muted-foreground">판매자</p>
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
