import { Router } from "express";
import { query } from "../../../config/database.js";
const router = Router();
router.get("/", async (req, res) => {
  const { rows } =
    await query(`SELECT id, title, teacher, student_count AS students, progress, modules, category, icon
    FROM academic.courses WHERE is_active = TRUE ORDER BY title`);
  res.json({ data: rows });
});
export default router;
