import { Router } from "express";
import { eventController } from "./eventController";
import { upload } from "../../utils/multer";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.get("/", eventController.getAll);
router.get("/categories", eventController.getCategories);
router.get("/:id", eventController.getById);

router.post(
  "/",
  requireAuth,
  upload.single("image"),
  eventController.requireFile,
  eventController.create
);

router.put(
  "/:id",
  requireAuth,
  upload.single("image"),
  eventController.forbidTextImage,
  eventController.update
);

router.delete("/:id", requireAuth, eventController.remove);

export default router;
