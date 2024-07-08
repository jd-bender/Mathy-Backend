const { Router } = require("express");
const {
    getScore,
    getAllScores,
    updateScore,
    addScore,
    deleteScore,
    deleteAllScores,
} = require("../controllers/scoreController.cjs");
const { protect, restrictTo } = require("../controllers/authController.cjs");

const router = Router();

router
    .route("/:id")
    .get(protect, getScore)
    .patch(protect, updateScore)
    .delete(protect, restrictTo("admin"), deleteScore);
router
    .route("/")
    .get(protect, getAllScores)
    .post(protect, addScore)
    .delete(protect, deleteAllScores);

module.exports = router;
