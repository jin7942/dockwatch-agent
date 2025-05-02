import { WebSocket } from 'ws';
import { parse } from 'url';
import os from 'os';
import { IncomingMessage } from 'http';
import { LogWsService } from '../service/log-ws.service';
import { setWsStreamSender } from '../../common/utils/ws-util';
import { ContainerController } from '../../container/controller/container-http.controller';

export class LogWsController {
    private logWsService = new LogWsService();
    private hostname = os.hostname();
    private containerController = new ContainerController();

    /**
     * 컨테이너별 실시간 로그 스트림 핸들러
     *
     * @route CONNECTION /ws/log/stream?containerId=xxxxxxx
     * @param ws
     * @param req containerId를 쿼리 스트링으로 받음
     */
    public handleLogStream = (ws: WebSocket, req: IncomingMessage): void => {
        const { query } = parse(req.url || '', true);
        const containerId = query.containerId;

        if (typeof containerId === 'string') {
            this.containerController.validContainerId(containerId);
            const stream = this.logWsService.getLogStream(containerId);
            setWsStreamSender(ws, stream, 'container-log', this.hostname);
        } else {
            ws.close(); // 잘못된 요청
        }
    };
}
