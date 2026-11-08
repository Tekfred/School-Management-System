INSERT INTO core.students (id, student_number, name, program, level, streak, semester_progress, gpa, attendance_percent, assignments_completed, assignments_total, credits_earned, credits_required)
VALUES (1, 'CS/2022/0047', 'Audi Mensah', 'Computer Science', 'Level 5', 12, 68, 3.45, 80, 7, 10, 96, 120)
ON CONFLICT (student_number) DO NOTHING;
