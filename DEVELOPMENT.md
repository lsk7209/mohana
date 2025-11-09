# 개발 가이드

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

```bash
cp env.example.txt .dev.vars
# .dev.vars 파일을 편집하여 실제 값 입력
```

### 3. D1 데이터베이스 생성 (로컬)

```bash
# 로컬 D1 데이터베이스 생성
pnpm db:create

# 마이그레이션 실행 (로컬)
pnpm db:migrate
```

### 4. 개발 서버 실행

**터미널 1: Next.js 개발 서버**
```bash
pnpm dev
```

**터미널 2: Cloudflare Workers 개발 서버**
```bash
pnpm dev:worker
```

### 5. 접속

- Next.js: http://localhost:3000
- Workers API: http://localhost:8787

## 프로젝트 구조

```
.
├── app/                      # Next.js App Router
│   ├── (admin)/             # Admin 라우트 그룹
│   ├── api/                 # API 라우트 (Workers 프록시)
│   ├── programs/            # 프로그램 페이지
│   └── t/                   # 트래킹 엔드포인트
├── components/              # React 컴포넌트
│   ├── admin/              # Admin 컴포넌트
│   └── ui/                 # UI 컴포넌트
├── workers/                 # Cloudflare Workers
│   ├── routes/             # API 라우트 핸들러
│   ├── lib/                # 유틸리티 함수
│   ├── queues/             # 큐 워커
│   ├── durable-objects/    # Durable Objects
│   └── cron.ts             # 크론 작업
├── migrations/              # D1 마이그레이션
└── wrangler.toml           # Cloudflare 설정
```

## 주요 기능 개발 가이드

### 리드 생성

1. 프론트엔드: `components/lead-form.tsx`
2. API: `workers/routes/leads.ts`
3. DB: `workers/lib/db.ts` → `createLead()`

### 이메일 발송

1. 큐에 추가: `workers/routes/messages.ts` → `sendEmail()`
2. 큐 처리: `workers/queues/email.ts` → `handleEmailQueue()`
3. 트래킹: `workers/routes/tracking.ts`

### 시퀀스 자동화

1. 시퀀스 시작: `workers/routes/sequences.ts` → `run()`
2. 스케줄링: `workers/durable-objects/sequence-scheduler.ts`
3. 실행: Durable Object의 `alarm()` 메서드

### 리드 스코어링

1. 이벤트 기록: `workers/lib/db.ts` → `recordMessageEvent()`
2. 스코어 업데이트: `workers/lib/lead-scoring.ts` → `updateLeadScore()`
3. 자동화 규칙: `workers/cron.ts` → `processSequenceSteps()`

## 테스트

### API 테스트

```bash
# 리드 생성
curl -X POST http://localhost:8787/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "테스트",
    "name": "홍길동",
    "email": "test@example.com",
    "phone": "010-1234-5678"
  }'

# 리드 조회
curl http://localhost:8787/api/admin/leads
```

### D1 쿼리 테스트

```bash
# Wrangler D1 콘솔
pnpm wrangler d1 execute healingwork-db --local --command "SELECT * FROM leads LIMIT 5"
```

## 디버깅

### Workers 로그

```bash
# 실시간 로그
pnpm wrangler tail

# 로컬 개발 시
pnpm dev:worker
# 콘솔에 로그 출력
```

### Next.js 로그

```bash
pnpm dev
# 브라우저 콘솔 및 터미널 확인
```

## 코드 스타일

- TypeScript strict 모드 사용
- ESLint 규칙 준수
- 컴포넌트는 함수형 컴포넌트 + hooks
- API는 async/await 패턴

## 다음 단계

- [ ] 이메일 템플릿 관리 UI
- [ ] 시퀀스 편집 UI
- [ ] 통계 대시보드 완성
- [ ] Slack 알림 연동
- [ ] 캘린더 예약 연동

