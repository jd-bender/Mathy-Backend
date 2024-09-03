import { Router } from "express";
import {
    createUserModule,
    getAllUserModules,
    updateUserModule,
    deleteUserModule,
} from "controllers/userModuleController.ts";

const router = Router();

router.route("/").post(createUserModule).get(getAllUserModules);
router.route("/:id").patch(updateUserModule).delete(deleteUserModule);

export default router;
