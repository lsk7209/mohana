import React from "react"

export default function SellerReviewsPage() {
  // TODO: 실제 로그인 판매자 본인 워크샵 후기만 필터링
  const reviews = [
    { id: 1, workshop: "팀 빌딩 워크샵", reviewer: "홍길동", content: "정말 유익했어요!", date: "2024-05-12" },
    { id: 2, workshop: "창의력 개발 워크샵", reviewer: "김철수", content: "재미있고 알찼습니다.", date: "2024-05-15" },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">후기 관리</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">워크샵</th>
            <th className="p-2 border">작성자</th>
            <th className="p-2 border">내용</th>
            <th className="p-2 border">작성일</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="p-2 border">{r.id}</td>
              <td className="p-2 border">{r.workshop}</td>
              <td className="p-2 border">{r.reviewer}</td>
              <td className="p-2 border">{r.content}</td>
              <td className="p-2 border">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 