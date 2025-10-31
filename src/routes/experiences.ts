import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getExperiences);
router.post('/', authMiddleware, createExperience);
router.put('/:id', authMiddleware, updateExperience);
router.delete('/:id', authMiddleware, deleteExperience);

export default router;

