# Cloudflare Pages가 있는 상황에서 Workers 생성 가이드

Cloudflare Pages 프로젝트가 이미 있는 상황에서 Workers를 생성하고 연결하는 방법입니다.

## 사전 준비

### 1. Cloudflare 계정 로그인

터미널에서 Wrangler CLI로 로그인합니다:

```bash
npm run wrangler login
```

또는:

```bash
npx wrangler login
```

브라우저가 열리면 Cloudflare 계정으로 로그인하세요.

## 단계별 Workers 생성 및 배포

### 1단계: D1 데이터베이스 생성

```bash
npm run db:create
```

또는:

```bash
npx wrangler d1 create healingwork-db
```

**출력 예시**:
```
✅ Successfully created DB 'healingwork-db'!

[[d1_databases]]
binding = "DB"
database_name = "healingwork-db"
database_id = "abc123def456..."  # 이 ID를 복사하세요
```

**다음 작업**: `wrangler.toml` 파일에서 D1 데이터베이스 주석을 해제하고 `database_id`를 입력하세요:

```toml
[[d1_databases]]
binding = "DB"
database_name = "healingwork-db"
database_id = "여기에_생성된_ID_입력"
```

### 2단계: KV Namespace 생성

캐시용 KV:
```bash
npx wrangler kv:namespace create "CACHE"
npx wrangler kv:namespace create "CACHE" --preview
```

레이트리밋용 KV:
```bash
npx wrangler kv:namespace create "RATE_LIMIT"
npx wrangler kv:namespace create "RATE_LIMIT" --preview
```

**출력 예시**:
```
✅  Successfully created KV namespace "CACHE"

Add the following to your configuration file:
[[kv_namespaces]]
binding = "CACHE"
id = "abc123def456..."  # 이 ID를 복사하세요
```

**다음 작업**: `wrangler.toml` 파일에서 KV Namespace 주석을 해제하고 `id`를 입력하세요:

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "여기에_생성된_ID_입력"

[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "여기에_생성된_ID_입력"
```

### 3단계: Queue 생성

이메일 발송용 Queue:
```bash
npx wrangler queues create email-dispatch
```

SMS 발송용 Queue:
```bash
npx wrangler queues create sms-dispatch
```

재시도용 Queue:
```bash
npx wrangler queues create retry-dispatch
```

**참고**: Queue는 `wrangler.toml`에 이미 설정되어 있으므로 추가 설정이 필요 없습니다.

### 4단계: 데이터베이스 마이그레이션 실행

```bash
npm run db:migrate
```

또는 프로덕션(원격) DB에 마이그레이션:

```bash
npx wrangler d1 migrations apply healingwork-db --remote
```

### 5단계: Workers 환경 변수 설정

Cloudflare Dashboard에서 환경 변수를 설정합니다:

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속

2. **Workers & Pages 메뉴로 이동**
   - 왼쪽 사이드바에서 "Workers & Pages" 클릭

3. **Workers 프로젝트 선택 또는 생성**
   - `healingwork-platform` Worker가 없으면 배포 후 자동 생성됩니다
   - 또는 "Create application" → "Create Worker" 선택

4. **환경 변수 설정**
   - Settings → Variables and Secrets
   - **Environment Variables** 섹션에서 다음 변수 추가:
     - `ENVIRONMENT`: `production`
   
   - **Secrets** 섹션에서 다음 시크릿 추가 (민감한 정보):
     - `HMAC_SECRET`: 강력한 랜덤 문자열 (예: `openssl rand -hex 32`)
     - `RESEND_API_KEY`: Resend API 키
     - `FROM_EMAIL`: 발신 이메일 주소
     - `FROM_NAME`: 발신자 이름
     - `SOLAPI_API_KEY`: Solapi API 키
     - `SOLAPI_API_SECRET`: Solapi API 시크릿
     - `SOLAPI_SENDER`: SMS 발신번호

### 6단계: Workers 배포

```bash
npm run deploy
```

또는:

```bash
npx wrangler deploy
```

**배포 성공 시 출력 예시**:
```
✨  Built Worker successfully
✨  Successfully published your Worker to the following routes:
  - healingwork-platform.your-account.workers.dev
  - healingwork-platform.your-account.workers.dev/*
```

**중요**: 배포 후 출력된 Worker URL을 복사하세요!
예: `https://healingwork-platform.your-account.workers.dev`

### 7단계: Cloudflare Pages에 Worker URL 연결

1. **Cloudflare Dashboard → Pages로 이동**
   - 왼쪽 사이드바에서 "Pages" 클릭
   - 프로젝트 선택

2. **환경 변수 설정**
   - Settings → Environment Variables
   - Production 환경에 다음 변수 추가:
     - `WORKER_URL`: `https://healingwork-platform.your-account.workers.dev`
       - **중요**: Worker URL 끝에 슬래시(`/`)를 포함하지 마세요
     - `NEXT_PUBLIC_SITE_URL`: 사이트 기본 URL (예: `https://mohana.kr`)

3. **재배포 트리거**
   - Deployments 탭으로 이동
   - "Retry deployment" 클릭
   - 또는 GitHub에 새로운 커밋 푸시

## 배포 확인

### Workers 배포 확인

```bash
# Worker 상태 확인
npx wrangler deployments list

# Worker 로그 확인
npx wrangler tail
```

또는 Cloudflare Dashboard에서:
- Workers & Pages → healingwork-platform
- Logs 탭에서 실시간 로그 확인

### API 엔드포인트 테스트

```bash
# 리드 생성 테스트
curl -X POST https://healingwork-platform.your-account.workers.dev/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "company": "테스트 회사",
    "name": "홍길동",
    "email": "test@example.com",
    "phone": "010-1234-5678"
  }'
```

### Pages에서 API 프록시 확인

배포 후 사이트에서:
1. 문의 폼 제출 테스트
2. 브라우저 개발자 도구 → Network 탭 확인
3. `/api/leads` 요청이 Worker URL로 프록시되는지 확인

## 문제 해결

### Workers 배포 실패

**에러**: `Error: No account ID found`

**해결**:
```bash
# 계정 ID 확인
npx wrangler whoami

# 계정 ID를 wrangler.toml에 추가 (필요한 경우)
account_id = "your-account-id"
```

### 환경 변수 누락

**에러**: `ReferenceError: HMAC_SECRET is not defined`

**해결**: Cloudflare Dashboard에서 Secrets 설정 확인

### D1 데이터베이스 연결 실패

**에러**: `Error: D1 database not found`

**해결**:
1. `wrangler.toml`에서 `database_id` 확인
2. 데이터베이스가 올바른 계정에 생성되었는지 확인

## 다음 단계

Workers 배포가 완료되면:

1. ✅ **Pages 환경 변수 설정**: `WORKER_URL` 추가
2. ✅ **Pages 재배포**: 자동 배포 트리거 또는 수동 재배포
3. ✅ **기능 테스트**: 문의 폼, Admin 대시보드 등
4. ✅ **모니터링 설정**: Workers Analytics 활성화

## 참고 자료

- [Cloudflare Workers 문서](https://developers.cloudflare.com/workers/)
- [D1 데이터베이스 문서](https://developers.cloudflare.com/d1/)
- [KV 문서](https://developers.cloudflare.com/kv/)
- [Queue 문서](https://developers.cloudflare.com/queues/)

