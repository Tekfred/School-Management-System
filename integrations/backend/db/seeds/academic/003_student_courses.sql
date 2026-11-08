INSERT INTO academic.student_courses (student_id, course_code, name, lecturer, progress, next_task, accent)
SELECT s.id, course.code, course.name, course.lecturer, course.progress, course.next_task, course.accent
FROM core.students s
CROSS JOIN (VALUES
  ('CS 302', 'Data Structures', 'Dr. Mensah', 75, 'Binary trees lab', '#3b82f6'),
  ('CS 318', 'Database Systems', 'Prof. Owusu', 50, 'ERD quiz', '#10b981'),
  ('CS 330', 'Software Engineering', 'Ms. Aidoo', 90, 'Sprint demo', '#E5BA73')
) AS course(code, name, lecturer, progress, next_task, accent)
WHERE s.student_number = 'CS/2022/0047'
ON CONFLICT (student_id, course_code) DO NOTHING;
