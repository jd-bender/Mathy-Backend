import { Router } from "express";
import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "controllers/userController.ts";

const router = Router();

router.route("/").post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
