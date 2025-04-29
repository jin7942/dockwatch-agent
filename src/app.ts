import express from 'express';
import { serverRouter } from './server/route/server-http.route';
import { errorHandler } from './common/error/error-handler';

const app = express();

// 기본 미들웨어 설정
app.use(express.json());

// API 라우트 등록
app.use('/api/server', serverRouter);

// 공통 에러 핸들러 등록
app.use(errorHandler);

export default app;
