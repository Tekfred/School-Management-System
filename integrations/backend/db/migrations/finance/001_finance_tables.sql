CREATE SCHEMA IF NOT EXISTS finance;
CREATE TABLE IF NOT EXISTS finance.fee_accounts (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES core.students(id) ON DELETE CASCADE,
  total_fees NUMERIC(12,2) NOT NULL CHECK (total_fees >= 0),
  total_paid NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (total_paid >= 0),
  outstanding NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (outstanding >= 0),
  due_date DATE, status TEXT NOT NULL DEFAULT 'partial' CHECK (status IN ('paid','partial','overdue')),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS finance.fee_items (
  id BIGINT PRIMARY KEY,
  fee_account_id BIGINT NOT NULL REFERENCES finance.fee_accounts(id) ON DELETE CASCADE,
  label TEXT NOT NULL, amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0), paid BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS finance.payments (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES core.students(id) ON DELETE CASCADE,
  receipt_number TEXT UNIQUE, description TEXT NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('Mobile Money','Bank Transfer','Card','Cash')),
  reference TEXT, amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
  paid_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
