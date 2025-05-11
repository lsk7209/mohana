# CURSOR_RULE.md

## 1. 개발 환경 및 기술 스택
- ReactJS, NextJS, TypeScript, TailwindCSS, Shadcn, Radix UI, HTML, CSS
- 함수형 컴포넌트만 사용
- 모든 스타일은 TailwindCSS class로만 작성 (별도 CSS 파일/인라인 스타일 금지)
- Shadcn, Radix 등 UI 라이브러리 활용 시 공식 문서의 접근성 가이드 준수

## 2. 폴더 및 파일 구조
- `app/` : 페이지 라우팅 및 레이아웃 (워크샵, 강사, 관리자, 기업 회원 등 역할/기능별 구조)
- `components/` : 재사용 컴포넌트
- `hooks/` : 커스텀 훅
- `lib/` : 유틸리티 함수 및 API
- `styles/` : Tailwind 및 전역 스타일
- 파일/폴더명은 소문자, 하이픈(-) 사용 (예: workshop-card.tsx)
- 컴포넌트/타입/클래스명은 PascalCase, 변수/함수명은 camelCase

## 3. 코드 스타일 및 작성 규칙
- TypeScript 필수, any 사용 금지
- 함수는 const로 선언 (예: const handleClick = () => {})
- 이벤트 핸들러는 handle 접두사 사용 (예: handleClick, handleKeyDown)
- 조기 반환(early return) 적극 사용
- 불필요한 중첩, 반복 최소화(DRY 원칙)
- className 조건부 처리 시 class: 사용, 삼항 연산자 대신 논리 연산자 우선
- 접근성(aria-label, tabIndex 등) 필수 적용
- 모든 import는 필요한 것만 명확히 작성
- TODO, FIXME 주석 사용 금지, 미완성 코드/빈칸/플레이스홀더 남기지 않음

## 4. 커밋/PR/브랜치 규칙
- 커밋: [타입] 기능 (예: feat: 워크샵 등록 기능 추가)
- PR: [타입] 기능 요약, 상세 설명/테스트 방법/참고사항 포함
- 브랜치: main(배포), dev(통합), feature/기능명(개별 개발)
- 셀프 머지 금지, 리뷰어 지정 필수

## 5. 서비스 특화 규칙
- 모든 신규 기능은 PC/모바일 반응형 필수
- 워크샵 등록/수정/승인 플로우, 문의 기능 등 서비스 흐름에 맞는 구조
- API 통신은 try-catch로 예외 처리
- 외부 라이브러리 도입 시 사전 논의
- 코드 리뷰 시 가독성, 접근성, 네이밍, 타입, 불필요한 코드 여부 중점 확인 