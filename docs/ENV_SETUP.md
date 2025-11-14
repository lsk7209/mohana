# 환경 변수 설정 가이드

## Next.js 환경 변수 설정

### 1. 로컬 개발 환경

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 사이트 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API 엔드포인트 (로컬 개발용 Cloudflare Workers)
# wrangler dev 실행 시 http://localhost:8787
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### 2. 프로덕션 환경 (Cloudflare Pages)

Cloudflare Pages 대시보드에서 환경 변수를 설정하세요:

1. Cloudflare Dashboard → Pages → 프로젝트 선택
2. Settings → Environment Variables
3. Production 환경에 다음 변수 추가:

```
NEXT_PUBLIC_SITE_URL=https://mohana.kr
WORKER_URL=https://healingwork-platform.your-account.workers.dev
```

**중요 사항**:
- `WORKER_URL`: Cloudflare Workers 배포 URL (예: `https://healingwork-platform.your-account.workers.dev`)
  - 이 변수가 없으면 API 프록시가 작동하지 않습니다
  - 빌드 시 `_redirects` 파일이 이 URL을 사용하여 동적으로 생성됩니다
- `NEXT_PUBLIC_SITE_URL`: 사이트 기본 URL
- 프로덕션에서는 API 요청이 `_redirects` 파일을 통해 자동으로 Cloudflare Workers로 프록시됩니다

## Cloudflare Workers 환경 변수 설정

### 1. 로컬 개발 환경

프로젝트 루트에 `.dev.vars` 파일을 생성하고 `env.example.txt`의 내용을 참고하여 설정하세요:

```bash
# Cloudflare Workers
WORKER_URL=http://localhost:8787
ENVIRONMENT=development
HMAC_SECRET=your-secret-key-change-in-production

# Email Service (Resend 권장)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=모하나

# SMS Service (Solapi)
SOLAPI_API_KEY=your-solapi-api-key
SOLAPI_API_SECRET=your-solapi-api-secret
SOLAPI_SENDER=01012345678
```

### 2. 프로덕션 환경

Cloudflare Dashboard → Workers & Pages → 프로젝트 선택 → Settings → Variables에서 설정:

- **Environment Variables**: 모든 환경 변수 추가
- **Secrets**: 민감한 정보 (API 키 등)는 Secrets로 설정

## 필수 환경 변수 목록

### Next.js (Pages)
- `NEXT_PUBLIC_SITE_URL`: 사이트 기본 URL

### Cloudflare Workers
- `HMAC_SECRET`: 메시지 서명 검증용 시크릿 키
- `RESEND_API_KEY`: Resend 이메일 서비스 API 키
- `FROM_EMAIL`: 발신 이메일 주소
- `FROM_NAME`: 발신자 이름
- `SOLAPI_API_KEY`: Solapi SMS 서비스 API 키
- `SOLAPI_API_SECRET`: Solapi SMS 서비스 API 시크릿
- `SOLAPI_SENDER`: SMS 발신번호

## 선택적 환경 변수

- `NEXT_PUBLIC_API_URL`: 개발 환경에서만 사용 (프로덕션에서는 불필요)
- `NEXT_PUBLIC_CDN_URL`: CDN URL (미디어 파일용)
- `ACCESS_AUD`: Cloudflare Access Audience (Admin 보호용)
- `ACCESS_TEAM`: Cloudflare Access Team 이름

## 보안 주의사항

1. **절대 `.env.local` 또는 `.dev.vars` 파일을 Git에 커밋하지 마세요**
2. 모든 민감한 정보는 Cloudflare Dashboard의 Secrets로 관리하세요
3. 프로덕션 환경 변수는 별도로 설정하고 테스트하세요


