import express from 'express';
import { serverRouter } from './server/route/server-http.route';
import { errorHandler } from './common/error/error-handler';
import { logRouter } from './log/route/log-http.route';
import { containerRouter } from './container/route/container-http.route';
import { dashboardRouter } from './dashboard/route/dashboard-http.route';

const app = express();

// 기본 미들웨어 설정
app.use(express.json());

// API 라우트 등록
app.use('/api/server', serverRouter);
app.use('/api/container', containerRouter);
app.use('/api/log', logRouter);
app.use('/api/dashboard', dashboardRouter);

// 공통 에러 핸들러 등록
app.use(errorHandler);
//
export default app;
