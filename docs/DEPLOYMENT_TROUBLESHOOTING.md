# 배포 문제 해결 가이드

## 일반적인 배포 문제

### 1. API 요청이 404 에러를 반환하는 경우

**증상**: `/api/*` 엔드포인트에 요청 시 404 에러 발생

**원인**:
- `WORKER_URL` 환경 변수가 설정되지 않음
- `_redirects` 파일이 올바르게 생성되지 않음
- Cloudflare Workers가 배포되지 않음

**해결 방법**:

1. **Cloudflare Workers 배포 확인**:
   ```bash
   npm run deploy
   ```
   배포 후 Worker URL을 확인하세요 (예: `https://healingwork-platform.your-account.workers.dev`)

2. **Cloudflare Pages 환경 변수 설정**:
   - Cloudflare Dashboard → Pages → 프로젝트 선택
   - Settings → Environment Variables
   - Production 환경에 `WORKER_URL` 추가:
     ```
     WORKER_URL=https://healingwork-platform.your-account.workers.dev
     ```
   - **중요**: Worker URL 끝에 슬래시(`/`)를 포함하지 마세요

3. **빌드 재실행**:
   - GitHub에 푸시하여 자동 빌드 트리거
   - 또는 Cloudflare Pages Dashboard에서 "Retry deployment" 클릭

4. **생성된 `_redirects` 파일 확인**:
   - 빌드 후 `out/_redirects` 파일을 확인하세요
   - 올바른 형식:
     ```
     /api/*  https://healingwork-platform.your-account.workers.dev/api/:splat  200
     ```

### 2. 빌드가 실패하는 경우

**증상**: Cloudflare Pages 빌드가 실패함

**원인**:
- TypeScript 타입 에러
- 빌드 스크립트 오류
- 메모리 부족

**해결 방법**:

1. **로컬에서 빌드 테스트**:
   ```bash
   npm run build
   ```
   로컬에서 빌드가 성공하는지 확인하세요

2. **TypeScript 에러 확인**:
   ```bash
   npx tsc --noEmit
   ```
   타입 에러가 있으면 수정하세요

3. **빌드 로그 확인**:
   - Cloudflare Pages Dashboard → Deployments → 실패한 배포 클릭
   - 빌드 로그에서 에러 메시지 확인

4. **메모리 부족 문제**:
   - `cloudflare-pages.toml`에서 `NODE_OPTIONS` 확인:
     ```toml
     NODE_OPTIONS = "--max-old-space-size=4096"
     ```

### 3. 빌드 출력 디렉토리를 찾을 수 없는 경우

**증상**: `Error: Output directory ".next/out" not found.` 또는 `Failed: build output directory not found`

**원인**:
- Cloudflare Pages가 기본값인 `.next/out`을 찾고 있음
- 실제 빌드 출력은 `out` 디렉토리에 생성됨
- `wrangler.toml` 또는 `cloudflare-pages.toml` 설정이 인식되지 않음

**해결 방법**:

1. **`wrangler.toml`에 Pages 설정 추가** (권장):
   ```toml
   # Cloudflare Pages 설정 (BETA)
   pages_build_output_dir = "out"
   ```
   이 설정이 가장 확실하게 인식됩니다.

2. **Cloudflare Pages Dashboard에서 설정**:
   - Cloudflare Dashboard → Pages → 프로젝트 선택
   - Settings → Builds & deployments
   - Build output directory를 `out`으로 설정
   - Save 후 재배포

3. **빌드 출력 확인**:
   - 로컬에서 `npm run build` 실행 후 `out` 디렉토리 확인
   - 빌드 로그에서 `Found build output at: .../out` 메시지 확인

**참고**: `cloudflare-pages.toml` 파일도 있지만, `wrangler.toml`의 `pages_build_output_dir` 설정이 더 확실하게 작동합니다.

### 4. 환경 변수가 적용되지 않는 경우

**증상**: 환경 변수를 설정했지만 빌드 시 적용되지 않음

**원인**:
- 환경 변수 이름 오타
- Production/Preview 환경 구분 오류
- 빌드 캐시 문제

**해결 방법**:

1. **환경 변수 이름 확인**:
   - `NEXT_PUBLIC_*` 접두사가 필요한 변수는 정확히 입력했는지 확인
   - `WORKER_URL`은 `NEXT_PUBLIC_` 접두사가 **없어야** 합니다

2. **환경 구분 확인**:
   - Production과 Preview 환경 변수를 각각 설정해야 합니다
   - Cloudflare Pages Dashboard에서 두 환경 모두 확인하세요

3. **빌드 캐시 클리어**:
   - Cloudflare Pages Dashboard → Settings → Builds & deployments
   - "Clear build cache" 클릭 후 재배포

### 5. `_redirects` 파일이 생성되지 않는 경우

**증상**: 빌드 후 `out/_redirects` 파일이 없음

**원인**:
- `post-build.js` 스크립트 실행 실패
- 빌드 출력 디렉토리를 찾지 못함

**해결 방법**:

1. **빌드 로그 확인**:
   - `postbuild` 스크립트 실행 로그 확인
   - "Found build output at: ..." 메시지 확인

2. **스크립트 수동 실행**:
   ```bash
   node scripts/post-build.js
   ```
   에러 메시지 확인

3. **출력 디렉토리 확인**:
   - `out` 디렉토리가 존재하는지 확인
   - `next.config.mjs`에서 `output: 'export'` 설정 확인

## 배포 체크리스트

배포 전에 다음 사항을 확인하세요:

- [ ] Cloudflare Workers가 배포되어 있고 정상 작동하는지 확인
- [ ] `WORKER_URL` 환경 변수가 Cloudflare Pages에 설정되어 있는지 확인
- [ ] `NEXT_PUBLIC_SITE_URL` 환경 변수가 설정되어 있는지 확인
- [ ] 로컬에서 `npm run build`가 성공하는지 확인
- [ ] `out/_redirects` 파일이 올바르게 생성되는지 확인
- [ ] `out/_headers` 파일이 존재하는지 확인
- [ ] Cloudflare Pages Dashboard에서 Build output directory가 `out`으로 설정되어 있는지 확인

## 디버깅 팁

### 1. 빌드 로그 확인
Cloudflare Pages Dashboard에서 빌드 로그를 자세히 확인하세요:
- 빌드 명령어 실행 로그
- `postbuild` 스크립트 출력
- 환경 변수 값 확인 (민감한 정보는 마스킹됨)

### 2. 로컬 빌드 테스트
프로덕션 배포 전에 로컬에서 빌드를 테스트하세요:
```bash
# 환경 변수 설정
export WORKER_URL=https://your-worker.workers.dev
export NEXT_PUBLIC_SITE_URL=https://your-site.com

# 빌드 실행
npm run build

# 생성된 파일 확인
ls -la out/
cat out/_redirects
```

### 3. Worker URL 확인
Worker가 정상적으로 배포되었는지 확인:
```bash
curl https://your-worker.workers.dev/api/health
```

### 4. 네트워크 요청 확인
브라우저 개발자 도구의 Network 탭에서:
- API 요청이 올바른 URL로 전송되는지 확인
- 응답 상태 코드 확인
- CORS 에러 확인

## 추가 리소스

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers 문서](https://developers.cloudflare.com/workers/)
- [Next.js 정적 내보내기](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

