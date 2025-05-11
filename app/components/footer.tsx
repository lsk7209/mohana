import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and company info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-40 h-12">
                <Image src="/placeholder.svg?height=48&width=160" alt="워크샵 플랫폼" fill className="object-contain" />
              </div>
            </Link>
          </div>

          {/* Customer center */}
          <div>
            <h3 className="font-semibold mb-4">고객센터</h3>
            <p className="text-sm text-gray-600 mb-1">평일 오전 10:00 ~ 오후 6:00</p>
            <p className="text-sm text-gray-600 mb-1">070-7728-0403</p>
            <p className="text-sm text-gray-600 mb-4">(통화량이 많을 때는 채팅상담을 이용해주세요.)</p>
          </div>

          {/* Workshop inquiry */}
          <div>
            <h3 className="font-semibold mb-4">워크샵 문의 / 상담</h3>
            <p className="text-sm text-gray-600 mb-1">support@innertrip.co.kr</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-end gap-4 mt-8 mb-6 text-sm">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            이용약관
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            개인정보 처리방침
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            결제방법 및 환불정책
          </Link>
        </div>

        {/* Company information */}
        <div className="text-right text-xs text-gray-500 space-y-1">
          <p>(주)이너트립 (대표: 김동현)</p>
          <p>인천광역시 부평구 부평대로 293, 903호(청천동, 부평 대크리티)</p>
          <p>사업자 등록번호 : 111-81-35638</p>
          <p>통신판매업 신고번호 : 2022-인천부평-0422</p>
          <p>개인정보관리책임자 : 김준영 (admin@innertrip.co.kr)</p>
          <p>Copyright © 2019-2025 이너트립. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
