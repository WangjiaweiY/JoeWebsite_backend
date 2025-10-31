import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;

