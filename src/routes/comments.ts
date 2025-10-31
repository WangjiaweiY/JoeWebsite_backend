import { Router } from 'express';
import {
  getComments,
  createComment,
  replyComment,
  approveComment,
  deleteComment,
} from '../controllers/commentController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getComments);
router.post('/', createComment);
router.post('/:id/reply', authMiddleware, replyComment);
router.post('/:id/approve', authMiddleware, approveComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;

