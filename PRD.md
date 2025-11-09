# 기업 힐링·워크샵 플랫폼 — Cloudflare 최적화 기획서 (Dev-Ready)

## 0) 목표·범위(간단)

* **목표:** 기업 담당자 리드 확보 → 운영자 중개 → 이메일·문자 시퀀스로 상담 전환.

* **Cloudflare 스택:** Pages(SSR) + Workers(API) + D1(DB) + KV(Cache) + Queues(발송) + Cron(스케줄) + Access(Admin 보호).

* **채널:** 이메일(오픈/클릭 트래킹, 즉시/예약 발송) + 문자(Solapi API).

* **정책:** 강의·강사 공개(프로필·사진·이력), 직접 연락은 운영자 경유.

---

## 1) 정보구조(IA)·라우팅

```
/ (메인)                   /programs, /programs/[slug]
/landing/[theme]           /offer/[campaign]
/contact                   /t/o  (open pixel)
/api/leads  (POST)         /t/c  (click redirect)
/(admin) ...               /(partner) ...
```

* **메인:** 공감→솔루션→사례→CTA("무료 제안서 받기").
* **광고용 랜딩:** 단일 CTA 폼, 테마별 5~7개.
* **오퍼 랜딩:** 혜택·한정·신뢰형 카피, 리마케팅 유입용.
* **프로그램 상세:** 강사 공개(이름·사진·이력), 연락처는 미노출, CTA=문의.

---

## 2) 데이터 모델(D1·핵심 테이블)

```sql
-- 리드 & CRM
CREATE TABLE leads (
  id TEXT PRIMARY KEY, created_at INTEGER,
  company TEXT, name TEXT, email TEXT, phone TEXT,
  headcount INTEGER, theme TEXT, memo TEXT,
  status TEXT CHECK(status IN ('new','in_progress','quoted','won','lost','on_hold')) DEFAULT 'new',
  tags TEXT, owner TEXT
);

CREATE TABLE lead_scores (lead_id TEXT, score INTEGER, updated_at INTEGER, PRIMARY KEY(lead_id));
CREATE TABLE lead_events (id TEXT PRIMARY KEY, lead_id TEXT, type TEXT, meta TEXT, ts INTEGER);

-- 메시징
CREATE TABLE templates (
  id TEXT PRIMARY KEY, channel TEXT, name TEXT,
  subject TEXT, body TEXT, variables TEXT, ab_key TEXT
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY, lead_id TEXT, channel TEXT, template_id TEXT,
  subject TEXT, body_rendered TEXT, status TEXT, error TEXT, created_at INTEGER
);

CREATE TABLE message_events (
  id TEXT PRIMARY KEY, message_id TEXT, type TEXT, meta TEXT, ts INTEGER
);

-- 시퀀스
CREATE TABLE sequences (
  id TEXT PRIMARY KEY, name TEXT, steps JSON
);
CREATE TABLE sequence_runs (
  id TEXT PRIMARY KEY, lead_id TEXT, sequence_id TEXT,
  step_index INTEGER, status TEXT, updated_at INTEGER
);

-- 콘텐츠
CREATE TABLE instructors (
  id TEXT PRIMARY KEY, name TEXT, title TEXT, photo TEXT, bio TEXT, career TEXT, skills TEXT, is_active INTEGER
);
CREATE TABLE programs (
  id TEXT PRIMARY KEY, slug TEXT UNIQUE, title TEXT, summary TEXT, duration INTEGER,
  price_hint TEXT, theme TEXT, instructor_id TEXT, outcomes TEXT, faq TEXT, is_published INTEGER
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_messages_lead ON messages(lead_id);
CREATE INDEX idx_events_message ON message_events(message_id);
```

* **KV 용도:** `rate:ip`, `template:cache`, `landing:ab`, `rule:last_run` 등 캐시/토글.
* **R2(선택):** 강사 사진·브로슈어(PDF) 저장.

---

## 3) 메시징 모듈(즉시·예약/시퀀스)

### 3.1 이메일(HTTP 기반 전송 권고)

