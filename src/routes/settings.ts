import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getSettings);
router.put('/', authMiddleware, updateSettings);

export default router;

