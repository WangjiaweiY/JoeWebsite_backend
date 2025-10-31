import { Router } from 'express';
import { getStats, recordVisit } from '../controllers/statsController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, getStats);
router.post('/visit', recordVisit);

export default router;