* **오픈/클릭 트래킹**
  * 오픈: 1×1 픽셀 `GET /t/o?m=<msgId>&s=<sig>`
  * 클릭: `GET /t/c?m=<msgId>&u=<encoded>&s=<sig>` → 302 원링크
  * 서버는 `message_events(open/click)` 적재, 3초 내 동일 IP/UA 중복 무시.

* **즉시 발송**
  * Admin UI에서 "즉시 발송" → API가 **Queues**에 넣고 → "Email Dispatcher Worker"가 처리.

* **예약/시퀀스**
  * Cron + Durable Object 스케줄러가 step별 지연 발송.

* **SMTP 주의사항(중요)**
  * Cloudflare Workers는 **원시 SMTP 소켓 불가**.
    ⇒ **권장:** MailChannels/Resend/Mailgun/Postmark 등 **HTTP API** 사용.
    ⇒ **엄격 SMTP 필요 시:** 외부 경량 **SMTP Bridge(HTTP→SMTP)**를 별도 컨테이너로 운영(예: Fly.io), Workers는 HTTP로 Bridge 호출.

* **도메인/전달성**
  * 발신 도메인 SPF/DKIM/DMARC 설정 필수, 바운스 웹훅(가능 시)로 `message_events(bounce/delivery)` 수집.

### 3.2 문자(Solapi)

* **API 키:** `SOLAPI_API_KEY/SECRET`, 발신번호 등록.
* **용례:** 이메일 미오픈 48h 리마인더, 견적 발송 알림.
* **트래킹:** 문자 링크는 `/t/c` 단축 리디렉트 사용(클릭 집계).

### 3.3 템플릿·개인화

* 변수: `{{lead.name | '담당자님'}}`, `{{company}}`, `{{cta.url}}`, `{{deadline}}`
* A/B: `ab_key`로 제목/본문 버전 관리, CTR 비교.

---

## 4) 자동화 로직(규칙 엔진·리드 점수)

* **리드 점수(Lead Scoring):** open +1 / click +3 / reply +5 / 7일 미행동 −2
  * 10점↑ ⇒ **핫리드 태그** + Slack 알림.

* **자동 규칙 예시**
  * `IF status='in_progress' AND 48h 경과 → 리마인드 이메일`
  * `IF email_opened IS FALSE FOR 48h → SMS 리마인더`
  * `IF last_activity > 7d → 재활성 캠페인 배정`

* **구독해지:** `/unsubscribe` 클릭 시 `unsubscribes` 기록, 이후 발송 차단.

---

## 5) Admin UX(원스톱 리드 관리)

* **대시보드:** 핫리드/신규/장기미응답 카운터, 오픈·클릭·전환 그래프.
* **리드 보드(Kanban):** new/in_progress/quoted/won/lost/on_hold 드래그 전환.
* **리드 상세(One-Stop):** 상태 변경 + 메모 + 이메일/SMS 즉시 발송 + 시퀀스 지정 + 타임라인(문의→발송→오픈/클릭→상담).
* **메시징 패널:** 이메일·SMS를 동일 스레드로 표시(검색/필터).
* **액션 단축키:** E(이메일), S(SMS), M(메모).

---

## 6) 퍼널·카피(랜딩·시퀀스 보완)

* **광고 랜딩:** 주목→공감→효과→사례→단일 CTA(폼).
* **오퍼 랜딩:** 혜택→신뢰→긴급→보장→CTA.
* **이메일 시퀀스(예)**
  * #1 즉시: 웰컴+맞춤 제안서(+체크리스트)
  * #2 +2일: 유사기업 사례
  * #3 +3일(미오픈): SMS 리마인더
  * #4 +4일: 가치/효과
  * #5 +7일: 무료 컨설팅 예약(캘린더)
  * #6 +10일: 마감·한정 오퍼
* **CTA 다변화:** 제안서 보기 / 체크리스트 다운로드 / 사례 보기 / 컨설팅 예약.

---

## 7) Cloudflare 리소스 구성(권장 아키텍처)

* **Pages(SSR)**
  * 프론트(Next.js App Router), `/t/o`, `/t/c` 라우트 가능.

* **Workers(API)**
  * `/api/leads`, `/api/messages/*`, `/api/sequences/*`, `/api/admin/*`.

