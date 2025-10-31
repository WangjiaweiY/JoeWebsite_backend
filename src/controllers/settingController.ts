import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { success, error } from '../utils/response';

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.siteSetting.findMany();

    // 转换为键值对对象
    const settingsObj: Record<string, any> = {};
    settings.forEach((setting) => {
      let value: any = setting.value;
      
      // 根据类型转换值
      if (setting.type === 'number') {
        value = value ? parseFloat(value) : null;
      } else if (setting.type === 'boolean') {
        value = value === 'true';
      } else if (setting.type === 'json') {
        try {
          value = value ? JSON.parse(value) : null;
        } catch (e) {
          value = null;
        }
      }
      
      settingsObj[setting.key] = value;
    });

    return success(res, settingsObj);
  } catch (err) {
    return error(res, 'Failed to get settings', 500);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = req.body;

    // 批量更新设置
    const promises = Object.entries(settings).map(([key, value]) => {
      let type = 'string';
      let stringValue = String(value);

      if (typeof value === 'number') {
        type = 'number';
      } else if (typeof value === 'boolean') {
        type = 'boolean';
      } else if (typeof value === 'object') {
        type = 'json';
        stringValue = JSON.stringify(value);
      }

      return prisma.siteSetting.upsert({
        where: { key },
        update: {
          value: stringValue,
          type,
        },
        create: {
          key,
          value: stringValue,
          type,
        },
      });
    });

    await Promise.all(promises);

    return success(res, null, 'Settings updated successfully');
  } catch (err) {
    return error(res, 'Failed to update settings', 500);
  }
};

