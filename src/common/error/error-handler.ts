import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom-error';
import { HttpStatus } from '../types/http-status.enum';
import { createResponseVo } from '../utils/create-util';

/**
 * 전역  에러 핸들러 정의
 * - app.use()에 등록하여 사용
 * - 컨트롤러 or 서비스에서 error throws시 호출됨
 * - 커스텀 에러일경우 커스텀 에러 전송
 * - 코드는 HTTP 상태코드로 제한
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (err instanceof CustomError) {
        res.status(err.code).json(createResponseVo(false, err.message, { code: err.code }));
    } else {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
            createResponseVo(false, 'Internal Server Error', {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
            }),
        );
    }
};
