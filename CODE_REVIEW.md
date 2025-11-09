# 코드 검토 보고서

## 📋 개요
Next.js 16 + TypeScript + Tailwind CSS 기반의 랜딩 페이지 프로젝트입니다.

---

## 🔴 심각한 문제 (Critical Issues)

### 1. TypeScript 빌드 에러 무시 설정
**파일**: `next.config.mjs`
```javascript
typescript: {
  ignoreBuildErrors: true,  // ⚠️ 위험!
}
```
**문제점**: 
- 프로덕션 빌드에서 TypeScript 에러를 무시하여 런타임 에러 가능성 증가
- 코드 품질 저하 및 유지보수 어려움

**권장사항**: 
- `ignoreBuildErrors: false`로 변경
- 모든 TypeScript 에러를 수정

---

### 2. Toast 제거 지연 시간 비정상적
**파일**: `hooks/use-toast.ts`, `components/ui/use-toast.ts` (라인 9)
```typescript
const TOAST_REMOVE_DELAY = 1000000  // 약 16분!
```
**문제점**: 
- Toast가 16분 동안 유지되어 사용자 경험 저하
- 일반적으로 3-5초가 적절함

**권장사항**: 
```typescript
const TOAST_REMOVE_DELAY = 5000  // 5초
```

---

### 3. useToast Hook 무한 루프 위험
**파일**: `hooks/use-toast.ts` (라인 174-182)
```typescript
React.useEffect(() => {
  listeners.push(setState)
  return () => {
    const index = listeners.indexOf(setState)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}, [state])  // ⚠️ state가 의존성에 포함됨
```
**문제점**: 
- `state`가 의존성 배열에 포함되어 무한 루프 가능성
- `setState` 함수는 안정적이므로 의존성에서 제거 가능

**권장사항**: 
```typescript
React.useEffect(() => {
  listeners.push(setState)
  return () => {
    const index = listeners.indexOf(setState)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}, [])  // 빈 의존성 배열
```

---

## 🟡 중요한 문제 (Important Issues)

### 4. 중복 파일 존재
**파일**: 
- `hooks/use-toast.ts` ↔ `components/ui/use-toast.ts` (완전 동일)
- `hooks/use-mobile.ts` ↔ `components/ui/use-mobile.tsx` (완전 동일)

**현재 사용**: 
- `@/hooks/use-toast` (toaster.tsx에서 사용)
- `@/hooks/use-mobile` (sidebar.tsx에서 사용)

**권장사항**: 
- `components/ui/`의 중복 파일 삭제
- 또는 `hooks/` 디렉토리 삭제하고 `components/ui/`만 사용

---

### 5. ThemeProvider 미사용
**파일**: `components/theme-provider.tsx` 생성되어 있으나 `app/layout.tsx`에서 사용되지 않음

**권장사항**: 
```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

---

### 6. 외부 비디오 URL 하드코딩
**파일**: `components/hero-section.tsx` (라인 10)
```tsx
<source
  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  type="video/mp4"
/>
```
**문제점**: 
- 외부 서비스 의존성
- 프로덕션 환경에서 비디오가 로드되지 않을 수 있음

**권장사항**: 
- 로컬 비디오 파일 사용 또는 환경 변수로 관리
- fallback 이미지 추가

---

### 7. 배열 인덱스를 key로 사용
**파일**: 
- `components/pain-points-section.tsx` (라인 29)
- `components/benefits-section.tsx` (라인 35)
- `components/programs-section.tsx` (라인 34)
- `components/reviews-section.tsx` (라인 35)

**문제점**: 
- 배열 순서가 변경되면 React가 잘못된 컴포넌트를 업데이트할 수 있음
- 고유한 ID 사용 권장

**권장사항**: 
```tsx
// 예시
const painPoints = [
  { id: 'stress', icon: Frown, ... },
  { id: 'communication', icon: MessageCircleOff, ... },
  // ...
]

