import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /**
   * Cloudflare Access 인증
   * 
   * 프로덕션 환경에서는 Cloudflare Access를 통해 Admin 페이지 접근을 제어합니다.
   * Cloudflare Dashboard에서 Access 애플리케이션을 생성하고 /admin/* 경로를 보호하세요.
   * 
   * 로컬 개발 환경에서는 이 검증을 비활성화할 수 있습니다.
   * 
   * @see https://developers.cloudflare.com/cloudflare-one/policies/access/
   */
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

