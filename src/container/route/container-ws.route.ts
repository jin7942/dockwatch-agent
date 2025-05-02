import { ContainerWsController } from './../controller/container-ws.controller';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';

export class ContainerWsRouter {
    private containerWsController = new ContainerWsController();

    public handle = (ws: WebSocket, pathname: string, req: IncomingMessage) => {
        // 라우팅 테이블
        const routes: Record<string, (ws: WebSocket, req: IncomingMessage) => void> = {
            '/resource': this.containerWsController.handleContainerUsageStream,
        };

        const handler = routes[pathname];

        if (handler) {
            handler(ws, req);
        } else {
            ws.close(1000, 'Unknown WebSocket sub-route');
        }
    };
}
