import { Router } from "express";
import { getAllModules } from "controllers/moduleController.ts";

const router = Router();

router.route("/").get(getAllModules);

export default router;
