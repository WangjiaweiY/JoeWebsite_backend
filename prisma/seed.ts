import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('开始初始化数据库...');

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
    },
  });
  console.log('✓ 创建管理员用户:', user.username);

  // 创建个人信息
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Joe',
      nameEn: 'Joe',
      title: '全栈开发工程师',
      titleEn: 'Full Stack Developer',
      bio: '热爱编程，专注于 Web 全栈开发。擅长 Vue、React、Node.js 等技术栈。',
      bioEn: 'Passionate about programming, focusing on full-stack web development. Skilled in Vue, React, Node.js, etc.',
      email: 'joe@example.com',
      location: '中国',
      locationEn: 'China',
    },
  });
  console.log('✓ 创建个人信息:', profile.name);

  // 创建技能分类
  const categories = await Promise.all([
    prisma.skillCategory.create({
      data: {
        name: '前端开发',
        nameEn: 'Frontend',
        icon: 'code',
        sortOrder: 1,
      },
    }),
    prisma.skillCategory.create({
      data: {
        name: '后端开发',
        nameEn: 'Backend',
        icon: 'server',
        sortOrder: 2,
      },
    }),
    prisma.skillCategory.create({
      data: {
        name: '数据库',
        nameEn: 'Database',
        icon: 'database',
        sortOrder: 3,
      },
    }),
    prisma.skillCategory.create({
      data: {
        name: '工具 & 其他',
        nameEn: 'Tools & Others',
        icon: 'tool',
        sortOrder: 4,
      },
    }),
  ]);
  console.log('✓ 创建技能分类:', categories.length, '个');

  // 创建技能
  const skills = await Promise.all([
    // 前端
    prisma.skill.create({
      data: {
        categoryId: categories[0].id,
        name: 'Vue.js',
        level: 90,
        color: '#42b883',
        sortOrder: 1,
      },
    }),
    prisma.skill.create({
      data: {
        categoryId: categories[0].id,
        name: 'React',
        level: 85,
        color: '#61dafb',
        sortOrder: 2,
      },
    }),
    prisma.skill.create({
      data: {
        categoryId: categories[0].id,
        name: 'TypeScript',
        level: 88,
        color: '#3178c6',
        sortOrder: 3,
      },
    }),
    // 后端
    prisma.skill.create({
      data: {
        categoryId: categories[1].id,
        name: 'Node.js',
        level: 85,
        color: '#339933',
        sortOrder: 1,
      },
    }),
    prisma.skill.create({
      data: {
        categoryId: categories[1].id,
        name: 'Express',
        level: 90,
        color: '#000000',
        sortOrder: 2,
      },
    }),
    // 数据库
    prisma.skill.create({
      data: {
        categoryId: categories[2].id,
        name: 'MySQL',
        level: 85,
        color: '#4479a1',
        sortOrder: 1,
      },
    }),
    prisma.skill.create({
      data: {
        categoryId: categories[2].id,
        name: 'Redis',
        level: 75,
        color: '#dc382d',
        sortOrder: 2,
      },
    }),
    // 工具
    prisma.skill.create({
      data: {
        categoryId: categories[3].id,
        name: 'Git',
        level: 90,
        color: '#f05032',
        sortOrder: 1,
      },
    }),
    prisma.skill.create({
      data: {
        categoryId: categories[3].id,
        name: 'Docker',
        level: 75,
        color: '#2496ed',
        sortOrder: 2,
      },
    }),
  ]);
  console.log('✓ 创建技能:', skills.length, '个');

  // 创建项目示例
  const project = await prisma.project.create({
    data: {
      title: '个人网站',
      titleEn: 'Personal Website',
      description: '基于 Vue3 + Express 的个人网站，包含前台展示和后台管理系统。',
      descriptionEn: 'Personal website based on Vue3 + Express, including frontend display and backend management system.',
      content: '## 项目介绍\n\n这是一个完整的个人网站项目...',
      contentEn: '## Project Introduction\n\nThis is a complete personal website project...',
      tags: 'Vue3,TypeScript,Express,MySQL',
      techStack: 'Vue3,Vite,Naive UI,Express,Prisma,MySQL',
      isFeatured: true,
      sortOrder: 1,
    },
  });
  console.log('✓ 创建项目示例:', project.title);

  // 创建经历示例
  const experience = await prisma.experience.create({
    data: {
      type: 'WORK',
      title: '全栈开发工程师',
      titleEn: 'Full Stack Developer',
      company: '某科技公司',
      companyEn: 'Tech Company',
      location: '北京',
      locationEn: 'Beijing',
      description: '负责公司核心产品的前后端开发工作...',
      descriptionEn: 'Responsible for frontend and backend development of core products...',
      startDate: new Date('2022-01-01'),
      isCurrent: true,
      sortOrder: 1,
    },
  });
  console.log('✓ 创建经历示例:', experience.title);

  // 创建博客文章示例
  const post = await prisma.post.create({
    data: {
      title: '欢迎来到我的博客',
      titleEn: 'Welcome to My Blog',
      summary: '这是我的第一篇博客文章...',
      summaryEn: 'This is my first blog post...',
      content: '## 欢迎\n\n欢迎来到我的个人博客！',
      contentEn: '## Welcome\n\nWelcome to my personal blog!',
      tags: '随笔',
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  console.log('✓ 创建博客文章示例:', post.title);

  // 创建或更新网站配置
  const settings = await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: "Joe's Website",
        type: 'string',
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: '个人网站 - 记录生活，分享技术',
        type: 'string',
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: 'enable_comments' },
      update: {},
      create: {
        key: 'enable_comments',
        value: 'true',
        type: 'boolean',
      },
    }),
  ]);
  console.log('✓ 创建/更新网站配置:', settings.length, '项');

  // 创建最近7天的访问统计数据
  const today = new Date();
  const siteStatsData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    siteStatsData.push({
      date: date,
      visits: Math.floor(Math.random() * 100) + 50, // 50-150随机访问量
      uniqueVisitors: Math.floor(Math.random() * 80) + 30, // 30-110随机独立访客
      pageViews: Math.floor(Math.random() * 200) + 100, // 100-300随机页面浏览量
    });
  }

  await prisma.siteStats.createMany({
    data: siteStatsData,
    skipDuplicates: true,
  });
  console.log('✓ 创建访问统计数据:', siteStatsData.length, '天');

  console.log('✅ 数据库初始化完成！');
  console.log('\n默认管理员账号:');
  console.log('用户名: admin');
  console.log('密码: admin123');
  console.log('\n⚠️ 请在生产环境中修改默认密码！');
}

main()
  .catch((e) => {
    console.error('❌ 初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

