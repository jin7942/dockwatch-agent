// container 컨트롤러
import { Request, Response } from 'express';
import { sendHttpResponse } from '../../common/utils/http-util';

//interface 정의
import { ResponseVo } from '../../common/types/response.vo';
import { Container } from '../dto/container-http.vo';
import { ContainerDto } from '../dto/container-http.dto';

import { ContainerService } from '../service/container-http.service';
import { createResponseVo } from '../../common/utils/create-util';

export class ContainerController {
    private containerService = new ContainerService();

    /**
     * 컨테이너 리스트 조회 API
     *
     * @route GET /api/container/list
     * @returns 컨테이너 리스트
     */
    public getContainerList = async (req: Request, res: Response): Promise<void> => {
        await sendHttpResponse(res, () => this.containerService.getContainerList());
    };

    /**
     * 컨테이너 상태 조회
     *
     * @route GET /api/container/status?containerID=xxxxx
     * @param req 쿼리 스트링에서 containerId를 받는다.
     * @returns 조화 결과값 true / flase
     */
    public getContainerStatus = async (req: Request, res: Response): Promise<void> => {
        const { containerId } = req.query;

        if (typeof containerId === 'string') {
            // 유효성 검증 후 처리
            this.isValidContainerId(containerId);
            await sendHttpResponse(res, () =>
                this.containerService.getContainerStatus(containerId),
            );
        } else {
            res.status(400).json(createResponseVo(false, '컨테이너 ID가 필요합니다', null));
        }
    };

    public startContinaer = async (req: Request, res: Response): Promise<void> => {};
    public stopContinaer = async (req: Request, res: Response): Promise<void> => {};
    public reStartContinaer = async (req: Request, res: Response): Promise<void> => {};

    /**
     * 컨테이너 ID 유효성 검증 함수
     * - [a-f0-9]{12,64} 정규식으로 검증
     *
     * @param id 컨테이너 ID
     * @returns true / false
     */
    private isValidContainerId = (containerId: string): boolean => {
        // Docker 컨테이너 ID는 12자리 이상의 16진수로 되어있음
        const regex: RegExp = /^[a-f0-9]{12,64}$/;
        return regex.test(containerId);
    };
}
