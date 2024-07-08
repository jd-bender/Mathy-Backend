const { Router } = require("express");
const {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers,
} = require("../controllers/userController.cjs");
const { signUp, login, protect } = require("../controllers/authController.cjs");

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

router.route("/:id").get(getUser).patch(protect, updateUser).delete(deleteUser);

router.route("/").get(protect, getAllUsers).delete(protect, deleteAllUsers);

module.exports = router;
