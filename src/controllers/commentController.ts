import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId, approved } = req.query;

    const where: any = { parentId: null }; // 只获取顶级评论

    if (postId) {
      where.postId = postId ? parseInt(postId as string) : null;
    }

    if (approved === 'true') {
      where.isApproved = true;
    }

    const comments = await prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return success(res, comments);
  } catch (err) {
    return error(res, 'Failed to get comments', 500);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // 获取 IP 地址
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const comment = await prisma.comment.create({
      data: {
        ...data,
        ipAddress: ipAddress as string,
        userAgent,
      },
    });

    return success(res, comment, 'Comment submitted successfully');
  } catch (err) {
    return error(res, 'Failed to create comment', 500);
  }
};

export const replyComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { reply },
    });

    return success(res, comment, 'Reply added successfully');
  } catch (err) {
    return error(res, 'Failed to reply comment', 500);
  }
};

export const approveComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { isApproved: true },
    });

    return success(res, comment, 'Comment approved successfully');
  } catch (err) {
    return error(res, 'Failed to approve comment', 500);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Comment deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete comment', 500);
  }
};

