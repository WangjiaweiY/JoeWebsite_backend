import { Router } from 'express';
import { login, getMe, updatePassword } from '../controllers/authController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.put('/password', authMiddleware, updatePassword);

export default router;

