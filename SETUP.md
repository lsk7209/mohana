# 초기 설정 가이드

## 빠른 시작

### 1. 의존성 설치

```bash
pnpm install
```

### 2. Cloudflare 계정 설정

```bash
# Wrangler 로그인
pnpm wrangler login
```

### 3. D1 데이터베이스 생성

```bash
# 로컬 개발용
pnpm db:create

# 생성된 database_id를 wrangler.toml에 업데이트
# [[d1_databases]]
# binding = "DB"
# database_name = "healingwork-db"
# database_id = "여기에_입력"
```

### 4. 마이그레이션 실행

```bash
# 로컬
pnpm db:migrate

# 프로덕션 (원격)
pnpm db:migrate --remote
```

### 5. KV Namespace 생성

```bash
# 캐시용
pnpm wrangler kv:namespace create "CACHE"
pnpm wrangler kv:namespace create "CACHE" --preview

# 레이트리밋용
pnpm wrangler kv:namespace create "RATE_LIMIT"
pnpm wrangler kv:namespace create "RATE_LIMIT" --preview

# 생성된 ID를 wrangler.toml에 업데이트
```

### 6. Queue 생성

```bash
pnpm wrangler queues create email-dispatch
pnpm wrangler queues create sms-dispatch
pnpm wrangler queues create retry-dispatch
```

### 7. 환경 변수 설정

`.dev.vars` 파일 생성 (로컬 개발용):

```env
HMAC_SECRET=your-secret-key-here
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=힐링워크
RESEND_API_KEY=re_xxxxxxxxxxxxx
SOLAPI_API_KEY=your-key
SOLAPI_API_SECRET=your-secret
SOLAPI_SENDER=01012345678
ENVIRONMENT=development
```

### 8. 초기 데이터 시드 (선택사항)

기본 템플릿과 웰컴 시퀀스를 생성하려면:

```bash
curl -X POST http://localhost:8787/api/seed
```

또는 브라우저에서 `/api/seed` 엔드포인트 호출

### 9. 개발 서버 실행

**터미널 1: Next.js**
```bash
pnpm dev
```

**터미널 2: Cloudflare Workers**
```bash
pnpm dev:worker
```

## 프로덕션 배포

### 1. 환경 변수 설정 (Cloudflare Dashboard)

Workers & Pages → Settings → Variables and Secrets에서 설정

### 2. Workers 배포

```bash
pnpm deploy
```

### 3. Pages 배포

Cloudflare Dashboard에서 Git 저장소 연결

## 이메일 서비스 설정

### Resend (권장)

1. [Resend](https://resend.com) 가입
2. API 키 발급
3. 도메인 추가 및 인증
4. SPF/DKIM/DMARC 설정

### MailChannels (대안)

1. Cloudflare와 통합된 MailChannels 사용
2. API 키 설정

## SMS 서비스 설정

### Solapi

1. [Solapi](https://solapi.com) 가입
2. API 키 발급
3. 발신번호 등록 및 승인
4. 환경 변수에 설정

## 문제 해결

### D1 연결 오류
- `wrangler.toml`의 `database_id` 확인
- 마이그레이션 실행 여부 확인

### 큐 처리 안됨
- Queue consumer 설정 확인
- Worker의 `queue` 핸들러 확인

### 이메일 발송 실패
- API 키 유효성 확인
- SPF/DKIM/DMARC 설정 확인
- 발신 도메인 인증 확인

