import { Router } from "express";
import UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/', UserController.getAll);
router.get('/:uid', UserController.getUserById);
router.post('/', UserController.createUser);
router.delete('/:uid', UserController.deleteUser);

export default router;