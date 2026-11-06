import { Router } from "express";
import { HttpError } from "../../../middleware/errors.js";
const router = Router();
router.post("/login", async (req, res) => {
  // Authentication is intentionally a secure integration point, not a demo password check.
  // Add password-hash verification and signed, expiring tokens before enabling real accounts.
  throw new HttpError(
    501,
    "AUTH_NOT_CONFIGURED",
    "Authentication has not been configured on this backend yet.",
  );
});
export default router;
