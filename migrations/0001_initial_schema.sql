-- 리드 & CRM
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  company TEXT,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  headcount INTEGER,
  theme TEXT,
  memo TEXT,
  status TEXT CHECK(status IN ('new','in_progress','quoted','won','lost','on_hold')) DEFAULT 'new',
  tags TEXT,
  owner TEXT,
  last_activity_at INTEGER
);

CREATE TABLE IF NOT EXISTS lead_scores (
  lead_id TEXT PRIMARY KEY,
  score INTEGER DEFAULT 0,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lead_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  type TEXT NOT NULL,
  meta TEXT,
  ts INTEGER NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
);

-- 메시징
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  channel TEXT NOT NULL CHECK(channel IN ('email','sms')),
  name TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  variables TEXT,
  ab_key TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  channel TEXT NOT NULL CHECK(channel IN ('email','sms')),
  template_id TEXT,
  subject TEXT,
  body_rendered TEXT NOT NULL,
  status TEXT CHECK(status IN ('pending','sent','delivered','failed','bounced')) DEFAULT 'pending',
  error TEXT,
  created_at INTEGER NOT NULL,
  sent_at INTEGER,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(id)
);

CREATE TABLE IF NOT EXISTS message_events (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('open','click','bounce','delivery','reply')),
  meta TEXT,
  ts INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);

-- 시퀀스
CREATE TABLE IF NOT EXISTS sequences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  steps TEXT NOT NULL, -- JSON 배열
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sequence_runs (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  sequence_id TEXT NOT NULL,
  step_index INTEGER NOT NULL,
  status TEXT CHECK(status IN ('pending','sent','skipped','completed')) DEFAULT 'pending',
  scheduled_at INTEGER,
  sent_at INTEGER,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (sequence_id) REFERENCES sequences(id) ON DELETE CASCADE
);

-- 콘텐츠
CREATE TABLE IF NOT EXISTS instructors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  photo TEXT,
  bio TEXT,
  career TEXT,
  skills TEXT,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  duration INTEGER,
  price_hint TEXT,
  theme TEXT,
  instructor_id TEXT,
  outcomes TEXT,
  faq TEXT,
  is_published INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

-- 구독 해지
CREATE TABLE IF NOT EXISTS unsubscribes (
  email TEXT PRIMARY KEY,
  reason TEXT,
  unsubscribed_at INTEGER NOT NULL
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_lead ON messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
-- 복합 인덱스: status와 created_at을 함께 사용하는 쿼리 최적화 (retryFailedMessages 등)
CREATE INDEX IF NOT EXISTS idx_messages_status_created ON messages(status, created_at);
CREATE INDEX IF NOT EXISTS idx_events_message ON message_events(message_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON message_events(type);
-- 타임스탬프 기반 쿼리 최적화 (일별 통계 집계 등)
CREATE INDEX IF NOT EXISTS idx_events_type_ts ON message_events(type, ts);
CREATE INDEX IF NOT EXISTS idx_sequence_runs_lead ON sequence_runs(lead_id);
CREATE INDEX IF NOT EXISTS idx_sequence_runs_status ON sequence_runs(status);
-- scheduled_at 기반 쿼리 최적화 (processSequenceSteps)
CREATE INDEX IF NOT EXISTS idx_sequence_runs_status_scheduled ON sequence_runs(status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_published ON programs(is_published);

