/**
 * WebSocket 전용 응답 포맷
 * @template T 실제 실시간 데이터 타입
 */
export interface WsVo<T> {
    /** 데이터 종류 (예: 'cpu', 'memory', 'network' 등) */
    type: string;

    /** 데이터를 보낸 호스트명 */
    hostname: string;

    /** 데이터 생성 시각 (ISO 8601) */
    timestamp: string;

    /** 실시간 전송할 실제 데이터 */
    data: T;
}
