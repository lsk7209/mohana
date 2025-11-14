# pnpm-lock.yaml 동기화 문제 해결

Cloudflare Pages 빌드에서 `pnpm-lock.yaml`이 `package.json`과 동기화되지 않는 문제가 발생할 수 있습니다.

## 해결 방법

### 방법 1: npm 사용 (권장)

Cloudflare Pages는 기본적으로 npm을 사용합니다. `cloudflare-pages.toml`에서 이미 npm을 사용하도록 설정되어 있습니다:

```toml
[build]
command = "npm run build"
```

**주의**: `package-lock.json` 파일이 생성되었으므로 npm을 사용하는 것이 안전합니다.

### 방법 2: pnpm-lock.yaml 업데이트

로컬에서 pnpm을 사용하는 경우:

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm

# lockfile 업데이트
pnpm install

# 업데이트된 pnpm-lock.yaml 커밋
git add pnpm-lock.yaml
git commit -m "chore: update pnpm-lock.yaml"
git push
```

### 방법 3: Cloudflare Pages Dashboard에서 빌드 명령어 변경

1. Cloudflare Dashboard → Pages → 프로젝트 선택
2. Settings → Builds & deployments
3. Build command를 다음 중 하나로 변경:
   - `npm install && npm run build` (npm 사용)
   - `pnpm install --no-frozen-lockfile && pnpm run build` (pnpm 사용, lockfile 검증 비활성화)

## 현재 설정

현재 프로젝트는 `cloudflare-pages.toml`에서 npm을 사용하도록 설정되어 있습니다:

```toml
[build]
command = "npm run build"
```

이 설정으로 인해 Cloudflare Pages는 npm을 사용하여 빌드하므로 `pnpm-lock.yaml` 동기화 문제가 발생하지 않습니다.

## 권장 사항

- **프로덕션 배포**: npm 사용 (Cloudflare Pages 기본)
- **로컬 개발**: npm 또는 pnpm 모두 사용 가능
- **일관성 유지**: 팀 전체가 같은 패키지 매니저 사용 권장

