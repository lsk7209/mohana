# 힐링워크 플랫폼

기업 힐링·워크샵 플랫폼 - Cloudflare 최적화 버전

## 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Workers, D1 (SQLite), KV, Queues, Durable Objects
- **Email**: Resend/MailChannels (HTTP API)
- **SMS**: Solapi API

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트 (Workers 프록시)
│   ├── programs/          # 프로그램 페이지
│   └── t/                 # 트래킹 엔드포인트
├── components/            # React 컴포넌트
├── workers/               # Cloudflare Workers
│   ├── routes/           # API 라우트 핸들러
│   ├── lib/              # 유틸리티 함수
│   └── cron.ts           # 크론 작업
├── migrations/            # D1 데이터베이스 마이그레이션
└── wrangler.toml         # Cloudflare 설정
```

## 개발 환경 설정

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Cloudflare 설정

```bash
# Cloudflare 로그인
pnpm wrangler login

# D1 데이터베이스 생성
pnpm db:create

# 마이그레이션 실행
pnpm db:migrate
```

### 3. 환경 변수 설정

자세한 내용은 [환경 변수 설정 가이드](./docs/ENV_SETUP.md)를 참고하세요.

#### Next.js 환경 변수
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Cloudflare Workers 환경 변수
`.dev.vars` 파일을 생성하고 `env.example.txt`를 참고하여 설정하세요.

`.dev.vars` 파일 생성:

```env
HMAC_SECRET=your-secret-key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=힐링워크
RESEND_API_KEY=your-resend-api-key
SOLAPI_API_KEY=your-solapi-key
SOLAPI_API_SECRET=your-solapi-secret
SOLAPI_SENDER=your-phone-number
```

### 4. 개발 서버 실행

```bash
# Next.js 개발 서버
pnpm dev

# Cloudflare Workers 개발 서버 (별도 터미널)
pnpm dev:worker
```

## 배포

### Cloudflare Pages + Workers 배포

```bash
# Workers 배포
pnpm deploy

# Pages 배포는 Cloudflare Dashboard에서 연결
```

**중요**: 배포 전에 [배포 체크리스트](./docs/DEPLOYMENT_CHECKLIST.md)와 [배포 문제 해결 가이드](./docs/DEPLOYMENT_TROUBLESHOOTING.md)를 확인하세요.

### 필수 환경 변수

Cloudflare Pages Dashboard에서 다음 환경 변수를 설정해야 합니다:

- `NEXT_PUBLIC_SITE_URL`: 사이트 기본 URL (예: `https://mohana.kr`)
- `WORKER_URL`: Cloudflare Workers 배포 URL (예: `https://healingwork-platform.your-account.workers.dev`)
  - **중요**: 이 변수가 없으면 API 프록시가 작동하지 않습니다
  - 빌드 시 `_redirects` 파일이 이 URL을 사용하여 동적으로 생성됩니다

자세한 내용은 [환경 변수 설정 가이드](./docs/ENV_SETUP.md)를 참고하세요.

## 주요 기능

- ✅ 리드 수집 및 CRM 관리 (필터링, 검색, 페이징, CSV 내보내기)
- ✅ 이메일/문자 자동화 (Resend/MailChannels/Solapi)
- ✅ 오픈/클릭 트래킹 (HMAC 서명 검증)
- ✅ 시퀀스 자동화 (Durable Objects, 조건부 발송)
- ✅ 리드 스코어링 자동화 (오픈/클릭/답장 기반)
- ✅ Admin 대시보드 (리드, 통계, 템플릿, 시퀀스, A/B 테스트)
- ✅ 템플릿 관리 시스템 (CRUD, 미리보기, 변수 지원)
- ✅ A/B 테스트 기능
- ✅ 바운스 처리 및 웹훅
- ✅ 시퀀스 성과 분석
- ✅ Rate Limiting 및 보안
- ✅ 크론 작업 (재시도, 집계, 자동화)

## API 엔드포인트

- `POST /api/leads` - 리드 생성
- `GET /api/admin/leads` - 리드 목록
- `GET /api/admin/leads/:id` - 리드 상세
- `POST /api/messages/send-email` - 이메일 발송
- `POST /api/messages/send-sms` - SMS 발송
- `GET /t/o` - 오픈 트래킹 픽셀
- `GET /t/c` - 클릭 트래킹 리디렉트

## 문서

- [PRD.md](./PRD.md) - 제품 요구사항 문서
- [SETUP.md](./SETUP.md) - 초기 설정 가이드
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 가이드
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - 프로젝트 현황
- [FEATURES.md](./FEATURES.md) - 기능 명세서
- [CHANGELOG.md](./CHANGELOG.md) - 변경 이력
- [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) - 개발 완료 요약
- [docs/ENV_SETUP.md](./docs/ENV_SETUP.md) - 환경 변수 설정 가이드
- [docs/DEPLOYMENT_CHECKLIST.md](./docs/DEPLOYMENT_CHECKLIST.md) - 배포 체크리스트

## 🎉 개발 완료!

**핵심 기능 개발이 완료되었습니다!** 배포 준비가 완료된 상태입니다.

자세한 내용은 [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)를 참고하세요.

## 라이선스

Private

# mohana
