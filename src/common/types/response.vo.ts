/**
 * 공통 HTTP 응답 포맷
 * - {success: boolean, message: string, data: T}
 * @template T 실제 응답 데이터 타입
 */
export interface ResponseVo<T> {
    /** 요청 성공 여부 (true/false) */
    success: boolean;

    /** 결과 메시지 (예: "조회 성공", "서버 오류" 등) */
    message: string;

    /** 실제 응답 데이터 */
    data: T;
}
