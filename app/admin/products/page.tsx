"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"
import AdminLayout from "@/app/components/admin/layout"
import ProductApproval from "@/app/components/admin/products/product-approval"

export default function ProductsPage() {
  const { isAuthenticated, isAdmin, isStaff } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not authenticated or not admin/staff
    if (!isAuthenticated || (!isAdmin && !isStaff)) {
      router.push("/")
    }
  }, [isAuthenticated, isAdmin, isStaff, router])

  if (!isAuthenticated || (!isAdmin && !isStaff)) {
    return <div className="p-8 text-center">접근 권한이 없습니다.</div>
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">상품 관리</h1>
        </div>
        <ProductApproval />
      </div>
    </AdminLayout>
  )
}
