"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.")
    } else {
      router.replace("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-center">로그인</h1>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">이메일</label>
          <Input id="email" name="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required aria-label="이메일" tabIndex={0} />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">비밀번호</label>
          <Input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required aria-label="비밀번호" tabIndex={0} />
        </div>
        {(error || searchParams.get("error")) && <div className="text-red-500 text-sm">{error || "로그인에 실패했습니다."}</div>}
        <Button type="submit" className="w-full" disabled={loading} aria-label="로그인">
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  )
} 