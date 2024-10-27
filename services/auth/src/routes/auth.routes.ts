import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';

const authController = new AuthController();
const router = Router();

router.post('/generate-token', authController.generateUserToken  );
router.post('/verify-token', authController.decodedToken);
router.post('/refresh-token', authController.refreshAccessToken);
export default router;