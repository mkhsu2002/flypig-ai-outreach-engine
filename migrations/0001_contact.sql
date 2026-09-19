CREATE TABLE IF NOT EXISTS contact_requests (
  id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  recipient_hash TEXT NOT NULL,
  payload TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','sending','sent','needs_review')),
  created_at INTEGER NOT NULL,
  first_attempt INTEGER,
  attempts INTEGER NOT NULL DEFAULT 0,
  lease_until INTEGER NOT NULL DEFAULT 0,
  provider_id TEXT,
  provider_code TEXT,
  sent_at INTEGER
);
CREATE INDEX IF NOT EXISTS contact_pending ON contact_requests(status, created_at);
CREATE TABLE IF NOT EXISTS contact_audit (
  request_id TEXT NOT NULL REFERENCES contact_requests(id),
  stage TEXT NOT NULL,
  attempt INTEGER NOT NULL,
  recorded_at INTEGER NOT NULL,
  recipient_hash TEXT NOT NULL,
  provider_id TEXT,
  provider_code TEXT,
  PRIMARY KEY(request_id, stage, attempt)
);
