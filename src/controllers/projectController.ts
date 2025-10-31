import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error, notFound } from '../utils/response';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { featured } = req.query;

    const where = featured === 'true' ? { isFeatured: true } : {};

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return success(res, projects);
  } catch (err) {
    return error(res, 'Failed to get projects', 500);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return notFound(res, 'Project not found');
    }

    // 增加浏览量
    await prisma.project.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } },
    });

    return success(res, project);
  } catch (err) {
    return error(res, 'Failed to get project', 500);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const project = await prisma.project.create({
      data,
    });

    return success(res, project, 'Project created successfully');
  } catch (err) {
    return error(res, 'Failed to create project', 500);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data,
    });

    return success(res, project, 'Project updated successfully');
  } catch (err) {
    return error(res, 'Failed to update project', 500);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Project deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete project', 500);
  }
};

