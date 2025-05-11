"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("링크가 복사되었습니다.")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">공유할 SNS를 선택해주세요.</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center space-x-2 py-6">
          <Button
            variant="outline"
            className="p-0 h-12 w-12 bg-[#1DA1F2] hover:bg-[#1a94df] border-none"
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)
            }
          >
            <Image src="/twitter-icon.png" alt="Twitter" width={24} height={24} />
          </Button>

          <Button
            variant="outline"
            className="p-0 h-12 w-12 bg-[#3b5998] hover:bg-[#344e86] border-none"
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)
            }
          >
            <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />
          </Button>

          <Button
            variant="outline"
            className="p-0 h-12 w-12 bg-[#2ac426] hover:bg-[#25b121] border-none"
            onClick={() => window.open(`https://band.us/plugin/share?body=${encodeURIComponent(window.location.href)}`)}
          >
            <Image src="/band-icon.png" alt="Band" width={24} height={24} />
          </Button>

          <Button
            variant="outline"
            className="p-0 h-12 w-12 bg-[#FEE500] hover:bg-[#e5cf00] border-none"
            onClick={() => window.open(`https://story.kakao.com/share?url=${encodeURIComponent(window.location.href)}`)}
          >
            <Image src="/kakaotalk-icon.png" alt="KakaoTalk" width={24} height={24} />
          </Button>
        </div>

        <Button variant="secondary" className="w-full" onClick={handleCopyLink}>
          링크 복사하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
