import { Router } from 'express'
import { query } from '../../../config/database.js'
const router = Router()

router.get('/', async (req, res) => {
  const result = await query(`SELECT id, name, level, streak, semester_progress AS "semesterProgress", gpa,
    attendance_percent AS attendance, assignments_completed AS "assignmentsCompleted", assignments_total AS "assignmentsTotal",
    credits_earned AS "creditsEarned", credits_required AS "creditsRequired"
    FROM core.students ORDER BY id LIMIT 1`)
  const studentProgress = result.rows[0] || null
  if (!studentProgress) {
    return res.json({ data: {
      studentProgress: null, activeStatus: [], enrollmentData: [], recentActivities: [],
      upcomingEvents: [], achievements: [], campusFeed: [], courses: [],
    } })
  }

  const id = studentProgress.id
  const [activityResult, eventResult, momentumResult, achievementResult, feedResult, courseResult] = await Promise.all([
    query(`SELECT id, icon_text AS "iconText", title AS "BoldText", message AS messages, detail AS "BoldText2",
      to_char(occurred_at, 'Mon DD, HH24:MI') AS "TimeRanges"
      FROM academic.student_activities WHERE student_id = $1 ORDER BY occurred_at DESC LIMIT 5`, [id]),
    query(`SELECT id, title AS "Events", to_char(starts_at, 'Mon DD, YYYY') AS "Timeline",
      to_char(starts_at, 'HH12:MI AM') AS "Time" FROM academic.campus_events
      WHERE starts_at >= NOW() ORDER BY starts_at LIMIT 12`),
    query(`SELECT month_label AS month, progress_score AS students, progress_score AS percent
      FROM academic.momentum_months WHERE student_id = $1 ORDER BY academic_year, month_order`, [id]),
    query(`SELECT id, name, icon, detail FROM academic.student_achievements
      WHERE student_id = $1 ORDER BY id`, [id]),
    query(`SELECT id, label, title, CASE WHEN published_at::date = CURRENT_DATE THEN 'Today'
      ELSE to_char(published_at, 'Mon DD') END AS time
      FROM academic.campus_feed ORDER BY published_at DESC LIMIT 8`),
    query(`SELECT id, course_code AS code, name, lecturer, progress, next_task AS "nextTask", accent
      FROM academic.student_courses WHERE student_id = $1 ORDER BY id`, [id]),
  ])

  const activeStatus = [
    { id: 1, name: 'Current GPA', value: Number(studentProgress.gpa).toFixed(2), message: 'Current semester average' },
    { id: 2, name: 'Attendance', value: `${studentProgress.attendance}%`, message: 'Class attendance' },
    { id: 3, name: 'Assignments', value: `${studentProgress.assignmentsCompleted}/${studentProgress.assignmentsTotal}`, message: 'Completed assignments' },
    { id: 4, name: 'Credits Earned', value: String(studentProgress.creditsEarned), message: `${Math.max(0, studentProgress.creditsRequired - studentProgress.creditsEarned)} credits remaining` },
  ]

  res.json({ data: {
    studentProgress,
    activeStatus,
    enrollmentData: momentumResult.rows,
    recentActivities: activityResult.rows,
    upcomingEvents: eventResult.rows,
    achievements: achievementResult.rows,
    campusFeed: feedResult.rows,
    courses: courseResult.rows,
  } })
})

export default router
