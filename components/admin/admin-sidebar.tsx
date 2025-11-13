'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  icon: string
  label: string
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard', icon: 'dashboard', label: '대시보드' },
  { href: '/admin/leads', icon: 'leaderboard', label: '리드 관리' },
  { href: '/admin/programs', icon: 'play_lesson', label: '강의 관리' },
  { href: '/admin/instructors', icon: 'school', label: '강사 관리' },
  { href: '/admin/templates', icon: 'forum', label: '문의 관리' },
  { href: '/admin/billing', icon: 'paid', label: '정산' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside 
      className="flex h-screen min-h-full flex-col justify-between bg-white dark:bg-gray-900 p-4 w-64 sticky top-0 border-r border-gray-200 dark:border-gray-700"
      aria-label="관리자 사이드바 네비게이션"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZTETwjkCjp9wQ_k6yBZjbfi04_Gyzaw6bv82xHYSOktlMFB7vpfTAsgNfoLH4LbbAAhzbs-FQ9RxoI6FoDZM73OJVI437vstGTobANlB43K79raXIaOk8G_Qq5ZVLsTJHqmAFQtuCnQdx-aNbx2Obb9pHWJaQWHmKZQ08FEiI1P-PCnEfv45zigr3lhVYwt-yGPqKr3Q26qz_FKv2TVEs6ksM4J5WntLPzT9ph7yPjVGvANiRTAlPKVhcnrIvLQxqSqzMeoB9Gvm6")',
            }}
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <h1 className="text-dark-gray-text dark:text-white text-base font-bold leading-normal">워크샵 플랫폼</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">관리자 CRM</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2" aria-label="주요 메뉴">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={`${item.label} 페이지로 이동`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-mint-accent/10 text-mint-accent dark:bg-mint-accent/20 dark:text-mint-accent'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-dark-gray-text dark:text-gray-300'
                }`}
              >
                <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                <p className="text-sm font-medium leading-normal">{item.label}</p>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-1">
        <Link
          href="/admin/settings"
          aria-label="설정 페이지로 이동"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-dark-gray-text dark:text-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined" aria-hidden="true">settings</span>
          <p className="text-sm font-medium leading-normal">설정</p>
        </Link>
        <button 
          aria-label="로그아웃"
          onClick={() => {
            // TODO: 로그아웃 로직 구현
            console.log('로그아웃')
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-dark-gray-text dark:text-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined" aria-hidden="true">logout</span>
          <p className="text-sm font-medium leading-normal">로그아웃</p>
        </button>
      </div>
    </aside>
  )
}

