import { Server as HttpServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { ServerWsRouter } from '../server/route/server-ws.route';
import { LogWsRouter } from '../log/route/log-ws.route';
import { IncomingMessage } from 'http';
import { ContainerWsRouter } from '../container/route/container-ws.route';
import { DashboardWsRouter } from '../dashboard/route/dashboard-ws.route';

/**
 * 커넥션 헬스체크용 커스텀 WebSocket 타입
 */
interface ExtendedWebSocket extends WebSocket {
    isAlive: boolean;
}

// 도메인별 컨트롤러
const serverWsRouter = new ServerWsRouter();
const logWsRouter = new LogWsRouter();
const containerWsRouter = new ContainerWsRouter();
const dashboardWsRouter = new DashboardWsRouter();

/**
 * WebSocket 도메인 라우팅 테이블
 */
const domainRouter: Record<
    string,
    (ws: WebSocket, pathname: string, req: IncomingMessage) => void
> = {
    '/ws/server': serverWsRouter.handle,
    '/ws/log': logWsRouter.handle,
    '/ws/container': containerWsRouter.handle,
    '/ws/dashboard': dashboardWsRouter.handle,
};

/**
 * 전역 WebSocket 서버를 초기화하고 관리
 * - 클라이언트 연결 수락
 * - 도메인별 핸들러로 요청 분배
 * - Heartbeat(핑-퐁) 체크를 통해 dead connection 정리
 * - 클라이언트 메시지 차단
 *
 * @param server - HTTP 서버 인스턴스
 */
export const initWebSocketServer = (server: HttpServer) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws, request) => {
        const extWs = ws as ExtendedWebSocket;

        extWs.on('pong', () => {
            extWs.isAlive = true;
        });

        // 클라이언트 메시지 수신 차단
        extWs.on('message', (message) => {
            console.warn('Unexpected client message received:', message.toString());
            extWs.close(1008, 'Dockwatch agent does not accept client messages');
        });

        const pathname = new URL(request.url!, `http://${request.headers.host}`).pathname;

        // /ws/domain 까지만 라우팅 (ex: '/ws/server/usage' -> '/ws/server')
        const domainPrefix = pathname.split('/').slice(0, 3).join('/');
        // /ws/domain/subdomain 에서 sub-domain 만 추출
        const subPath = pathname.substring(domainPrefix.length);

        const handler = domainRouter[domainPrefix];
        if (handler) {
            handler(extWs, subPath, request);
        } else {
            extWs.close(1000, 'Unknown WebSocket domain route');
        }
    });

    // Heartbeat 주기적으로 dead connection 감지 및 종료
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            const extWs = ws as ExtendedWebSocket;
            if (extWs.isAlive === false) {
                console.log('Dead connection detected, terminating...');
                return extWs.terminate();
            }

            extWs.isAlive = false;
            extWs.ping();
        });
    }, 10000); // 10초 간격

    wss.on('close', () => {
        clearInterval(interval);
    });

    console.log('WebSocket server initialized.');
};
