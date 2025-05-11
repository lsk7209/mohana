"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, Users, Package, LogOut } from "lucide-react"
import MainNav from "../components/main-nav"
import Footer from "../components/footer"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string
    icon?: React.ReactNode
    href: string
    isActive?: boolean
    isExpanded?: boolean
    subItems?: {
      title: string
      href: string
      isActive?: boolean
    }[]
  }[]
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    판매자그룹: true,
    상품그룹: true,
  })

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const sidebarItems = [
    {
      title: "판매자그룹",
      icon: <Users className="h-5 w-5" />,
      href: "#",
      isExpanded: expandedGroups["판매자그룹"],
      subItems: [
        {
          title: "판매자관리",
          href: "/dashboard/seller",
          isActive: pathname === "/dashboard/seller",
        },
        {
          title: "업체관리",
          href: "/dashboard/company",
          isActive: pathname === "/dashboard/company",
        },
        {
          title: "이력관리",
          href: "/dashboard/history",
          isActive: pathname === "/dashboard/history",
        },
      ],
    },
    {
      title: "상품그룹",
      icon: <Package className="h-5 w-5" />,
      href: "#",
      isExpanded: expandedGroups["상품그룹"],
      subItems: [
        {
          title: "프로그램관리",
          href: "/workshops/manage",
          isActive: pathname === "/workshops/manage",
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">관리자 대시보드</h2>
          </div>
          <nav className="p-2">
            <SidebarNav items={sidebarItems} className="space-y-1" onToggleGroup={toggleGroup} />
            <div className="mt-6 pt-6 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex-1">
          <div className="container py-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

function SidebarNav({
  className,
  items,
  onToggleGroup,
  ...props
}: SidebarNavProps & { onToggleGroup: (group: string) => void }) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item, index) => (
        <div key={index} className="space-y-1">
          <Button
            variant="ghost"
            asChild={!item.subItems}
            className={cn("w-full justify-between font-medium", item.isActive && "bg-gray-100")}
            onClick={() => item.subItems && onToggleGroup(item.title)}
          >
            {item.subItems ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span>{item.title}</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", item.isExpanded ? "transform rotate-180" : "")}
                />
              </div>
            ) : (
              <Link href={item.href} className="flex items-center">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <span>{item.title}</span>
              </Link>
            )}
          </Button>
          {item.subItems && item.isExpanded && (
            <div className="ml-4 space-y-1">
              {item.subItems.map((subItem, subIndex) => (
                <Button
                  key={subIndex}
                  variant="ghost"
                  asChild
                  className={cn("w-full justify-start", subItem.isActive && "bg-gray-100 font-medium")}
                >
                  <Link href={subItem.href}>{subItem.title}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
