# Cloudflare Pages 수동 배포 가이드

GitHub 자동 배포가 작동하지 않을 때 수동으로 배포하는 방법입니다.

## 방법 1: Cloudflare Dashboard에서 직접 업로드 (가장 간단)

### 1단계: 로컬에서 빌드

```bash
# 프로젝트 디렉토리로 이동
cd D:\cousorai\web\14_mohana

# 의존성 설치
npm install

# 빌드 실행
npm run build
```

빌드가 성공하면 `out` 디렉토리가 생성됩니다.

### 2단계: Cloudflare Dashboard에서 업로드

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 로그인

2. **Pages 프로젝트 선택**
   - 왼쪽 사이드바에서 **"Workers & Pages"** 클릭
   - **"Pages"** 탭 선택
   - 프로젝트 선택 (예: `mohana`)

3. **수동 배포 시작**
   - **"Deployments"** 탭으로 이동
   - 우측 상단의 **"Create deployment"** 또는 **"Upload assets"** 버튼 클릭
   - 또는 **"Deployments"** 탭에서 **"Retry deployment"** 옆의 **"..."** 메뉴 → **"Create deployment"**

4. **빌드 출력 디렉토리 업로드**
   - **"Upload assets"** 또는 **"Deploy a folder"** 선택
   - `out` 디렉토리 전체를 선택하여 업로드
   - 또는 `out` 디렉토리 내의 모든 파일을 압축(ZIP)하여 업로드

5. **배포 확인**
   - 배포가 완료되면 **"View deployment"** 클릭
   - 사이트가 정상적으로 작동하는지 확인

## 방법 2: Wrangler CLI를 사용한 배포

### 사전 준비

```bash
# Wrangler CLI 설치 (이미 설치되어 있으면 생략)
npm install -g wrangler

# Cloudflare 로그인
npx wrangler login
```

### 배포 실행

```bash
# 1. 로컬에서 빌드
npm run build

# 2. Pages 배포
npx wrangler pages deploy out --project-name=mohana
```

**참고**: `--project-name`은 실제 Cloudflare Pages 프로젝트 이름으로 변경하세요.

## 방법 3: ZIP 파일로 업로드

### 1단계: 빌드 및 압축

```bash
# 빌드 실행
npm run build

# out 디렉토리를 ZIP으로 압축
# Windows PowerShell:
Compress-Archive -Path out\* -DestinationPath mohana-build.zip

# 또는 Windows 탐색기에서:
# out 폴더 선택 → 우클릭 → "압축" 또는 "보내기" → "압축된 폴더"
```

### 2단계: Cloudflare Dashboard에서 업로드

1. Cloudflare Dashboard → Pages → 프로젝트 선택
2. **"Deployments"** 탭 → **"Create deployment"**
3. **"Upload assets"** 선택
4. ZIP 파일 업로드
5. Cloudflare가 자동으로 압축 해제 및 배포

## 중요 체크리스트

배포 전 확인사항:

- [ ] `out` 디렉토리가 생성되었는지 확인
- [ ] `out/index.html` 파일이 존재하는지 확인
- [ ] `out/_redirects` 파일이 존재하는지 확인
- [ ] `out/_headers` 파일이 존재하는지 확인
- [ ] 환경 변수가 Cloudflare Dashboard에 설정되어 있는지 확인
  - `NEXT_PUBLIC_WORKER_URL`: Worker URL (예: `https://mohana-worker.xxx.workers.dev`)
  - `NEXT_PUBLIC_SITE_URL`: 사이트 URL (예: `https://mohana.pages.dev`)

## 환경 변수 확인 및 설정

1. **Cloudflare Dashboard → Pages → 프로젝트 → Settings**
2. **"Environment Variables"** 섹션 확인
3. 다음 변수들이 설정되어 있는지 확인:
   - `NEXT_PUBLIC_WORKER_URL`: Worker 배포 URL
   - `NEXT_PUBLIC_SITE_URL`: 사이트 기본 URL

**참고**: 환경 변수는 배포 시점에 적용되므로, 배포 전에 설정해야 합니다.

## 배포 후 확인

1. **사이트 접속 테스트**
   - 배포된 URL로 접속 (예: `https://mohana.pages.dev`)
   - 메인 페이지가 정상적으로 로드되는지 확인

2. **관리자 페이지 테스트**
   - `/admin` 접속 (개발 단계에서는 비밀번호 없이 접속 가능)
   - 통계 페이지가 정상적으로 작동하는지 확인

3. **API 연결 테스트**
   - 문의 폼 제출 테스트
   - 브라우저 개발자 도구 → Network 탭에서 API 요청 확인

## 문제 해결

### 빌드 실패

```bash
# 캐시 삭제 후 재빌드
rm -rf .next out node_modules
npm install
npm run build
```

### 배포 후 404 에러

- `out` 디렉토리가 올바르게 업로드되었는지 확인
- Cloudflare Dashboard → Pages → Settings → Build output directory가 `out`으로 설정되어 있는지 확인

### API 요청 실패

- `NEXT_PUBLIC_WORKER_URL` 환경 변수가 올바르게 설정되어 있는지 확인
- Worker가 정상적으로 배포되어 있는지 확인

## 추가 참고 자료

- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 문서](https://developers.cloudflare.com/workers/wrangler/)
- [배포 체크리스트](./DEPLOYMENT_CHECKLIST.md)
- [배포 문제 해결 가이드](./DEPLOYMENT_TROUBLESHOOTING.md)

