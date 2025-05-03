export enum HttpStatus {
    // 4xx: 클라이언트 오류
    BAD_REQUEST = 400, // 잘못된 요청
    UNAUTHORIZED = 401, // 인증 필요
    FORBIDDEN = 403, // 권한 없음
    NOT_FOUND = 404, // 요청 리소스 없음
    REQUEST_TIMEOUT = 408, // 요청 타임아웃
    CONFLICT = 409, // 리소스 충돌 (ex: 중복 데이터)
    UNPROCESSABLE_ENTITY = 422, // 유효하지만 처리할 수 없는 요청 (유효성 검증 실패 등)

    // 5xx: 서버 오류
    INTERNAL_SERVER_ERROR = 500, // 내부 서버 오류
    NOT_IMPLEMENTED = 501, // 아직 구현되지 않은 기능
    BAD_GATEWAY = 502, // 게이트웨이로부터 잘못된 응답
    SERVICE_UNAVAILABLE = 503, // 서비스 일시 중단
    GATEWAY_TIMEOUT = 504, // 게이트웨이 응답 지연
}
