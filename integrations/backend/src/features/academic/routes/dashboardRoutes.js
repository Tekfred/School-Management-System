import { Router } from "express";
import { query } from "../../../config/database.js";
const router = Router();
router.get("/", async (req, res) => {
  const result =
    await query(`SELECT name, level, streak, semester_progress AS "semesterProgress", gpa,
    attendance_percent AS attendance, assignments_completed AS "assignmentsCompleted", assignments_total AS "assignmentsTotal",
    credits_earned AS "creditsEarned", credits_required AS "creditsRequired"
    FROM core.students ORDER BY id LIMIT 1`);
  const studentProgress = result.rows[0] || null;
  if (!studentProgress)
    return res.json({
      data: {
        studentProgress: null,
        activeStatus: [],
        recentActivities: [],
        upcomingEvents: [],
      },
    });
  const [activityResult, eventResult] = await Promise.all([
    query(`SELECT id, icon_text AS "iconText", title AS "BoldText", message AS messages, detail AS "BoldText2",
      to_char(occurred_at, 'Mon DD, HH24:MI') AS "TimeRanges" FROM academic.student_activities WHERE student_id = (SELECT id FROM core.students ORDER BY id LIMIT 1) ORDER BY occurred_at DESC LIMIT 5`),
    query(
      `SELECT title, to_char(starts_at, 'Mon DD, HH24:MI') AS date FROM academic.campus_events WHERE starts_at >= NOW() ORDER BY starts_at LIMIT 5`,
    ),
  ]);
  const activeStatus = [
    {
      id: 1,
      name: "Current GPA",
      value: Number(studentProgress.gpa).toFixed(2),
      message: "Current semester average",
    },
    {
      id: 2,
      name: "Attendance",
      value: `${studentProgress.attendance}%`,
      message: "Class attendance",
    },
    {
      id: 3,
      name: "Assignments",
      value: `${studentProgress.assignmentsCompleted}/${studentProgress.assignmentsTotal}`,
      message: "Completed assignments",
    },
    {
      id: 4,
      name: "Credits Earned",
      value: String(studentProgress.creditsEarned),
      message: `${Math.max(0, studentProgress.creditsRequired - studentProgress.creditsEarned)} credits remaining`,
    },
  ];
  res.json({
    data: {
      studentProgress,
      activeStatus,
      recentActivities: activityResult.rows,
      upcomingEvents: eventResult.rows,
    },
  });
});
export default router;
