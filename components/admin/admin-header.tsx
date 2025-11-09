'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Waves, LayoutDashboard, Users, Mail, FileText, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '대시보드', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: '리드 관리', href: '/admin/leads', icon: Users },
  { name: '템플릿', href: '/admin/templates', icon: FileText },
  { name: '시퀀스', href: '/admin/sequences', icon: GitBranch },
]

export function AdminHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">모하나 Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                사이트로 이동
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

