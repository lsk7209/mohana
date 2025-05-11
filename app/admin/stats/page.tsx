import React from "react"

export default function AdminStatsPage() {
  // TODO: 실제 정산/통계 데이터 연동
  const stats = [
    { id: 1, seller: "김판매자", unpaid: 1200000, paid: 3000000 },
    { id: 2, seller: "이판매자", unpaid: 500000, paid: 1500000 },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">정산/통계</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">판매자</th>
            <th className="p-2 border">미지급 수익금</th>
            <th className="p-2 border">지급된 수익금</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-2 border">{s.id}</td>
              <td className="p-2 border">{s.seller}</td>
              <td className="p-2 border">{s.unpaid.toLocaleString()}원</td>
              <td className="p-2 border">{s.paid.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 