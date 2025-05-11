"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import MobileMenu from "./mobile-menu"
import { usePathname } from "next/navigation"
import LoginModal from "./login-modal"
import { useAuth } from "@/app/hooks/use-auth"

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, isAdmin, isStaff, logout } = useAuth()

  const handleLoginClick = () => {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on role
      if (isAdmin || isStaff) {
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/seller/dashboard"
      }
    } else {
      setLoginModalOpen(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">워크샵 포트폴리오</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/workshops"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname.startsWith("/workshops") && !pathname.startsWith("/workshops/manage") ? "text-blue-600" : ""
                }`}
              >
                워크샵
              </Link>
              <Link
                href="/reviews"
                className={`transition-colors hover:text-foreground/80 ${
                  pathname.startsWith("/reviews") ? "text-blue-600" : ""
                }`}
              >
                워크샵 후기
              </Link>
              {isAuthenticated && user?.role === "seller" && (
                <Link href="/seller" className={`transition-colors hover:text-foreground/80 ${pathname.startsWith("/seller") ? "text-blue-600" : ""}`}>판매자센터</Link>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  href="/admin"
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname.startsWith("/admin") ? "text-blue-600" : ""
                  }`}
                >
                  관리자메뉴
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>

          <Link href="/" className="md:hidden mx-auto">
            <span className="font-bold">워크샵 포트폴리오</span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" onClick={handleLoginClick}>
              {isAuthenticated ? "판매자센터" : "로그인"}
            </Button>
            {isAuthenticated && (
              <Button variant="ghost" onClick={logout}>
                로그아웃
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  )
}
