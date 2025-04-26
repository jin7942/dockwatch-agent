import { Router, Request, Response } from 'express';
import { ServerService } from '../service/server.service';
import { createResponseVo } from '../../common/utils/utilCreate';

const serverController = Router();
const serverService = new ServerService();

/**
 * 서버 기본 정보 조회 API
 *
 * @route GET /api/server/info
 * @param res Express Response 객체
 * @returns 서버의 CPU, 메모리, 디스크 기본 정보를 포함한 JSON 응답
 */
serverController.get('/info', async (req: Request, res: Response) => {
    try {
        const resData = await serverService.getSysInfo();
        res.status(200).json(createResponseVo(true, '조회 성공', resData));
    } catch (e) {
        res.status(500).json(createResponseVo(false, '조회 실패', e));
    }
});

export { serverController };
