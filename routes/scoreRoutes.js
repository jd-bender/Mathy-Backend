import { Router } from 'express';
import { getScore, getAllScores, addScore } from '../controllers/scoreController.js';

const router = Router();

router.route('/:id').get(getScore);

router.route('/')
    .get(getAllScores)
    .post(addScore);

export default router;