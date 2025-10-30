import { Router, Request, Response } from "express";
import { authController } from "./authController";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.post("/login", authController.login);

router.get("/verify-token", requireAuth, (req: Request, res: Response) => {
  res.json({ valid: true, role: (req as any).admin.role });
});

export default router;
