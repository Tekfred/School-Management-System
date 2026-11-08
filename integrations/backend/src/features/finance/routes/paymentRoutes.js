import { Router } from "express";
import { query } from "../../../config/database.js";
import { HttpError } from "../../../middleware/errors.js";
export function createPaymentRoutes({ broadcast }) {
  const router = Router();
  router.post("/", async (req, res) => {
    const amount = Number(req.body?.amount);
    const method = req.body?.method;
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !["Mobile Money", "Bank Transfer", "Card"].includes(method)
    ) {
      throw new HttpError(
        400,
        "INVALID_PAYMENT",
        "Provide a positive amount and a supported payment method.",
      );
    }
    const account = await query(`SELECT outstanding FROM finance.fee_accounts WHERE is_primary = TRUE LIMIT 1`)
    if (!account.rowCount) throw new HttpError(404, "FEE_ACCOUNT_NOT_FOUND", "No active fee account was found.")
    if (amount > Number(account.rows[0].outstanding)) throw new HttpError(400, "AMOUNT_EXCEEDS_BALANCE", "Payment amount cannot exceed the outstanding balance.")
    const { rows } = await query(
      `INSERT INTO finance.payments (student_id, description, method, amount, status)
      SELECT student_id, 'Student fee payment', $1, $2, 'pending' FROM finance.fee_accounts WHERE is_primary = TRUE
      RETURNING id, amount, method, status, created_at`,
      [method, amount],
    );
    if (!rows.length)
      throw new HttpError(
        404,
        "FEE_ACCOUNT_NOT_FOUND",
        "No active fee account was found.",
      );
    broadcast({ type: "payment.created", data: rows[0] });
    res.status(201).json({ data: rows[0] });
  });
  return router;
}
