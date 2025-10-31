import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getSkills = async (req: Request, res: Response) => {
  try {
    // 获取所有分类及其技能
    const categories = await prisma.skillCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        skills: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return success(res, categories);
  } catch (err) {
    return error(res, 'Failed to get skills', 500);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    return success(res, categories);
  } catch (err) {
    return error(res, 'Failed to get categories', 500);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const category = await prisma.skillCategory.create({
      data,
    });

    return success(res, category, 'Category created successfully');
  } catch (err) {
    return error(res, 'Failed to create category', 500);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const category = await prisma.skillCategory.update({
      where: { id: parseInt(id) },
      data,
    });

    return success(res, category, 'Category updated successfully');
  } catch (err) {
    return error(res, 'Failed to update category', 500);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.skillCategory.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Category deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete category', 500);
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const skill = await prisma.skill.create({
      data,
    });

    return success(res, skill, 'Skill created successfully');
  } catch (err) {
    return error(res, 'Failed to create skill', 500);
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const skill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data,
    });

    return success(res, skill, 'Skill updated successfully');
  } catch (err) {
    return error(res, 'Failed to update skill', 500);
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({
      where: { id: parseInt(id) },
    });

    return success(res, null, 'Skill deleted successfully');
  } catch (err) {
    return error(res, 'Failed to delete skill', 500);
  }
};

