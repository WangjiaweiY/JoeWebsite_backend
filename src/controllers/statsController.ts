import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getStats = async (req: Request, res: Response) => {
  try {
    // 获取总体统计
    const [
      totalProjects,
      totalPosts,
      totalComments,
      publishedPosts,
      totalViews,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.post.count(),
      prisma.comment.count({ where: { isApproved: true } }),
      prisma.post.count({ where: { isPublished: true } }),
      prisma.project.aggregate({ _sum: { views: true } }),
    ]);

    // 获取最近30天的访问统计
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentStats = await prisma.siteStats.findMany({
      where: {
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { date: 'asc' },
    });

    return success(res, {
      totalProjects,
      totalPosts,
      publishedPosts,
      totalComments,
      totalViews: totalViews._sum.views || 0,
      recentStats,
    });
  } catch (err) {
    return error(res, 'Failed to get stats', 500);
  }
};

export const recordVisit = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 更新或创建今天的统计
    const stats = await prisma.siteStats.upsert({
      where: { date: today },
      update: {
        visits: { increment: 1 },
        pageViews: { increment: 1 },
      },
      create: {
        date: today,
        visits: 1,
        uniqueVisitors: 1,
        pageViews: 1,
      },
    });

    return success(res, stats);
  } catch (err) {
    return error(res, 'Failed to record visit', 500);
  }
};

