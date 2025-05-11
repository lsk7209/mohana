"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

// 임시 워크샵 데이터
const myWorkshops = [
  {
    id: 1,
    title: "팀 빌딩 워크샵",
    status: "승인완료",
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    title: "창의력 개발 워크샵",
    status: "검수요청",
    createdAt: "2024-06-10",
  },
]

export default function SellerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">내 워크샵 관리</h1>
      <div className="mb-6 flex justify-end">
        <Link href="/seller/workshops/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" aria-label="워크샵 등록하기" tabIndex={0}>
            워크샵 등록하기
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">제목</th>
              <th className="px-4 py-2 border">상태</th>
              <th className="px-4 py-2 border">등록일</th>
              <th className="px-4 py-2 border">관리</th>
            </tr>
          </thead>
          <tbody>
            {myWorkshops.map((ws) => (
              <tr key={ws.id} className="text-center">
                <td className="px-4 py-2 border">{ws.title}</td>
                <td className="px-4 py-2 border">{ws.status}</td>
                <td className="px-4 py-2 border">{ws.createdAt}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link href={`/seller/workshops/${ws.id}/edit`}>
                    <Button size="sm" variant="outline" aria-label="수정" tabIndex={0}>수정</Button>
                  </Link>
                  <Button size="sm" variant="destructive" aria-label="삭제" tabIndex={0} onClick={() => alert("삭제 기능은 추후 구현")}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
