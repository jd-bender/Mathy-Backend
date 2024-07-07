const { Router } = require("express");
const {
    getScore,
    getAllScores,
    updateScore,
    addScore,
    deleteScore,
    deleteAllScores,
} = require("../controllers/scoreController.cjs");

const router = Router();

router.route("/:id").get(getScore).patch(updateScore).delete(deleteScore);
router.route("/").get(getAllScores).post(addScore).delete(deleteAllScores);

module.exports = router;