* **Queues**
  * `email-dispatch`, `sms-dispatch`, `retry-dispatch`.

* **Durable Objects**
  * `SequenceScheduler`(스텝 지연·중복 방지), `RateLimiter`.

* **D1**
  * 위 스키마 표 참조(리드/메시지/이벤트/시퀀스/콘텐츠).

* **KV**
  * 템플릿 캐시, A/B 토글, 규칙 실행시각, IP 레이트.

* **Access**
  * `/(admin)`, `/(partner)` 보호, RBAC는 앱 내부에서.

---

## 8) 크론 스케줄(UTC)

* `*/5 * * * *`  : Queue 재시도(지수 백오프 1m→5m→30m)
* `0 * * * *`    : 시퀀스 스텝 스케줄링(시간당 배치)
* `5 0 * * *`    : 집계 ETL(이벤트 → 일별 요약), sitemap 재생성/색인 핑
* `15 0 * * 1`   : 링크헬스/깨진 링크 점검(주1회)

---

## 9) 보안·성능·준수

* **성능 예산:** 응답 ≤500ms, LCP ≤2.0s, 모바일 Lighthouse SEO ≥92.
* **이메일 전달성:** SPF/DKIM/DMARC, From 일관, 바운스 모니터링.
* **레이트리밋:** IP·리드별 발송 제한, Abuse 방어.
* **개인정보·동의:** 수신동의/언서브, 보존기간(예: 리드 1년, 이벤트 3개월 익명화).
* **감사/로그:** Admin 민감 조작 2단 확인, 감사 로그.

---

## 10) 환경변수(예시)

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_NAME, FROM_EMAIL
MAILCHANNELS_API_KEY (or RESEND_API_KEY ...)
SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER
CF_D1_DB, CF_KV_NAMESPACE, CF_QUEUE_EMAIL, CF_QUEUE_SMS
HMAC_SECRET, ACCESS_AUD, ACCESS_TEAM
```

---

## 11) 배포·설정 체크리스트

* [ ] wrangler.toml: D1/KV/Queues/DO/Access 바인딩 선언
* [ ] SPF/DKIM/DMARC 완료, 발신 평판 테스트
* [ ] Solapi 발신번호 등록·승인
* [ ] 시퀀스 리허설(내부 테스트 리드) 후 본가동
* [ ] A/B 실험 14일 단위, 패자 템플릿 폐기
* [ ] 오류 알림: 실패율 급증·바운스율 상승 Slack 경보

---

## 12) 개발용 엔드포인트 개요

* `POST /api/leads` — 리드 생성(봇 방지 토큰·레이트리밋)
* `POST /api/messages/send-email|send-sms` — 즉시 발송(큐 투입)
* `POST /api/sequences/run` — 리드에 시퀀스 시작
* `GET  /t/o` — 오픈 픽셀(1×1), 이벤트 적재
* `GET  /t/c` — 클릭 리디렉트, UTM 부착, 이벤트 적재
* `GET  /api/admin/leads/:id` — 타임라인(문의/발송/오픈/클릭/메모)

---

## 13) 확장성(성장 단계 로드맵)

* **발송 워커 분리**(멀티 컨슈머) → 대량(>10k/일) 안정화
* **집계 테이블**로 대시보드 빠른 응답
* **외부 Postgres 하이브리드**(필요 시) + D1는 운영코어 유지
* **캘린더 예약 연동**(Google/Calendly), 상담 슬롯 확정 자동화

---

### 결론

이 기획은 Cloudflare의 **Pages + Workers + D1 + KV + Queues + Cron**을 최대한 활용해,
**리드 수집 → CRM → 이메일/문자 자동화 → 상담 전환**까지 **서버리스 단일 스택**으로 완결합니다.

SMTP 제약(Workers 원시 TCP 불가)은 **HTTP 기반 이메일 전송(권장)** 또는 **외부 SMTP Bridge**로 안전하게 보완했습니다.

운영자는 **원스톱 Admin**에서 규칙·점수·시퀀스로 리드를 자동 관리하며,
성능·전달성·보안·준수 기준을 충족하도록 설계되어 즉시 개발 착수가 가능합니다.

