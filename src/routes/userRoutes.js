import { Router } from "express";
import {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers,
} from "../controllers/userController.js";
import { signUp, login } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.route("/").get(getAllUsers).delete(deleteAllUsers);

export default router;
