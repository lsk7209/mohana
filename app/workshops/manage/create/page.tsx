"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import MainNav from "../../../components/main-nav"
import Footer from "../../../components/footer"
import { useRouter } from "next/navigation"

export default function CreateProgramPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [expandedSection, setExpandedSection] = useState<string | null>("basic")
  const router = useRouter()

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const handleSubmit = () => {
    // 실제로는 여기서 프로그램 생성 API를 호출할 것입니다
    router.push("/workshops/manage")
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-bold">프로그램 관리</h1>
          <p className="text-sm text-gray-500">판매할 프로그램 정보를 등록하는 페이지입니다.</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b mb-8">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "basic" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              기본정보
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "curriculum" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("curriculum")}
            >
              커리큘럼
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "price" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("price")}
            >
              가격정보
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "video" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("video")}
            >
              진행영상
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "preparation" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("preparation")}
            >
              준비사항
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {/* 기본정보 */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleSection("basic")}
                >
                  <h2 className="font-medium">기본정보</h2>
                  <button className="text-gray-500">
                    {expandedSection === "basic" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                {expandedSection === "basic" && (
                  <div className="p-4 border-t">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          워크샵 이름 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2">
                          <Input placeholder="워크샵 이름을 입력해주세요" />
                          <Select defaultValue="offline">
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="오프라인" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="offline">오프라인</SelectItem>
                              <SelectItem value="online">온라인</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-xs text-blue-500 mt-1">
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                          프로그램명은 워크샵을 잘 설명할 수 있어야 합니다.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          프로그램 분류 <span className="text-red-500">*</span>
                        </label>
                        <Select defaultValue="">
                          <SelectTrigger>
                            <SelectValue placeholder="선택해주세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teambuilding">팀빌딩</SelectItem>
                            <SelectItem value="leadership">리더십</SelectItem>
                            <SelectItem value="communication">커뮤니케이션</SelectItem>
                            <SelectItem value="creativity">창의력</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          상세설명 <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          placeholder="상세하고 간략하게 작성해 주세요. 너무 긴 문장은 워크샵 소개 50"
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-end text-xs text-gray-500 mt-1">0 / 50</div>
                        <p className="text-xs text-blue-500 mt-1">
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                          워크샵 특징과 프로그램의 핵심을 잘 보여주세요.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          한 줄 소개 <span className="text-red-500">*</span>
                        </label>
                        <Input placeholder="예시) 신입사원 워크샵 및 직급별 리더십이 모두가 좋은 수 있어요" />
                        <div className="flex justify-end text-xs text-gray-500 mt-1">0 / 50</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          대표 이미지(2D) <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                              >
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">이미지를 끌어 놓으세요.</p>
                            <Button variant="outline" size="sm">
                              파일 선택
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          최대 2장 • 20MB제한 • 권장비율 16:9, png, jpeg, webp • 최소 1280 x 720
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 커리큘럼 */}
          {activeTab === "curriculum" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="mb-4">
                  <h2 className="font-medium mb-2">만들기 & 조별 체험</h2>
                  <div className="text-sm text-blue-500 mb-4">
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>총 시간:110분
                  </div>
                  <div className="text-sm text-red-500 mb-4">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>한 항목이 있으면 저장이
                    불가합니다.
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          시간
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          구성
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          내용
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          강사용 가이드
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">10</div>
                          <div className="text-xs text-gray-500">분</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">소개</div>
                        </td>
                        <td className="px-4 py-4">
                          <ul className="list-disc pl-5 text-sm text-gray-900">
                            <li>강사 소개</li>
                            <li>워크샵 취지 소개</li>
                            <li>참석자 소개</li>
                          </ul>
                        </td>
                        <td className="px-4 py-4">
                          <ul className="list-disc pl-5 text-sm text-gray-900">
                            <li>강사 소개에는 전문성, 경력을 소개하며 신뢰를 높여 주세요.</li>
                            <li>워크샵을 통해 어떤 가치를 얻을 수 있는지 지침을 알려주세요.</li>
                            <li>참석자의 예상 사항을 물어보며 기대감을 높여주세요.</li>
                          </ul>
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="flex items-center text-blue-500">
                    <Plus className="h-4 w-4 mr-1" /> 항목 행 추가
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 가격정보 */}
          {activeTab === "price" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="mb-4">
                  <h2 className="font-medium mb-2">기본 수수료</h2>
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <div className="text-sm">판매가</div>
                      <div className="font-medium">30%</div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <div className="text-sm">추가결제</div>
                      <div className="font-medium">20%</div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <div className="text-sm">옵션비</div>
                      <div className="font-medium">10%</div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center">
                      <div className="text-sm">출장비</div>
                      <div className="font-medium">5%</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="bg-gray-100 rounded-md p-4 mb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection("price")}
                    >
                      <h3 className="font-medium">판매가</h3>
                      <button className="text-gray-500">
                        {expandedSection === "price" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    {expandedSection === "price" && (
                      <div className="mt-4 space-y-4">
                        <p className="text-sm text-gray-700">
                          수수료와 VAT 포함 금액으로 입력해 주세요. 수수료와 업체 종류별 세금까지 제외한 금액이어서 업체
                          종류별 변경하시면 최종금액도 달라져요.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">유형 (필수)</label>
                            <Select defaultValue="team">
                              <SelectTrigger>
                                <SelectValue placeholder="회당" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="team">회당</SelectItem>
                                <SelectItem value="person">1인당</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">이름</label>
                            <Input placeholder="이름을 입력해 주세요." />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">금액 (필수)</label>
                            <div className="relative">
                              <Input placeholder="0" className="pr-8" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                원
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">최소 인원</label>
                            <div className="relative">
                              <Input placeholder="0" className="pr-8" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                명
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">최대 인원</label>
                            <div className="relative">
                              <Input placeholder="0" className="pr-8" />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                명
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>수수료 30%</div>
                          <div>수수료 금액: 0원</div>
                          <div>세금: 0원</div>
                          <div>예상 정산액: 0원</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 진행영상 */}
          {activeTab === "video" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="mb-4">
                  <h2 className="font-medium mb-2">진행영상</h2>
                  <p className="text-sm text-gray-700">
                    상품의 진행과정과 강의력이 담긴 동영상을 등록해 주세요. 여러 개라면, 하단 추가 버튼을 눌러 모두
                    등록해 주세요.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">이름</label>
                    <Input placeholder="이름을 입력해 주세요" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">상세 설명</label>
                    <Textarea placeholder="상세 설명을 입력해 주세요" className="min-h-[100px]" />
                    <div className="flex justify-end text-xs text-gray-500 mt-1">0 / 1000</div>
                    <p className="text-xs text-blue-500 mt-1">
                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                      상품의 진행과정과 프로그램 효과 강사의 강의력을 확인할 수 있는 내용으로 작성해 주세요.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">영상</label>
                    <Input placeholder="링크를 입력해 주세요" />
                    <p className="text-xs text-blue-500 mt-1">
                      <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                      강의력이 드러나는 30초 이내의 동영상을 추천드려요.
                    </p>
                  </div>

                  <Button variant="outline" className="flex items-center text-blue-500">
                    <Plus className="h-4 w-4 mr-1" /> 항목 추가
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 준비사항 */}
          {activeTab === "preparation" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-md p-4">
                <div className="mb-4">
                  <h2 className="font-medium mb-2">참여자 준비사항</h2>
                  <p className="text-sm text-gray-700">워크샵 전 참여자가 준비해야 할 사항을 선택해 주세요</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">참여자 착용할 의상 주의사항</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">추가 준비물 확인해 주세요</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">사전 감사 과정이 있습니다</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">참여자에게 준비 사항을 안내해 주세요</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">유의사항을 미리 확인해 주세요</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">강의 자료는 사전에 전달 드립니다</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <Input placeholder="기타 준비사항을 입력해 주세요" />
                </div>

                <Button variant="outline" className="flex items-center text-blue-500 mt-4">
                  <Plus className="h-4 w-4 mr-1" /> 추가
                </Button>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <div className="mb-4">
                  <h2 className="font-medium mb-2">장소 준비사항</h2>
                  <p className="text-sm text-gray-700">워크샵을 진행하기 위해 필요한 장소 준비사항을 선택해 주세요</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">주차 필요</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">휴지</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">롤티슈</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">참여자의 폰, 펜</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">빔프로젝터 있는 강의 진행 필요</span>
                    </label>
                  </div>

                  <div className="bg-white p-4 rounded-md border">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">노트북 연결 필요 필요</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <Input placeholder="기타 준비사항을 입력해 주세요" />
                </div>

                <Button variant="outline" className="flex items-center text-blue-500 mt-4">
                  <Plus className="h-4 w-4 mr-1" /> 추가
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">미리보기</Button>
          <Button variant="outline">저장하기</Button>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
            검수 요청하기
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
