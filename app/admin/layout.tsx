import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Cloudflare Access 인증 확인
  // const isAuthenticated = checkAccess(request)
  // if (!isAuthenticated) {
  //   redirect('/login')
  // }

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-light-gray-bg dark:bg-background-dark font-display">
      <div className="flex h-full grow flex-row">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

