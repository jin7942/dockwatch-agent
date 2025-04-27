import { WebSocket } from 'ws';
import { ServerWsService } from '../service/server-ws.service';
import { createWsResponseVo } from '../../common/utils/utilCreate';
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
     * @param ws 클라이언트 WebSocket 객체
     */
    public handleServerUsageStream = (ws: WebSocket) => {
        const sendUsageStream = async () => {
            try {
                const usageData = await this.serverWsService.getUsageSummary();
                const payload = createWsResponseVo('server-usage', this.hostname, usageData);
                ws.send(JSON.stringify(payload));
            } catch (error) {
                console.error('Error while sending usage stream:', error);
            }
        };

        // 최초 1회 즉시 전송
        sendUsageStream();

        // 이후 일정 주기마다 데이터 전송
        const interval = setInterval(sendUsageStream, 1000);

        ws.on('close', () => {
            clearInterval(interval);
            console.log('Server UsageStream WebSocket connection closed.');
        });
    };
}
