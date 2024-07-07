const { Router } = require("express");
const {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers,
} = require("../controllers/userController");
const { signUp, login } = require("../controllers/authController");

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.route("/").get(getAllUsers).delete(deleteAllUsers);

module.exports = router;
