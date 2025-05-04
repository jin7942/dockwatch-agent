import { DashboardWsService } from '../service/dashboard-ws.service';
import { setWsIntervalSender } from '../../common/utils/ws-util';
import { WebSocket } from 'ws';
import os from 'os';

export class DashboardWsController {
    private dashboardWsService = new DashboardWsService();
    private hostname = os.hostname();

    public handleSysUsage = (ws: WebSocket): void => {
        setWsIntervalSender(
            ws,
            this.dashboardWsService.getSysUsageStream,
            'server-usage',
            this.hostname,
        );
    };
}
