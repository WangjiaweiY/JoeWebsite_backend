import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const where = type ? { type: type as any } : {};

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: [
        { isCurrent: 'desc' },
        { startDate: 'desc' },
        { sortOrder: 'desc' },
      ],
    });

    return success(res, experiences);
  } catch (err) {
    return error(res, 'Failed to get experiences', 500);
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const experience = await prisma.experience.create({
      data,
    });

    return success(res, experience, 'Experience created successfully');
  } catch (err) {
    return error(res, 'Failed to create experience', 500);
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data,
    });

    return success(res, experience, 'Experience updated successfully');
  } catch (err) {
    return error(res, 'Failed to update experience', 500);
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Experience deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete experience', 500);
  }
};

