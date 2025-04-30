// WebSocket 스트림 유틸
import { Readable } from 'stream';
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

// src/common/utils/ws-util.ts

/**
 * 실시간 stdout 스트림을 WebSocket으로 전달하는 유틸
 * - docker logs -f, tail -f 등과 같이 줄 단위로 출력되는 스트림에 적합
 *
 * @param ws WebSocket 객체
 * @param stream ReadableStream (예: spawn().stdout)
 */
export const setWsStreamSender = (
    ws: WebSocket,
    stream: Readable,
    messageType: string,
    hostname: string,
): void => {
    stream.on('data', (chunk) => {
        const payload = createWsResponseVo(messageType, hostname, {
            value: chunk.toString(),
        });
        ws.send(JSON.stringify(payload));
    });

    stream.on('error', (err) => {
        const errorPayload = createWsResponseVo(messageType, hostname, {
            value: `[ERROR] ${err.message}`,
        });
        ws.send(JSON.stringify(errorPayload));
        ws.close();
    });

    stream.on('close', () => {
        ws.close();
    });

    ws.on('close', () => {
        stream.destroy(); // 리소스 해제
    });
};
