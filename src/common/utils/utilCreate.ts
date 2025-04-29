import { ResponseVo } from '../types/response.vo';
import { WsVo } from '../types/ws.vo';

/**
 * HTTP 응답 객체를 생성하는 유틸
 * @param success 요청 성공 여부
 * @param data 응답 데이터
 * @param message 응답 메시지
 * @returns 공통 응답 포맷
 */
export const createResponseVo = <T>(success: boolean, message: string, data: T): ResponseVo<T> => {
    return {
        success,
        message,
        data,
    };
};

/**
 * WebSocket 응답 객체를 생성하는 유틸
 * @param type 데이터 종류 (cpu, memory 등)
 * @param hostname 호스트명
 * @param data 전송할 데이터
 * @returns 공통 응답 포맷
 */
export const createWsResponseVo = <T>(type: string, hostname: string, data: T): WsVo<T> => {
    return {
        type,
        hostname,
        timestamp: new Date().toISOString(),
        data,
    };
};
