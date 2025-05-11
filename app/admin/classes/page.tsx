import React from "react"

export default function ClassesPage() {
  // TODO: 실제 클래스 데이터 연동 필요
  const classes = [
    { id: 1, title: "팀 빌딩 워크샵", instructor: "김강사", type: "오프라인" },
    { id: 2, title: "창의력 개발 워크샵", instructor: "이강사", type: "온라인" },
    { id: 3, title: "리더십 트레이닝", instructor: "박강사", type: "하이브리드" },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">클래스정보 관리</h1>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">클래스명</th>
            <th className="p-2 border">강사</th>
            <th className="p-2 border">유형</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id} className="hover:bg-gray-50">
              <td className="p-2 border">{cls.id}</td>
              <td className="p-2 border">{cls.title}</td>
              <td className="p-2 border">{cls.instructor}</td>
              <td className="p-2 border">{cls.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 