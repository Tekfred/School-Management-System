INSERT INTO academic.courses (id, title, teacher, student_count, progress, modules, category, icon) VALUES
(1, 'Computer Science', 'Dr Anderson', 320, 85, 8, 'Technology', 'computer'),
(2, 'Business Analytics', 'Dr Williams', 210, 72, 12, 'Business', 'analytics'),
(3, 'Mathematics Essentials', 'Prof. Sarpong', 180, 64, 10, 'Mathematics', 'calculate')
ON CONFLICT (id) DO NOTHING;
INSERT INTO academic.student_activities (student_id, icon_text, title, message, detail, occurred_at)
SELECT s.id, a.icon_text, a.title, a.message, a.detail, a.occurred_at
FROM core.students s
CROSS JOIN (VALUES
  ('DS', 'Data Structures', ' assignment graded: ', 'A-', NOW() - INTERVAL '2 hours'),
  ('DB', 'Database Systems', ' lab submission received for ', 'Normalization Project', NOW() - INTERVAL '4 hours'),
  ('SE', 'Software Engineering', ' unlocked badge ', 'Early Submission', NOW() - INTERVAL '1 day')
) AS a(icon_text, title, message, detail, occurred_at)
WHERE s.student_number = 'CS/2022/0047'
AND NOT EXISTS (SELECT 1 FROM academic.student_activities WHERE student_id = s.id AND title = a.title AND detail = a.detail);
INSERT INTO academic.campus_events (title, starts_at, location)
SELECT 'Academic Advising', NOW() + INTERVAL '2 days', 'Student Services'
WHERE NOT EXISTS (SELECT 1 FROM academic.campus_events WHERE title = 'Academic Advising');
