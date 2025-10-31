import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error, notFound } from '../utils/response';

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return notFound(res, 'Profile not found');
    }

    return success(res, profile);
  } catch (err) {
    return error(res, 'Failed to get profile', 500);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // 查找是否已存在
    const existing = await prisma.profile.findFirst();

    let profile;
    if (existing) {
      profile = await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    } else {
      profile = await prisma.profile.create({
        data,
      });
    }

    return success(res, profile, 'Profile updated successfully');
  } catch (err) {
    return error(res, 'Failed to update profile', 500);
  }
};

