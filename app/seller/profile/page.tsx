import React from "react"

export default function SellerProfilePage() {
  // TODO: 실제 로그인 판매자 정보 연동
  const profile = {
    name: "김판매자",
    email: "seller@test.com",
    phone: "010-1234-5678",
    account: "국민은행 123456-78-901234",
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">프로필 정보</h1>
      <div className="space-y-2">
        <div><span className="font-semibold">이름:</span> {profile.name}</div>
        <div><span className="font-semibold">이메일:</span> {profile.email}</div>
        <div><span className="font-semibold">연락처:</span> {profile.phone}</div>
        <div><span className="font-semibold">정산 계좌:</span> {profile.account}</div>
      </div>
    </div>
  )
} 