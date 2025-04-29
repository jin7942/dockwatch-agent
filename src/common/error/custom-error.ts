import { HttpStatus } from '../../common/types/http-status.enum';

// 커스텀 에러 생성
export class CustomError extends Error {
    // 상태 코드는 http 코드 400~500번대로 제한
    constructor(public code: HttpStatus, message: string) {
        super(message);
        this.name = 'CustomError';
        Error.captureStackTrace(this, this.constructor);
    }
}
