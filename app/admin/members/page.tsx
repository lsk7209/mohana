import React from "react"

export default function MembersPage() {
  // TODO: 실제 회원 데이터 연동 필요
  const members = [
    { id: 1, name: "홍길동", email: "hong@test.com", role: "user" },
    { id: 2, name: "김관리자", email: "admin@test.com", role: "admin" },
    { id: 3, name: "이판매자", email: "seller@test.com", role: "seller" },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">회원정보 관리</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">이메일</th>
            <th className="p-2 border">권한</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="p-2 border">{member.id}</td>
              <td className="p-2 border">{member.name}</td>
              <td className="p-2 border">{member.email}</td>
              <td className="p-2 border">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 