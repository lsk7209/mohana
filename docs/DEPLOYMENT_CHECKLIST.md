# 배포 체크리스트

## 1. Cloudflare 리소스 생성

### D1 데이터베이스
- [ ] Cloudflare Dashboard에서 D1 데이터베이스 생성
- [ ] 데이터베이스 이름: `healingwork-db` (또는 원하는 이름)
- [ ] `wrangler.toml`에 데이터베이스 바인딩 확인
- [ ] 마이그레이션 실행: `npm run db:migrate`

### KV Namespace
- [ ] Cache용 KV Namespace 생성: `CACHE`
- [ ] `wrangler.toml`에 KV 바인딩 확인

### Queue
- [ ] 이메일 발송용 Queue 생성: `email-dispatch`
- [ ] SMS 발송용 Queue 생성: `sms-dispatch`
- [ ] 재시도용 Queue 생성: `retry-queue`
- [ ] `wrangler.toml`에 Queue 바인딩 확인

### Durable Objects
- [ ] SequenceScheduler용 Durable Object 클래스 생성
- [ ] `wrangler.toml`에 Durable Object 바인딩 확인

### Cron Triggers
- [ ] `wrangler.toml`에 Cron 작업 설정 확인
  - 재시도 처리 (매 5분)
  - 시퀀스 처리 (매 1분)
  - 집계 작업 (매 1시간)

## 2. 환경 변수 설정

### Cloudflare Pages 환경 변수
- [ ] `NEXT_PUBLIC_SITE_URL` 설정 (프로덕션 URL)
- [ ] `WORKER_URL` 설정 (Cloudflare Workers 배포 URL, 예: `https://healingwork-platform.your-account.workers.dev`)
  - **중요**: 이 변수가 없으면 API 프록시가 작동하지 않습니다
  - Cloudflare Pages Dashboard → Settings → Environment Variables에서 설정

### Cloudflare Workers 환경 변수
- [ ] `HMAC_SECRET` 설정 (강력한 랜덤 문자열)
- [ ] `RESEND_API_KEY` 설정
- [ ] `FROM_EMAIL` 설정 (도메인 인증된 이메일)
- [ ] `FROM_NAME` 설정
- [ ] `SOLAPI_API_KEY` 설정
- [ ] `SOLAPI_API_SECRET` 설정
- [ ] `SOLAPI_SENDER` 설정 (승인된 발신번호)

## 3. 이메일 도메인 설정

### SPF 레코드
- [ ] DNS에 SPF 레코드 추가
  ```
  TXT @ "v=spf1 include:_spf.resend.com ~all"
  ```

### DKIM 레코드
- [ ] Resend 대시보드에서 DKIM 키 확인
- [ ] DNS에 DKIM 레코드 추가 (Resend에서 제공)

### DMARC 레코드
- [ ] DNS에 DMARC 레코드 추가
  ```
  TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
  ```

### 발신 평판 테스트
- [ ] [Mail-Tester](https://www.mail-tester.com/)로 테스트
- [ ] SPF/DKIM/DMARC 모두 통과 확인

## 4. SMS 서비스 설정

### Solapi 발신번호 등록
- [ ] Solapi 대시보드에서 발신번호 등록
- [ ] 발신번호 승인 대기
- [ ] 승인 완료 후 `SOLAPI_SENDER` 환경 변수 업데이트

## 5. Cloudflare Access 설정 (선택적)

### Admin 페이지 보호
- [ ] Cloudflare Access 애플리케이션 생성
- [ ] `/admin/*`, `/(admin)/*` 경로 보호 설정
- [ ] `ACCESS_AUD` 환경 변수 설정
- [ ] `ACCESS_TEAM` 환경 변수 설정

## 6. 도메인 연결

### Cloudflare Pages
- [ ] Custom Domain 추가
- [ ] DNS 레코드 설정 (CNAME 또는 A 레코드)
- [ ] SSL/TLS 자동 인증서 발급 확인

### Cloudflare Workers
- [ ] Custom Domain 추가 (API 엔드포인트용)
- [ ] 또는 Workers.dev 서브도메인 사용

## 7. 배포 테스트

### Workers 배포
- [ ] `npm run deploy` 실행
- [ ] 배포 성공 확인
- [ ] API 엔드포인트 테스트
  ```bash
  curl https://your-worker.workers.dev/api/leads -X POST -H "Content-Type: application/json" -d '{"test": true}'
  ```

### Pages 배포
- [ ] `cloudflare-pages.toml` 파일에 `output_directory = "out"` 설정 확인
- [ ] Cloudflare Pages Dashboard에서 Build output directory가 `out`으로 설정되어 있는지 확인
  - Settings → Builds & deployments → Build output directory: `out`
- [ ] GitHub에 푸시하여 자동 배포 확인
- [ ] 빌드 로그에서 "Found build output at: .../out" 메시지 확인
- [ ] 빌드 로그에서 "Error: Output directory" 에러가 없는지 확인
- [ ] 사이트 접속 테스트
- [ ] 모든 페이지 라우팅 확인

## 8. 기능 테스트

### 리드 수집
- [ ] 메인 페이지에서 리드 폼 제출 테스트
- [ ] Contact 페이지에서 리드 폼 제출 테스트
- [ ] D1 데이터베이스에서 리드 데이터 확인

### 이메일 발송
- [ ] Admin 대시보드에서 테스트 이메일 발송
- [ ] 이메일 수신 확인
- [ ] 오픈/클릭 트래킹 확인

### SMS 발송
- [ ] Admin 대시보드에서 테스트 SMS 발송
- [ ] SMS 수신 확인

### 시퀀스 자동화
- [ ] 테스트 리드에 시퀀스 시작
- [ ] Durable Object에서 스케줄 확인
- [ ] 자동 발송 확인

## 9. 모니터링 설정

### Cloudflare Analytics
- [ ] Workers Analytics 활성화
- [ ] Pages Analytics 활성화
- [ ] 에러 로그 모니터링 설정

### 알림 설정 (선택적)
- [ ] Slack 웹훅 설정 (에러 알림용)
- [ ] 이메일 알림 설정 (바운스율 상승 등)

## 10. 보안 확인

- [ ] 모든 환경 변수가 Secrets로 설정되었는지 확인
- [ ] Admin 페이지 접근 제어 확인
- [ ] Rate Limiting 동작 확인
- [ ] CORS 설정 확인

## 11. 성능 최적화

- [ ] 이미지 최적화 확인
- [ ] 번들 크기 확인
- [ ] Core Web Vitals 확인
- [ ] 캐싱 설정 확인

## 12. 문서화

- [ ] README.md 업데이트
- [ ] API 문서 업데이트
- [ ] 배포 가이드 업데이트

---

## 배포 후 확인 사항

1. **모든 페이지가 정상적으로 로드되는지 확인**
2. **폼 제출이 정상적으로 작동하는지 확인**
3. **이메일/SMS 발송이 정상적으로 작동하는지 확인**
4. **에러 로그에 이상이 없는지 확인**
5. **성능 지표가 기준을 만족하는지 확인**

## 문제 발생 시

1. Cloudflare Dashboard의 Logs 확인
2. Workers의 실시간 로그 확인: `wrangler tail`
3. Pages의 빌드 로그 확인
4. 브라우저 콘솔 에러 확인
5. 네트워크 탭에서 API 요청 확인


