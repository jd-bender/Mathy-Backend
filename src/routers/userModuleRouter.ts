import { Router } from "express";
import {
    createUserModule,
    getAllUserModules,
    getUserModule,
    updateUserModule,
    deleteUserModule,
} from "../controllers/userModuleController.ts";

const router = Router();

router.route("/").post(createUserModule).get(getAllUserModules);
router
    .route("/:id")
    .get(getUserModule)
    .patch(updateUserModule)
    .delete(deleteUserModule);

export default router;
