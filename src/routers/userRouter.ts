import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.ts";

const router = Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
