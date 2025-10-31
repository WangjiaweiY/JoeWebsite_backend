import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';
import { success, error, unauthorized } from '../utils/response';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return error(res, 'Username and password are required');
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return unauthorized(res, 'Invalid username or password');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return unauthorized(res, 'Invalid username or password');
    }

    // 生成 token
    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    // 返回用户信息和 token
    return success(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return error(res, 'Login failed', 500);
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return unauthorized(res);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return unauthorized(res, 'User not found');
    }

    return success(res, user);
  } catch (err) {
    return error(res, 'Failed to get user info', 500);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return error(res, 'Old password and new password are required');
    }

    if (newPassword.length < 6) {
      return error(res, 'New password must be at least 6 characters');
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return unauthorized(res, 'User not found');
    }

    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return error(res, 'Old password is incorrect');
    }

    // 更新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return success(res, null, 'Password updated successfully');
  } catch (err) {
    return error(res, 'Failed to update password', 500);
  }
};