{painPoints.map((point) => (
  <Card key={point.id}>  // index 대신 id 사용
```

---

## 🟢 개선 권장사항 (Recommendations)

### 8. 접근성 개선
**현재**: 일부 컴포넌트에 접근성 속성 부족

**권장사항**: 
- 비디오에 `aria-label` 추가
- 버튼에 명확한 `aria-label` 추가
- 키보드 네비게이션 지원 확인

```tsx
<video 
  autoPlay 
  loop 
  muted 
  playsInline 
  aria-label="힐링워크 소개 비디오"
  className="..."
>
```

---

### 9. SEO 개선
**파일**: `app/layout.tsx`

**권장사항**: 
- Open Graph 메타데이터 추가
- Twitter Card 메타데이터 추가
- 구조화된 데이터 (JSON-LD) 추가

```tsx
export const metadata: Metadata = {
  // ... 기존 메타데이터
  openGraph: {
    title: "힐링워크",
    description: "...",
    images: ["/og-image.jpg"],
  },
}
```

---

### 10. 에러 처리 및 로딩 상태
**현재**: 비디오 로딩 실패 시 처리 없음

**권장사항**: 
- 비디오 로딩 실패 시 fallback 이미지 표시
- 로딩 스피너 추가

---

### 11. 모바일 네비게이션 미구현
**파일**: `components/header.tsx`

**현재**: 데스크톱 네비게이션만 존재 (`hidden md:flex`)

**권장사항**: 
- 모바일 햄버거 메뉴 추가
- 반응형 네비게이션 구현

---

### 12. 버튼 클릭 핸들러 미구현
**현재**: "무료 상담 신청" 버튼들이 클릭 핸들러 없음

**권장사항**: 
- 모달 또는 페이지 라우팅 추가
- 폼 컴포넌트 연결

---

### 13. 환경 변수 관리
**권장사항**: 
- `.env.local` 파일 생성
- 하드코딩된 값들을 환경 변수로 이동

---

### 14. 코드 중복
**파일**: 여러 섹션 컴포넌트들이 유사한 구조

**권장사항**: 
- 공통 Card 컴포넌트 추출
- 재사용 가능한 섹션 레이아웃 컴포넌트 생성

---

## ✅ 잘된 점 (Good Practices)

1. ✅ TypeScript strict 모드 활성화
2. ✅ 컴포넌트 구조가 깔끔하고 모듈화됨
3. ✅ Tailwind CSS를 활용한 반응형 디자인
4. ✅ 의미 있는 컴포넌트 네이밍
5. ✅ 적절한 폴더 구조 (components, hooks, lib)
6. ✅ 접근성 고려 (text-balance, text-pretty 사용)
7. ✅ Next.js 16 App Router 사용
8. ✅ 적절한 메타데이터 설정

---

## 📊 우선순위별 수정 권장사항

### 즉시 수정 필요 (P0)
1. ✅ `TOAST_REMOVE_DELAY` 값 수정 (1000000 → 5000)
2. ✅ `useToast` hook 의존성 배열 수정
3. ✅ 중복 파일 정리

### 단기 개선 (P1)
4. ✅ `ignoreBuildErrors: false`로 변경 및 에러 수정
5. ✅ 배열 key를 index에서 고유 ID로 변경
6. ✅ ThemeProvider 적용

### 중기 개선 (P2)
7. ✅ 모바일 네비게이션 추가
8. ✅ 버튼 클릭 핸들러 구현
9. ✅ 비디오 fallback 처리
10. ✅ 접근성 속성 추가

---

## 📝 요약

전반적으로 코드 구조는 깔끔하고 모범 사례를 따르고 있습니다. 다만 몇 가지 중요한 버그와 개선 사항이 있어 우선순위에 따라 수정하는 것을 권장합니다.

**주요 이슈**:
- Toast 지연 시간이 비정상적으로 길음
- useToast hook의 무한 루프 위험
- TypeScript 빌드 에러 무시 설정
- 중복 파일 존재

**전체 점수**: 7.5/10

