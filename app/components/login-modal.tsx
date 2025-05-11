"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/hooks/use-auth"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [signUpType, setSignUpType] = useState<null | 'user' | 'seller'>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [showTerms, setShowTerms] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would handle authentication
    if (!isSignUp) {
      // Mock login - in a real app, this would verify credentials
      login({
        email,
        role: email.includes("admin") ? "admin" : email.includes("staff") ? "staff" : "seller",
        name: email.split("@")[0],
      })
      onClose()

      // Redirect based on role
      if (email.includes("admin") || email.includes("staff")) {
        router.push("/admin/dashboard")
      } else {
        router.push("/seller/dashboard")
      }
    } else {
      // Handle signup logic
      router.push("/seller/dashboard")
      onClose()
    }
  }

  const handleVerification = () => {
    // In a real app, this would send a verification email
    setVerificationSent(true)
  }

  const openTerms = (type: string) => {
    setShowTerms(type)
  }

  const closeTerms = () => {
    setShowTerms(null)
  }

  const termsContent = {
    privacy: `
      개인정보 처리방침
      
      1. 개인정보의 처리 목적
      회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
      
      2. 개인정보의 처리 및 보유기간
      회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
      
      3. 개인정보의 제3자 제공
      회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
      
      4. 정보주체의 권리·의무 및 행사방법
      정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
    `,
    service: `
      서비스 이용약관
      
      제1조 (목적)
      이 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      
      제2조 (정의)
      이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
      1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.
      2. "회원"이라 함은 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
      
      제3조 (약관의 효력 및 변경)
      1. 이 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.
      2. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내에 공지함으로써 효력이 발생합니다.
      
      제4조 (서비스의 제공 및 변경)
      1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.
         - 워크샵 프로그램 정보 제공
         - 워크샵 예약 및 결제 서비스
         - 기타 회사가 추가 개발하거나 제휴를 통해 회원에게 제공하는 일체의 서비스
      2. 회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경할 수 있습니다.
    `,
    marketing: `
      마케팅 정보 수신 동의
      
      회사는 회원님께 유익한 정보를 제공하기 위해 다음과 같은 마케팅 정보를 발송할 수 있습니다.
      
      1. 수신정보
      - 회사 및 제휴사의 상품 또는 서비스에 대한 광고성 정보
      - 이벤트, 할인 혜택 등 프로모션 정보
      - 뉴스레터, 서비스 업데이트 등의 정보
      
      2. 수신방법
      - 이메일, SMS, 앱 푸시 알림 등
      
      3. 수신 동의 거부 및 철회
      - 회원님은 언제든지 마케팅 정보 수신 동의를 철회할 수 있습니다.
      - 수신 동의 철회는 회원정보 설정 페이지에서 가능합니다.
      
      4. 미동의 시 불이익
      - 마케팅 정보 수신 동의를 하지 않아도 기본 서비스 이용에는 제한이 없습니다.
      - 다만, 할인 혜택, 이벤트 참여 기회 등의 정보를 받아보실 수 없습니다.
    `,
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              {isSignUp
                ? signUpType === 'seller'
                  ? '판매자 회원가입'
                  : signUpType === 'user'
                  ? '일반 회원가입'
                  : '회원가입'
                : '로그인'}
            </DialogTitle>
          </DialogHeader>

          {/* 회원가입 유형 선택 */}
          {isSignUp && !signUpType && (
            <div className="flex flex-col gap-4 py-6">
              <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setSignUpType('user')}>일반회원으로 가입</Button>
              <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => setSignUpType('seller')}>판매자회원으로 가입</Button>
              <Button variant="ghost" className="w-full" onClick={() => setIsSignUp(false)}>돌아가기</Button>
            </div>
          )}

          {/* 로그인 또는 회원가입 폼 */}
          {(!isSignUp || !!signUpType) && (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {isSignUp && (
                    <Button
                      type="button"
                      onClick={handleVerification}
                      disabled={verificationSent}
                      className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                    >
                      {verificationSent ? "전송됨" : "인증하기"}
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* 회원가입 유형별 추가 입력 */}
              {isSignUp && signUpType === 'seller' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sellerName">판매자 성함</Label>
                    <Input
                      id="sellerName"
                      placeholder="판매자 성함"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verification">연락처</Label>
                    <Input id="verification" placeholder="연락처(휴대전화)" className="flex-1" />
                    <p className="text-xs text-blue-500">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                      이메일로 인증번호가 전송됩니다
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">유입경로</Label>
                    <div className="relative">
                      <select id="category" className="w-full h-10 px-3 py-2 border rounded-md appearance-none">
                        <option value="">유입경로를 선택해주세요.</option>
                        <option value="search">검색</option>
                        <option value="sns">SNS</option>
                        <option value="recommendation">지인 추천</option>
                        <option value="ad">광고</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                    </div>
                  </div>
                </>
              )}
              {isSignUp && signUpType === 'user' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="userName">이름</Label>
                    <Input id="userName" placeholder="이름" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input id="phone" placeholder="연락처(휴대전화)" required />
                  </div>
                </>
              )}

              {/* 약관 동의 등 기존 내용 유지 */}
              {isSignUp && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">전체 동의</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" />
                    <label htmlFor="privacy" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">개인정보 처리방침 동의 (필수)</label>
                    <span className="text-xs text-blue-500 ml-auto cursor-pointer" onClick={() => openTerms("privacy")}>확인하기</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="service" />
                    <label htmlFor="service" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">서비스 이용약관 동의 (필수)</label>
                    <span className="text-xs text-blue-500 ml-auto cursor-pointer" onClick={() => openTerms("service")}>확인하기</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <label htmlFor="marketing" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">마케팅 수신 동의 (선택)</label>
                    <span className="text-xs text-blue-500 ml-auto cursor-pointer" onClick={() => openTerms("marketing")}>확인하기</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                {isSignUp ? "회원가입하기" : "로그인"}
              </Button>

              <div className="text-center text-sm">
                {isSignUp ? (
                  <p>
                    이미 계정이 있으신가요?{' '}
                    <button type="button" className="text-blue-500 hover:underline" onClick={() => { setIsSignUp(false); setSignUpType(null); }}>
                      로그인
                    </button>
                  </p>
                ) : (
                  <p>
                    계정이 없으신가요?{' '}
                    <button type="button" className="text-blue-500 hover:underline" onClick={() => setIsSignUp(true)}>
                      회원가입
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTerms !== null} onOpenChange={closeTerms}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {showTerms === "privacy" && "개인정보 처리방침"}
              {showTerms === "service" && "서비스 이용약관"}
              {showTerms === "marketing" && "마케팅 수신 동의"}
            </DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-line">
            {showTerms === "privacy" && termsContent.privacy}
            {showTerms === "service" && termsContent.service}
            {showTerms === "marketing" && termsContent.marketing}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={closeTerms}>확인</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
