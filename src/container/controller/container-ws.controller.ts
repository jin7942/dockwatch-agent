import { ContainerWsService } from './../service/container-ws.service';
import { ContainerController } from './container-http.controller';
import os from 'os';
import { setWsIntervalSender } from '../../common/utils/ws-util';
import { WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { parse } from 'url';

export class ContainerWsController {
    private containerWsService = new ContainerWsService();
    private hostname = os.hostname();
    private containerController = new ContainerController();

    /**
     * 컨테이너별 리소스 사용량 스트림 핸들러
     *
     * @route CONNECTION /ws/container/resource?containerId=xxxxx
     * @param ws
     * @param req containerId를 쿼리 스트링으로 받음
     */
    public handleContainerUsageStream = (ws: WebSocket, req: IncomingMessage): void => {
        const { query } = parse(req.url || '', true);
        const containerId = query.containerId;

        if (typeof containerId === 'string') {
            this.containerController.validContainerId(containerId);
            setWsIntervalSender(
                ws,
                () => this.containerWsService.getUsageByContainer(containerId),
                'container-usage',
                this.hostname,
            );
        } else {
            ws.close(); // 잘못된 요청
        }
    };
}
