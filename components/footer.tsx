import Link from "next/link"

/**
 * 푸터 컴포넌트
 * 회사 정보와 주요 링크를 제공하는 푸터
 */
export function Footer() {
  return (
    <footer className="w-full bg-neutral-gray dark:bg-black/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-dark-slate-gray dark:text-white mb-4">힐링워크</h2>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>상호: (주)힐링워크 | 대표: 홍길동</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>주소: 서울특별시 강남구 테헤란로 123, 45층</p>
              <p>이메일: contact@healingwork.com | 전화: 02-1234-5678</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-6 mb-4">
              <Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" aria-label="서비스 소개 페이지로 이동">
                서비스 소개
              </Link>
              <Link href="/programs" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" aria-label="프로그램 목록 페이지로 이동">
                프로그램
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" aria-label="문의하기 페이지로 이동">
                문의하기
              </Link>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm font-medium text-dark-slate-gray dark:text-white hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm font-medium text-dark-slate-gray dark:text-white hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 HealingWork Inc. All rights reserved.</p>
        </div>
      </div>
      <a
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEE500] shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        href="https://pf.kakao.com/_your_kakao_channel"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담 채널로 이동 (새 창)"
      >
        <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12.833 9.428L10.33 12.421C10.15 12.645 9.873 12.75 9.613 12.695L5.798 11.907C5.234 11.79 4.8 11.24 4.863 10.669L5.59 4.1C5.642 3.63 6.075 3.275 6.54 3.328L8.91 3.585C9.408 3.64 9.774 4.09 9.71 4.588L9.202 8.783L11.528 6.02C11.912 5.568 12.583 5.518 13.04 5.908L17.712 9.82C18.17 10.21 18.22 10.884 17.818 11.346L12.833 9.428Z"></path>
          <path d="M4.363 15.331C4.802 14.76 5.545 14.55 6.223 14.815L10.038 16.093C10.298 16.188 10.575 16.083 10.755 15.858L15.19 10.365C15.651 9.795 16.48 9.71 17.052 10.174L18.495 11.357C19.308 11.99 19.46 13.13 18.825 13.94L13.254 21.033C12.619 21.843 11.478 21.993 10.665 21.36L4.175 16.943C3.54 16.47 3.425 15.57 3.893 14.935L4.363 15.331Z"></path>
        </svg>
      </a>
    </footer>
  )
}
