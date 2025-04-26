import express from 'express';
import { serverController } from './server/controller/server.controller';

const app = express();

// 기본 미들웨어 설정
app.use(express.json());

// API 라우트 등록
app.use('/api/server', serverController);

export default app;
