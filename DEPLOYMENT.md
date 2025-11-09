# 배포 가이드

## 사전 준비

### 1. Cloudflare 계정 설정

```bash
# Wrangler 로그인
pnpm wrangler login
```

### 2. D1 데이터베이스 생성

```bash
# 데이터베이스 생성
pnpm db:create

# 생성된 database_id를 wrangler.toml에 업데이트
# [[d1_databases]]
# binding = "DB"
# database_name = "healingwork-db"
# database_id = "생성된_ID_여기에_입력"
```

### 3. KV Namespace 생성

```bash
# 캐시용 KV
pnpm wrangler kv:namespace create "CACHE"
pnpm wrangler kv:namespace create "CACHE" --preview

# 레이트리밋용 KV
pnpm wrangler kv:namespace create "RATE_LIMIT"
pnpm wrangler kv:namespace create "RATE_LIMIT" --preview

# 생성된 ID를 wrangler.toml에 업데이트
```

### 4. Queue 생성

```bash
# 이메일 큐
pnpm wrangler queues create email-dispatch

# SMS 큐
pnpm wrangler queues create sms-dispatch

# 재시도 큐
pnpm wrangler queues create retry-dispatch
```

### 5. 마이그레이션 실행

```bash
# 프로덕션 DB 마이그레이션
pnpm db:migrate --remote
```

## 환경 변수 설정

### 로컬 개발 (.dev.vars)

```bash
cp env.example.txt .dev.vars
# .dev.vars 파일을 편집하여 실제 값 입력
```

### 프로덕션 (Cloudflare Dashboard)

1. Cloudflare Dashboard → Workers & Pages → healingwork-platform
2. Settings → Variables and Secrets
3. 환경 변수 추가:
   - `HMAC_SECRET`
   - `FROM_EMAIL`
   - `FROM_NAME`
   - `RESEND_API_KEY` (또는 다른 이메일 서비스)
   - `SOLAPI_API_KEY`
   - `SOLAPI_API_SECRET`
   - `SOLAPI_SENDER`

## 배포

### Workers 배포

```bash
pnpm deploy
```

### Pages 배포

1. Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. GitHub 저장소 연결
4. Build settings:
   - Framework preset: Next.js
   - Build command: `pnpm build`
   - Build output directory: `.next`

## 이메일 전달성 설정

### SPF/DKIM/DMARC 설정

1. **SPF 레코드** (DNS에 추가)
   ```
   TXT @ "v=spf1 include:_spf.resend.com ~all"
   ```

2. **DKIM** (Resend Dashboard에서 제공)
   - Resend Dashboard → Domains → DKIM 레코드 복사
   - DNS에 추가

3. **DMARC 레코드** (DNS에 추가)
   ```
   TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
   ```

## 검증

### Health Check

```bash
curl https://your-worker.workers.dev/health
```

### 리드 생성 테스트

```bash
curl -X POST https://your-worker.workers.dev/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "테스트 회사",
    "name": "홍길동",
    "email": "test@example.com",
    "phone": "010-1234-5678"
  }'
```

## 모니터링

### Cloudflare Dashboard

- Workers & Pages → Analytics: 요청 수, 에러율 확인
- D1 → Metrics: 쿼리 성능 확인
- Queues → Metrics: 큐 처리량 확인

### 로그 확인

```bash
# 실시간 로그
pnpm wrangler tail

# 특정 시간대 로그
pnpm wrangler tail --format pretty
```

## 트러블슈팅

### D1 연결 오류

- `wrangler.toml`의 `database_id` 확인
- 마이그레이션 실행 여부 확인

### 큐 처리 안됨

- Queue consumer 설정 확인 (`wrangler.toml`)
- Worker의 `queue` 핸들러 구현 확인

### 이메일 발송 실패

- API 키 유효성 확인
- SPF/DKIM/DMARC 설정 확인
- 발신 도메인 인증 확인

