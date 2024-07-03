import { Router } from 'express';
import { getUser, getAllUsers, updateUser, addUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

router.route('/')
    .get(getAllUsers)
    .post(addUser);

export default router;