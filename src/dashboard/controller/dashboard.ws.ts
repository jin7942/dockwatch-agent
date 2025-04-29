import { WebSocketServer, WebSocket } from 'ws';
import { DashboardService } from '../service/dashboard.service';
import { createWsResponse } from '../../common/utils/create-util';

const dashboardService = new DashboardService();

/**
 * 대시보드 WebSocket 핸들러
 * @param server WebSocketServer 인스턴스
 */
export const handleDashboardWs = (server: WebSocketServer) => {
    server.on('connection', (socket: WebSocket) => {
        console.log('Dashboard WebSocket client connected.');

        // 1초마다 CPU 사용량 스트림 전송
        const cpuInterval = setInterval(async () => {
            try {
                // const cpuUsage = await dashboardService.getCpuUsage();
                // const message = createWsResponse<ChartData>('cpu', 'hostname-01', cpuUsage);
                // socket.send(JSON.stringify(message));
            } catch (error) {
                console.error('Error sending CPU usage:', error);
            }
        }, 1000);

        // 클라이언트 연결 종료 시 인터벌 정리
        socket.on('close', () => {
            console.log('Dashboard WebSocket client disconnected.');
            clearInterval(cpuInterval);
        });
    });
};
