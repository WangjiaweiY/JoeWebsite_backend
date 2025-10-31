import { Router } from 'express';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../utils/upload';

const router = Router();

// 单文件上传（需要认证）
router.post('/image', authMiddleware, upload.single('file'), uploadImage);

// 多文件上传（需要认证）
router.post('/images', authMiddleware, upload.array('files', 10), uploadMultipleImages);

export default router;

