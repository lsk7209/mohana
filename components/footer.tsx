import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-neutral-gray dark:bg-surface-dark mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-4">모하나</h2>
            <div className="space-y-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
              <p>상호: (주)모하나 | 대표: 홍길동</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>주소: 서울특별시 강남구 테헤란로 123, 45층</p>
              <p>이메일: contact@mohana.com | 전화: 02-1234-5678</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-6 mb-4">
              <Link href="#services" className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">
                서비스 소개
              </Link>
              <Link href="#programs" className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">
                프로그램
              </Link>
              <Link href="#contact" className="text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">
                문의하기
              </Link>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary hover:text-primary transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary hover:text-primary transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border-light dark:border-border-dark mt-8 pt-6 text-center">
          <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">© 2024 Mohana Inc. All rights reserved.</p>
        </div>
      </div>
      <a
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#FEE500] shadow-lg transition-transform duration-300 hover:scale-110"
        href="#"
        aria-label="카카오톡 상담"
      >
        <svg className="h-8 w-8 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.833 9.428L10.33 12.421C10.15 12.645 9.873 12.75 9.613 12.695L5.798 11.907C5.234 11.79 4.8 11.24 4.863 10.669L5.59 4.1C5.642 3.63 6.075 3.275 6.54 3.328L8.91 3.585C9.408 3.64 9.774 4.09 9.71 4.588L9.202 8.783L11.528 6.02C11.912 5.568 12.583 5.518 13.04 5.908L17.712 9.82C18.17 10.21 18.22 10.884 17.818 11.346L12.833 9.428Z"></path>
          <path d="M4.363 15.331C4.802 14.76 5.545 14.55 6.223 14.815L10.038 16.093C10.298 16.188 10.575 16.083 10.755 15.858L15.19 10.365C15.651 9.795 16.48 9.71 17.052 10.174L18.495 11.357C19.308 11.99 19.46 13.13 18.825 13.94L13.254 21.033C12.619 21.843 11.478 21.993 10.665 21.36L4.175 16.943C3.54 16.47 3.425 15.57 3.893 14.935L4.363 15.331Z"></path>
        </svg>
      </a>
    </footer>
  )
}
