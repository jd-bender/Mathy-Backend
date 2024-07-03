import { Router } from "express";
import {
    getScore,
    getAllScores,
    updateScore,
    addScore,
    deleteScore,
} from "../controllers/scoreController.js";

const router = Router();

router.route("/:id").get(getScore).patch(updateScore).delete(deleteScore);

router.route("/").get(getAllScores).post(addScore);

export default router;
