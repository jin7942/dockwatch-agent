import { createResponseVo } from '../../common/utils/create-util';
import { Container } from '../dto/log-http.vo';
import { LogService } from './../service/log-http.service';
import { Request, Response } from 'express';

export class LogController {
    private logService = new LogService();

    /**
     * 실행중인 컨테이너 리스트 조회
     *
     * @route GET /api/log/active
     * @returns 컨테이너 ID와 이름을 포함한 배열
     */
    public getRunningContainers = async (req: Request, res: Response): Promise<void> => {
        const resData: Container[] = await this.logService.getRunningContainers();
        res.status(200).json(createResponseVo(true, '실행중인 컨테이너 조회 성공', resData));
    };
}
