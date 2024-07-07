const { Router } = require("express");
const {
    getScore,
    getAllScores,
    updateScore,
    addScore,
    deleteScore,
} = require("../controllers/scoreController.cjs");

const router = Router();

router.route("/:id").get(getScore).patch(updateScore).delete(deleteScore);
router.route("/").get(getAllScores).post(addScore);

module.exports = router;
