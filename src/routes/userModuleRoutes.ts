import { Router } from "express";
import {
    createUserModule,
    getAllUserModules,
} from "controllers/userModuleController.ts";

const router = Router();

router.route("/").post(createUserModule).get(getAllUserModules);

export default router;
