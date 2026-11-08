CREATE TABLE IF NOT EXISTS academic.momentum_months (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES core.students(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL,
  month_order SMALLINT NOT NULL CHECK (month_order BETWEEN 1 AND 12),
  month_label TEXT NOT NULL,
  progress_score INTEGER NOT NULL CHECK (progress_score BETWEEN 0 AND 100),
  UNIQUE (student_id, academic_year, month_order)
);

CREATE TABLE IF NOT EXISTS academic.student_achievements (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES core.students(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  detail TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, name)
);

CREATE TABLE IF NOT EXISTS academic.campus_feed (
  id BIGSERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
