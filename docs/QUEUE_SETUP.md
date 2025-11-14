# Queue 설정 가이드

Cloudflare Workers에서 Queue를 사용하려면 먼저 Queue를 생성해야 합니다.

## Queue 생성 방법

### 1. 로컬에서 Queue 생성

터미널에서 다음 명령어를 실행하세요:

```bash
# 이메일 발송용 Queue
npx wrangler queues create email-dispatch

# SMS 발송용 Queue
npx wrangler queues create sms-dispatch

# 재시도용 Queue
npx wrangler queues create retry-dispatch
```

각 명령어 실행 후 출력 예시:
```
✅ Successfully created queue "email-dispatch"
```

### 2. wrangler.toml 설정 활성화

Queue 생성 후 `wrangler.toml` 파일에서 Queue 설정의 주석을 해제하세요:

```toml
# Queues
[[queues.producers]]
queue = "email-dispatch"
binding = "EMAIL_QUEUE"

[[queues.consumers]]
queue = "email-dispatch"
max_batch_size = 10
max_batch_timeout = 30

[[queues.producers]]
queue = "sms-dispatch"
binding = "SMS_QUEUE"

[[queues.consumers]]
queue = "sms-dispatch"
max_batch_size = 10
max_batch_timeout = 30

[[queues.producers]]
queue = "retry-dispatch"
binding = "RETRY_QUEUE"
```

### 3. Workers 재배포

```bash
npm run deploy
```

## Queue가 없는 경우

Queue 기능이 아직 필요하지 않은 경우, `wrangler.toml`에서 Queue 설정을 주석 처리한 상태로 배포할 수 있습니다.

**주의**: Queue가 없으면 다음 기능이 작동하지 않습니다:
- 이메일 자동 발송
- SMS 자동 발송
- 실패한 메시지 재시도

## Queue 확인

생성된 Queue를 확인하려면:

```bash
npx wrangler queues list
```

Cloudflare Dashboard에서도 확인할 수 있습니다:
- Workers & Pages → Queues 메뉴

## 문제 해결

### 에러: Queue does not exist

**원인**: Queue가 생성되지 않았거나 이름이 일치하지 않음

**해결**:
1. Queue 생성 명령어 실행
2. `wrangler.toml`의 Queue 이름 확인
3. Queue 이름이 정확히 일치하는지 확인

### Queue 생성 실패

**원인**: 권한 문제 또는 계정 제한

**해결**:
1. `npx wrangler login`으로 로그인 확인
2. Cloudflare Dashboard에서 계정 상태 확인
3. Workers 플랜에서 Queue 지원 여부 확인

