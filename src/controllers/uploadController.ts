import { Request, Response } from 'express';
import { success, error } from '../utils/response';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return error(res, '请选择要上传的文件');
    }

    // 返回文件访问URL
    const fileUrl = `/uploads/${req.file.filename}`;

    return success(res, {
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    }, '上传成功');
  } catch (err) {
    return error(res, '上传失败', 500);
  }
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return error(res, '请选择要上传的文件');
    }

    // 返回所有文件的访问URL
    const filesData = files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));

    return success(res, filesData, `成功上传 ${files.length} 个文件`);
  } catch (err) {
    return error(res, '上传失败', 500);
  }
};

