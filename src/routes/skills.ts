import { Router } from 'express';
import {
  getSkills,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getSkills);
router.get('/categories', getCategories);
router.post('/categories', authMiddleware, createCategory);
router.put('/categories/:id', authMiddleware, updateCategory);
router.delete('/categories/:id', authMiddleware, deleteCategory);
router.post('/', authMiddleware, createSkill);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, deleteSkill);

export default router;

