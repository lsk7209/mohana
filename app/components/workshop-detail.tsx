import React from "react"

interface WorkshopDetailProps {
  workshop: {
    title: string
    summary: string
    image?: string
    type: string
    duration: string
    participants: string
    price: string
    description: string
    seller: string
    status: string
    createdAt: string
  }
}

const WorkshopDetail: React.FC<WorkshopDetailProps> = ({ workshop }) => (
  <div className="space-y-2">
    {workshop.image && (
      <img src={workshop.image} alt="워크샵 썸네일" className="w-full h-40 object-cover rounded mb-2" />
    )}
    <div><span className="font-semibold">제목:</span> {workshop.title}</div>
    <div><span className="font-semibold">한줄 요약:</span> {workshop.summary}</div>
    <div><span className="font-semibold">진행방식:</span> {workshop.type}</div>
    <div><span className="font-semibold">소요 시간:</span> {workshop.duration}</div>
    <div><span className="font-semibold">인원수:</span> {workshop.participants}</div>
    <div><span className="font-semibold">가격:</span> {workshop.price}</div>
    <div><span className="font-semibold">상세 설명:</span>
      <div className="whitespace-pre-line border rounded p-2 bg-gray-50 mt-1">{workshop.description}</div>
    </div>
    <div><span className="font-semibold">강사:</span> {workshop.seller}</div>
    <div><span className="font-semibold">상태:</span> {workshop.status}</div>
    <div><span className="font-semibold">등록일:</span> {workshop.createdAt}</div>
  </div>
)

export default WorkshopDetail 