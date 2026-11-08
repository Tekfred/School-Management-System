INSERT INTO academic.momentum_months (student_id, academic_year, month_order, month_label, progress_score)
SELECT s.id, '2025-2026', m.month_order, m.month_label, m.progress_score
FROM core.students s
CROSS JOIN (VALUES
  (1, 'Jan', 62), (2, 'Feb', 68), (3, 'Mar', 74),
  (4, 'Apr', 79), (5, 'May', 84), (6, 'Jun', 91)
) AS m(month_order, month_label, progress_score)
WHERE s.student_number = 'CS/2022/0047'
ON CONFLICT (student_id, academic_year, month_order) DO NOTHING;

INSERT INTO academic.student_achievements (student_id, name, icon, detail, earned_at)
SELECT s.id, a.name, a.icon, a.detail, a.earned_at
FROM core.students s
CROSS JOIN (VALUES
  ('Perfect Attendance', 'verified', '3 weeks clean', NOW() - INTERVAL '1 day'),
  ('Top Performer', 'military_tech', 'Top 8% this semester', NOW() - INTERVAL '2 days'),
  ('Assignment Master', 'task_alt', '7 of 10 completed', NOW() - INTERVAL '3 days'),
  ('Early Submission', 'bolt', '4 tasks early', NOW() - INTERVAL '4 days')
) AS a(name, icon, detail, earned_at)
WHERE s.student_number = 'CS/2022/0047'
ON CONFLICT (student_id, name) DO NOTHING;

INSERT INTO academic.campus_feed (label, title, published_at)
SELECT feed.label, feed.title, feed.published_at
FROM (VALUES
  ('Announcement', 'Mid-semester results are now available', NOW()),
  ('Internship', 'Frontend trainee role opened at DevWorks', NOW() - INTERVAL '1 day'),
  ('Competition', 'Register for the campus hackathon', NOW() - INTERVAL '2 days')
) AS feed(label, title, published_at)
WHERE NOT EXISTS (SELECT 1 FROM academic.campus_feed existing WHERE existing.title = feed.title);

INSERT INTO academic.campus_events (title, starts_at, location)
SELECT event.title, event.starts_at, event.location
FROM (VALUES
  ('Database Systems quiz', NOW() + INTERVAL '3 days', 'Computer Lab'),
  ('Software Engineering demo', NOW() + INTERVAL '6 days', 'Engineering Hall'),
  ('Tuition payment deadline', NOW() + INTERVAL '10 days', 'Finance Office'),
  ('AI Club Hack Night', NOW() + INTERVAL '13 days', 'Innovation Hub')
) AS event(title, starts_at, location)
WHERE NOT EXISTS (SELECT 1 FROM academic.campus_events existing WHERE existing.title = event.title);
