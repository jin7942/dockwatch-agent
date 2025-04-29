// Http 관련 유틸

import { Response } from 'express';
import { createResponseVo } from './create-util';

/**
 * HTTP 요청을 처리하고 표준 응답을 전송하는 유틸 함수
 *
 * @param res Express Response 객체
 * @param serviceCall 호출할 서비스 함수 (Promise를 반환해야 함)
 */
export const sendHttpResponse = async <T>(
    res: Response,
    serviceCall: () => Promise<T>,
): Promise<void> => {
    try {
        const data = await serviceCall();
        res.status(200).json(createResponseVo(true, '조회 성공', data));
    } catch (error) {
        const message = error instanceof Error ? error.message : '조회 실패';
        res.status(500).json(createResponseVo(false, message, null));
    }
};
