import { Router } from "express";
import { promotionController } from "./promotionController";
import { upload } from "../../utils/multer";
import { requireAuth } from "../../middlewares/auth";

const router = Router();

router.get("/", promotionController.getAll);
router.get("/:id", promotionController.getById);

router.post(
  "/",
  requireAuth,
  upload.single("image"),
  promotionController.create
);
router.put(
  "/:id",
  requireAuth,
  upload.single("image"),
  promotionController.update
);

router.delete("/:id", requireAuth, promotionController.remove);
router.delete("/clean/expired", requireAuth, promotionController.cleanExpired);

export default router;
