CREATE SCHEMA IF NOT EXISTS core;
CREATE TABLE IF NOT EXISTS core.students (
  id BIGSERIAL PRIMARY KEY,
  student_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  program TEXT NOT NULL,
  semester TEXT NOT NULL DEFAULT 'Semester 2 — 2024/2025',
  level TEXT NOT NULL DEFAULT 'Level 1',
  streak INTEGER NOT NULL DEFAULT 0,
  semester_progress INTEGER NOT NULL DEFAULT 0 CHECK (semester_progress BETWEEN 0 AND 100),
  gpa NUMERIC(3,2) NOT NULL DEFAULT 0,
  attendance_percent INTEGER NOT NULL DEFAULT 0 CHECK (attendance_percent BETWEEN 0 AND 100),
  assignments_completed INTEGER NOT NULL DEFAULT 0,
  assignments_total INTEGER NOT NULL DEFAULT 0,
  credits_earned INTEGER NOT NULL DEFAULT 0,
  credits_required INTEGER NOT NULL DEFAULT 120,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
