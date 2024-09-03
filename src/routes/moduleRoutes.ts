import { Router } from "express";
import { createModule } from "controllers/moduleController.ts";

const router = Router();

router.route("/").post(createModule);

export default router;
