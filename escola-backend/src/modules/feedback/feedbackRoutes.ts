import { Router } from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "./feedbackController";
import { upload } from "../../utils/multer";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.get("/", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.post("/", requireAuth, upload.single("image"), createFeedback);
router.put("/:id", requireAuth, upload.single("image"), updateFeedback);
router.delete("/:id", requireAuth, deleteFeedback);

export default router;
