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

/**
 * WebSocket용 toptable 전역 인터페이스 정의
 */
export interface TopTableStreamVo {
    /** 정렬 순서 */
    idx: number;

    /** 프로세스 ID (ex: 1234) */
    pid: number;

    /** 실행 유저 (ex: 'user') */
    user: string;

    /** 상태 (ex: 'running', 'sleep' 등) */
    s: string;

    /** 메모리 사용 비율 (ex: 2.3) */
    mem: number;

    /** 실행 명령어 (ex: 'mysqld'등) */
    command: string;
}
