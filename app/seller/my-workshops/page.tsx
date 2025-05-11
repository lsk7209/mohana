import React from "react"

export default function MyWorkshopsPage() {
  // TODO: 실제 로그인 판매자 본인 워크샵만 필터링
  const myWorkshops = [
    { id: 1, title: "팀 빌딩 워크샵", status: "공개", createdAt: "2024-05-01" },
    { id: 2, title: "창의력 개발 워크샵", status: "비공개", createdAt: "2024-05-10" },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">내 워크샵 목록</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">제목</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">등록일</th>
          </tr>
        </thead>
        <tbody>
          {myWorkshops.map((ws) => (
            <tr key={ws.id} className="hover:bg-gray-50">
              <td className="p-2 border">{ws.id}</td>
              <td className="p-2 border">{ws.title}</td>
              <td className="p-2 border">{ws.status}</td>
              <td className="p-2 border">{ws.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 