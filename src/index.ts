import http from 'http';
import app from './app';
import { initWebSocketServer } from './ws/socket';

const PORT = process.env.PORT || 7000;

// 1. HTTP 서버 생성
const server = http.createServer(app);

// 2. WebSocket 서버 초기화
initWebSocketServer(server);

// 3. HTTP 서버 시작
server.listen(PORT, () => {
    console.log(`dockwatch-agent is running on port ${PORT}`);
});
