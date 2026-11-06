import { Router } from "express";
import { query } from "../../../config/database.js";
const router = Router();
router.get("/", async (req, res) => {
  const { rows } =
    await query(`SELECT id, name, department, course_count AS courses, rating, status
    FROM faculty.lecturers WHERE is_active = TRUE ORDER BY name`);
  const stats = await query(`SELECT COUNT(*)::int AS total,
    COUNT(*) FILTER (WHERE status = 'Available')::int AS available,
    COALESCE(SUM(course_count), 0)::int AS courses,
    COALESCE(ROUND(AVG(rating)::numeric, 1), 0)::float AS rating
    FROM faculty.lecturers WHERE is_active = TRUE`);
  const s = stats.rows[0];
  const [top, upcoming] = await Promise.all([
    query(`SELECT l.id, l.name, p.score FROM faculty.top_performers p JOIN faculty.lecturers l ON l.id = p.lecturer_id ORDER BY p.score DESC`),
    query(`SELECT u.id, u.title, l.name AS lecturer, to_char(u.starts_at, 'Mon DD, HH24:MI') AS time
      FROM faculty.upcoming_lectures u JOIN faculty.lecturers l ON l.id = u.lecturer_id WHERE u.starts_at >= NOW() ORDER BY u.starts_at LIMIT 5`),
  ]);
  res.json({
    data: {
      stats: [
        { id: 1, title: "Total Lecturers", value: String(s.total) },
        { id: 2, title: "Present Today", value: String(s.available) },
        { id: 3, title: "Courses Taught", value: String(s.courses) },
        { id: 4, title: "Average Rating", value: String(s.rating) },
      ],
      list: rows,
      top: top.rows,
      upcoming: upcoming.rows,
    },
  });
});
export default router;
