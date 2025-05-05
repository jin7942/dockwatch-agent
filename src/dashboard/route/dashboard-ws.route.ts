import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { DashboardWsController } from '../controller/dashboard-ws.controller';

export class DashboardWsRouter {
    private dashboardWsController: DashboardWsController = new DashboardWsController();

    public handle = (ws: WebSocket, pathname: string, req: IncomingMessage) => {
        // 라우팅 테이블
        const routes: Record<string, (ws: WebSocket, req: IncomingMessage) => void> = {
            '/info': this.dashboardWsController.handleSysUsage,
        };

        const handler = routes[pathname];

        if (handler) {
            handler(ws, req);
        } else {
            ws.close(1000, 'Unknown WebSocket sub-route');
        }
    };
}
