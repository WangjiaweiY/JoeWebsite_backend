import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error, notFound } from '../utils/response';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { published, page = '1', limit = '10' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where = published === 'true' ? { isPublished: true } : {};

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          titleEn: true,
          summary: true,
          summaryEn: true,
          cover: true,
          tags: true,
          isPublished: true,
          views: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    return success(res, {
      posts,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    return error(res, 'Failed to get posts', 500);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return notFound(res, 'Post not found');
    }

    // 增加浏览量
    await prisma.post.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } },
    });

    return success(res, post);
  } catch (err) {
    return error(res, 'Failed to get post', 500);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // 如果发布，设置发布时间
    if (data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const post = await prisma.post.create({
      data,
    });

    return success(res, post, 'Post created successfully');
  } catch (err) {
    return error(res, 'Failed to create post', 500);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // 如果从未发布变为发布，设置发布时间
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingPost && !existingPost.isPublished && data.isPublished && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data,
    });

    return success(res, post, 'Post updated successfully');
  } catch (err) {
    return error(res, 'Failed to update post', 500);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Post deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete post', 500);
  }
};

