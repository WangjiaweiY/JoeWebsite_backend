import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getProfile);
router.put('/', authMiddleware, updateProfile);

export default router;

