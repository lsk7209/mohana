"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/hooks/use-auth"

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, isAuthenticated } = useAuth();
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-left">메뉴</SheetTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/workshops"
            className="text-lg font-medium hover:text-blue-600 transition-colors"
            onClick={onClose}
          >
            워크샵
          </Link>
          <Link href="/reviews" className="text-lg font-medium hover:text-blue-600 transition-colors" onClick={onClose}>
            워크샵 후기
          </Link>
          {isAuthenticated && user?.role === "seller" && (
            <Link href="/seller" className="text-lg font-medium hover:text-blue-600 transition-colors" onClick={onClose}>
              판매자센터
            </Link>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin" className="text-lg font-medium hover:text-blue-600 transition-colors" onClick={onClose}>
              관리자메뉴
            </Link>
          )}
          <div className="border-t my-4 pt-4">
            <Button className="w-full" variant="outline">
              로그인
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
