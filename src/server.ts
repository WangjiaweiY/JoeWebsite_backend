import express from 'express';
import cors from 'cors';
import { config } from './config';
import logger from './utils/logger';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// 中间件
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// 静态文件服务（上传的文件）
app.use('/uploads', express.static(config.upload.dir));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 路由
app.use('/api', routes);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(config.port, () => {
  logger.info(`🚀 Server is running on port ${config.port}`);
  logger.info(`📝 Environment: ${config.nodeEnv}`);
  logger.info(`🌐 CORS origin: ${config.cors.origin}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

