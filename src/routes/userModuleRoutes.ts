import { Router } from "express";
import { getAllUserModules } from "controllers/userModuleController.ts";

const router = Router();

router.route("/").get(getAllUserModules);

export default router;
