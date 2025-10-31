# Personal Website Backend

基于 Express + TypeScript + Prisma + MySQL 的后端 API 服务。

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接等信息
```

### 数据库迁移
```bash
# 生成 Prisma Client
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# 运行种子数据（可选）
npm run prisma:seed

# 打开 Prisma Studio 可视化管理数据库
npm run prisma:studio
```

### 启动开发服务器
```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

## 📁 项目结构

```
backend/
├── src/
│   ├── controllers/     # 控制器层
│   ├── routes/          # 路由定义
│   ├── middlewares/     # 中间件
│   ├── services/        # 业务逻辑层
│   ├── utils/           # 工具函数
│   ├── types/           # TypeScript 类型定义
│   ├── config/          # 配置文件
│   └── server.ts        # 入口文件
├── prisma/
│   ├── schema.prisma    # 数据库模型定义
│   └── seed.ts          # 种子数据
└── package.json
```

## 🔌 API 接口

### 认证
- `POST /api/auth/login` - 管理员登录
- `POST /api/auth/logout` - 退出登录
- `GET /api/auth/me` - 获取当前用户信息

### 个人信息
- `GET /api/profile` - 获取个人信息
- `PUT /api/profile` - 更新个人信息（需认证）

### 项目
- `GET /api/projects` - 获取项目列表
- `GET /api/projects/:id` - 获取项目详情
- `POST /api/projects` - 创建项目（需认证）
- `PUT /api/projects/:id` - 更新项目（需认证）
- `DELETE /api/projects/:id` - 删除项目（需认证）

### 经历
- `GET /api/experiences` - 获取经历列表
- `POST /api/experiences` - 创建经历（需认证）
- `PUT /api/experiences/:id` - 更新经历（需认证）
- `DELETE /api/experiences/:id` - 删除经历（需认证）

### 技能
- `GET /api/skills` - 获取技能列表（按分类）
- `POST /api/skills` - 创建技能（需认证）
- `PUT /api/skills/:id` - 更新技能（需认证）
- `DELETE /api/skills/:id` - 删除技能（需认证）

### 博客
- `GET /api/posts` - 获取文章列表
- `GET /api/posts/:id` - 获取文章详情
- `POST /api/posts` - 创建文章（需认证）
- `PUT /api/posts/:id` - 更新文章（需认证）
- `DELETE /api/posts/:id` - 删除文章（需认证）

### 留言
- `GET /api/comments` - 获取留言列表
- `POST /api/comments` - 创建留言
- `POST /api/comments/:id/reply` - 回复留言（需认证）
- `DELETE /api/comments/:id` - 删除留言（需认证）

### 统计
- `GET /api/stats` - 获取网站统计数据
- `POST /api/stats/visit` - 记录访问

### 配置
- `GET /api/settings` - 获取网站配置
- `PUT /api/settings` - 更新网站配置（需认证）

## 🔐 认证

使用 JWT (JSON Web Token) 进行身份认证。

认证请求需要在 Header 中添加：
```
Authorization: Bearer <token>
```

## 🛠️ 开发

### 构建
```bash
npm run build
```

### 生产环境运行
```bash
npm start
```

## 📦 部署

### 环境要求
- Node.js >= 18
- MySQL >= 8.0

### 部署步骤
1. 安装依赖：`npm install`
2. 配置 .env 文件
3. 运行数据库迁移：`npm run prisma:migrate`
4. 构建项目：`npm run build`
5. 启动服务：`npm start`

建议使用 PM2 进行进程管理：
```bash
pm2 start dist/server.js --name personal-website-api
```

