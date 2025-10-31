import { Router } from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';
import projectRoutes from './projects';
import experienceRoutes from './experiences';
import skillRoutes from './skills';
import postRoutes from './posts';
import commentRoutes from './comments';
import statsRoutes from './stats';
import settingRoutes from './settings';
import uploadRoutes from './upload';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/experiences', experienceRoutes);
router.use('/skills', skillRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/stats', statsRoutes);
router.use('/settings', settingRoutes);
router.use('/upload', uploadRoutes);

export default router;

