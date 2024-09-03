import { Router } from "express";
import { createModule, getAllModules } from "controllers/moduleController.ts";

const router = Router();

router.route("/").post(createModule).get(getAllModules);

export default router;
