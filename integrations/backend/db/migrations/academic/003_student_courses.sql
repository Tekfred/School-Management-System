CREATE TABLE IF NOT EXISTS academic.student_courses (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES core.students(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  name TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  next_task TEXT NOT NULL DEFAULT '',
  accent TEXT NOT NULL DEFAULT '#E5BA73',
  UNIQUE (student_id, course_code)
);
