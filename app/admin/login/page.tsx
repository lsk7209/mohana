'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

/**
 * 관리자 로그인 페이지
 * 개발 단계: 자동 로그인 (비밀번호 불필요)
 * 프로덕션: 비밀번호: 1234
 */
export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 개발 단계: 자동 로그인
  useEffect(() => {
    const isDevelopment = typeof window !== 'undefined' && (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname.includes('.pages.dev')
    )
    
    if (isDevelopment) {
      const expires = new Date()
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7일
      document.cookie = `admin_auth=authenticated; expires=${expires.toUTCString()}; path=/`
      router.push('/admin')
      router.refresh()
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password === '1234') {
        // 쿠키에 인증 토큰 설정 (7일 유효)
        const expires = new Date()
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7일
        document.cookie = `admin_auth=authenticated; expires=${expires.toUTCString()}; path=/`
        
        // 관리자 페이지로 리다이렉트
        router.push('/admin')
        router.refresh()
      } else {
        setError('비밀번호가 올바르지 않습니다.')
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark-slate-gray dark:text-white mb-2">
              관리자 로그인
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              힐링워크 관리자 페이지에 접속합니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-dark-slate-gray dark:text-white mb-2"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark-slate-gray dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-white hover:bg-primary/90 font-bold text-base"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              비밀번호를 잊으셨나요? 관리자에게 문의하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

