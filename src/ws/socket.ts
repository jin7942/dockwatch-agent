import { Server as HttpServer } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { ServerWsController } from '../server/controller/server-ws.controller';

// TODO: 수정해야됨
const serverWsController = new ServerWsController();

const domainRouter: Record<string, (ws: WebSocket, pathname: string) => void> = {
    '/ws/server': serverWsController.handle,
    // '/ws/container': containerWsController.handle (추후)
};

export function initWebSocketServer(server: HttpServer) {
    const wss = new WebSocketServer({ server, path: '/ws' });

    wss.on('connection', (ws, request) => {
        const pathname = new URL(request.url!, `http://${request.headers.host}`).pathname;

        const handler = domainRouter[pathname];
        if (handler) {
            handler(ws, pathname);
        } else {
            ws.close(1000, 'Unknown WebSocket domain route');
        }
    });

    console.log('WebSocket server initialized.');
}
