// 공통 비동기 처리 핸들러
import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * 비동기 컨트롤러 핸들러
 * - 컨트롤러 호출을 감싸서 에러를 next()로 자동 전달하는 함수
 * - 에러 핸들링은 /common/error/error-handler.ts 에서 처리
 *
 * @param handler - Express RequestHandler 함수 (비동기)
 * @returns 에러를 next로 전달하는 래핑 함수
 */
export const asyncHandler =
    (handler: RequestHandler): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
