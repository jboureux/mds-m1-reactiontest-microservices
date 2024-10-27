// routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getUserById/:id', userController.getUserById);
export default router;
