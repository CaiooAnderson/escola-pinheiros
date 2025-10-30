import { Router } from "express";
import { faqController } from "./faqController";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.get("/", faqController.getAll);
router.get("/:id", faqController.getById);
router.post("/", requireAuth, faqController.create);
router.put("/:id", requireAuth, faqController.update);
router.delete("/:id", requireAuth, faqController.remove);

export default router;