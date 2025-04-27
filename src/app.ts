import express from 'express';
import { serverRouter } from './server/route/server.route';

const app = express();

// 기본 미들웨어 설정
app.use(express.json());

// API 라우트 등록
app.use('/api/server', serverRouter);

export default app;
