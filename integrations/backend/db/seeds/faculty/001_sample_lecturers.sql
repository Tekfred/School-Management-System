INSERT INTO faculty.lecturers (id, name, department, course_count, rating, status) VALUES
(1, 'Dr. Michael Brown', 'Computer Science', 4, 4.8, 'Available'),
(2, 'Dr. Angela Mensah', 'Mathematics', 3, 4.6, 'In Class'),
(3, 'Prof. Samuel Owusu', 'Business', 5, 4.7, 'Available'),
(4, 'Ms. Ama Aidoo', 'Engineering', 2, 4.4, 'On Leave')
ON CONFLICT (id) DO NOTHING;

INSERT INTO faculty.top_performers (lecturer_id, score) VALUES (1, 98), (3, 92)
ON CONFLICT (lecturer_id) DO NOTHING;
INSERT INTO faculty.upcoming_lectures (lecturer_id, title, starts_at) VALUES
(1, 'Algorithms - Lecture 5', NOW() + INTERVAL '2 days'),
(2, 'Linear Algebra - Lecture 2', NOW() + INTERVAL '3 days')
ON CONFLICT DO NOTHING;
