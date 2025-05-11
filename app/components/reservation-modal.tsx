"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  workshopTitle: string
  additionalOptions?: {
    name: string
    price: number
  }[]
}

export default function ReservationModal({
  isOpen,
  onClose,
  workshopTitle,
  additionalOptions = [
    { name: "1시간 추가 진행: 300,000원(현장결제)", price: 300000 },
    { name: "조별 추가피드백지: 3,000원(1인당)", price: 3000 },
  ],
}: ReservationModalProps) {
  const [transportationOpen, setTransportationOpen] = useState(false)
  const [transportationOption, setTransportationOption] = useState<string | null>(null)

  const transportationOptions = [
    { name: "서울/경기(무료)", price: 0 },
    { name: "경기외곽(+45,000원)", price: 45000 },
    { name: "춘천/중부(+55,000원)", price: 55000 },
    { name: "충북/충남(+85,000원)", price: 85000 },
    { name: "대전/강원(+110,000원)", price: 110000 },
    { name: "전북/경북(+160,000원)", price: 160000 },
    { name: "전남/경남(+220,000원)", price: 220000 },
    { name: "제주/도서지역(+330,000원, 물품 운송비 별도)", price: 330000 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-xs text-red-500 font-medium">오프라인 워크샵 예약신청</div>
          <DialogTitle className="text-xl font-bold">{workshopTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름<span className="text-red-500">*</span>
              </label>
              <Input id="name" placeholder="담당자 성함" />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                회사/담당부서<span className="text-red-500">*</span>
              </label>
              <Input id="company" placeholder="회사/담당부서" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일<span className="text-red-500">*</span>
              </label>
              <Input id="email" placeholder="이메일 주소" type="email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium">
                연락처<span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="휴대폰번호 (문자/알림톡 수신용)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">휴대폰번호 (문자/알림톡 수신용)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-blue-500">
                프로그램관리가 이미 등록 된 카카오톡에 알림톡 발송 ※ 없다면, (메일로 전송)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="participants" className="text-sm font-medium">
                진행인원<span className="text-red-500">*</span>
              </label>
              <Input id="participants" placeholder="5인전 예약은 문의사항에 작성" />
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">
                시간시간<span className="text-red-500">*</span>
              </label>
              <Input id="time" placeholder="오전 8시 ~ 10시 사이" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                희망일정<span className="text-red-500">*</span>
              </label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                출장지<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="서울/경기(무료)" />
                  </SelectTrigger>
                  <SelectContent>
                    {transportationOptions.map((option) => (
                      <SelectItem key={option.name} value={option.name}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">추가옵션(가격)</th>
                  <th className="text-center p-3 w-24">개수</th>
                </tr>
              </thead>
              <tbody>
                {additionalOptions.map((option, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{option.name}</td>
                    <td className="p-3">
                      <Input
                        type="number"
                        min="0"
                        defaultValue="0"
                        className="h-8 text-center"
                        aria-label={`${option.name} 개수`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              진행요소
            </label>
            <Textarea id="message" placeholder="워크샵을 진행할 장소에 주소를 적어주세요." className="min-h-[80px]" />
            <p className="text-xs text-blue-500">※자세히 알아야 할 수 있는 워크샵 장소를 알려주세요.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="purpose" className="text-sm font-medium">
              워크샵 목적
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="워크샵 목적을 선택해주세요.(목수-선택가능)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teambuilding">팀빌딩</SelectItem>
                <SelectItem value="communication">소통 강화</SelectItem>
                <SelectItem value="leadership">리더십 향상</SelectItem>
                <SelectItem value="creativity">창의력 개발</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="target" className="text-sm font-medium">
              워크샵 대상
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="워크샵 대상을 선택해주세요.(목수-선택가능)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 직원</SelectItem>
                <SelectItem value="managers">관리자급</SelectItem>
                <SelectItem value="newemployees">신입사원</SelectItem>
                <SelectItem value="team">특정 팀</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="request" className="text-sm font-medium">
              요청사항
            </label>
            <Textarea
              id="request"
              placeholder="워크샵 진행에 필요한 요청사항이 있다면 적어주세요."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              <span className="font-medium">개인정보취급방침</span>에 의한{" "}
              <span className="font-medium">정보 활용동의</span>를 하셔야합니다. 이에 동의합니다.
            </label>
          </div>
        </div>

        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">오프라인 워크샵 예약신청</Button>
      </DialogContent>
    </Dialog>
  )
}
