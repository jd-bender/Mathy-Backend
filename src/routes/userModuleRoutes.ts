import { Router } from "express";
import { createUserModule } from "controllers/userModuleController.ts";

const router = Router();

router.route("/").post(createUserModule);

export default router;
