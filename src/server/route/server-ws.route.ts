import { WebSocket } from 'ws';
import { ServerWsController } from '../controller/server-ws.controller';

export class ServerWsRouter {
    private serverWsController: ServerWsController = new ServerWsController();

    public handle = (ws: WebSocket, pathname: string) => {
        // 라우팅 테이블
        const routes: Record<string, (ws: WebSocket) => void> = {
            '/usage': this.serverWsController.handleServerUsageStream,
            '/network': this.serverWsController.hadnleNetworkUsageStream,
        };

        const handler = routes[pathname];

        if (handler) {
            handler(ws);
        } else {
            ws.close(1000, 'Unknown WebSocket sub-route');
        }
    };
}
