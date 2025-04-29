// WebSocket 스트림 유틸

import { WebSocket } from 'ws';
import { createWsResponseVo } from './create-util';

/**
 * WebSocket 주기 송신 유틸
 *
 * @param ws WebSocket 객체
 * @param getData 주기적으로 호출할 데이터 조회 함수
 * @param messageType WebSocket 송신 메시지 타입 (ex: 'server-usage')
 * @param hostname 서버 호스트명
 * @param intervalMs 데이터 송신 주기 (기본 1000ms)
 */
export const setWsIntervalSender = <T>(
    ws: WebSocket,
    getData: () => Promise<T>,
    messageType: string,
    hostname: string,
    intervalMs = 1000,
): void => {
    let interval: NodeJS.Timeout;

    const sendData = async () => {
        try {
            const data = await getData();
            const payload = createWsResponseVo(messageType, hostname, data);
            ws.send(JSON.stringify(payload));
        } catch (error) {
            console.error(`Error sending ${messageType} stream:`, error);
            // 에러 발생시 interval 클리어
            clearInterval(interval);
            // 이후 커넥션 클로즈 이벤트 발생
            ws.close();
        }
    };

    sendData(); // 최초 1회 전송

    interval = setInterval(sendData, intervalMs);

    ws.on('close', () => {
        clearInterval(interval);
        console.log(`[WebSocket Closed] ${messageType} stream connection closed.`);
    });
};
