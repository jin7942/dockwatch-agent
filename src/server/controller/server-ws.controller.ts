import { WebSocket } from 'ws';
import { ServerWsService } from '../service/server-ws.service';
import { setWsIntervalSender } from '../../common/utils/ws-util';
import { WsVo } from '../../common/types/ws.vo';
import os from 'os';
/**
 * 서버 리소스 WebSocket 컨트롤러
 */
export class ServerWsController {
    private serverWsService = new ServerWsService();
    private hostname = os.hostname();

    /**
     * 서버 사용량 통합 실시간 스트림 핸들러
     *
     * @route CONNECTION /ws/server/usage
     * @param 클라이언트 WebSocket
     */
    public handleServerUsageStream = (ws: WebSocket): void => {
        setWsIntervalSender(
            ws,
            this.serverWsService.getUsageSummary,
            'server-usage',
            this.hostname,
        );
    };

    /**
     * 네트워크 송수신량(bps) 실시간 스트림 핸들러
     *
     * @route CONNECTION /ws/server/network
     * @param  클라이언트 WebSocket
     */
    public handleNetworkUsageStream = (ws: WebSocket): void => {
        setWsIntervalSender(
            ws,
            this.serverWsService.getNetworkUsage,
            'network-usage',
            this.hostname,
        );
    };
}
