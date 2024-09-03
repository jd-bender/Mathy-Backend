import { Router } from "express";
import { createUser } from "controllers/userController.ts";

const router = Router();

router.route("/").post(createUser);

export default router;
