import { LogWsController } from './../controller/log-ws.controller';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';

export class LogWsRouter {
    private logWsController: LogWsController = new LogWsController();

    public handle = (ws: WebSocket, pathname: string, req: IncomingMessage) => {
        // 라우팅 테이블
        const routes: Record<string, (ws: WebSocket, req: IncomingMessage) => void> = {
            '/stream': this.logWsController.handleLogStream,
        };

        const handler = routes[pathname];

        if (handler) {
            handler(ws, req);
        } else {
            ws.close(1000, 'Unknown WebSocket sub-route');
        }
    };
}
