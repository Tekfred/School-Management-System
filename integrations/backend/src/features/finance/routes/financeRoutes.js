import { Router } from "express";
import { query } from "../../../config/database.js";
const router = Router();
router.get("/overview", async (req, res) => {
  const account = await query(`SELECT s.name, s.student_number AS id, s.program, s.semester,
    f.total_fees AS "totalFees", f.total_paid AS "totalPaid", f.outstanding,
    f.due_date AS "dueDate", f.status
    FROM finance.fee_accounts f JOIN core.students s ON s.id = f.student_id
    WHERE f.is_primary = TRUE ORDER BY f.updated_at DESC LIMIT 1`);
  if (!account.rowCount)
    return res.json({
      data: {
        student: null,
        summary: null,
        breakdown: [],
        history: [],
        upcoming: [],
      },
    });
  const student = account.rows[0];
  const [items, payments] = await Promise.all([
    query(
      `SELECT id, label, amount, paid FROM finance.fee_items WHERE fee_account_id = (SELECT id FROM finance.fee_accounts WHERE is_primary = TRUE LIMIT 1) ORDER BY id`,
    ),
    query(`SELECT receipt_number AS id, COALESCE(paid_at, created_at) AS date, description AS desc, method, reference AS ref, amount, status
      FROM finance.payments WHERE student_id = (SELECT student_id FROM finance.fee_accounts WHERE is_primary = TRUE LIMIT 1) ORDER BY COALESCE(paid_at, created_at) DESC`),
  ]);
  res.json({
    data: {
      student: { name: student.name, id: student.id, program: student.program, semester: student.semester },
      summary: {
        totalFees: Number(student.totalFees),
        totalPaid: Number(student.totalPaid),
        outstanding: Number(student.outstanding),
        dueDate: student.dueDate,
        status: student.status,
      },
      breakdown: items.rows,
      history: payments.rows,
      upcoming: items.rows
        .filter((item) => !item.paid)
        .map((item) => ({
          label: item.label,
          amount: Number(item.amount),
          due: student.dueDate,
        })),
    },
  });
});
export default router;
