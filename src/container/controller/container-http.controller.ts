import { Request, Response } from 'express';
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
        const resData = await this.containerService.getContainerList();
        res.status(200).json(createResponseVo(true, '컨테이너 리스트 조회 성공', resData));
    };

    /**
     * 컨테이너 상태 조회
     *
     * @route GET /api/container/status?containerId=xxxxx
     * @param req 쿼리 스트링에서 containerId를 받는다.
     * @returns 조회 결과값 true / false
     */
    // TODO: 전역 에러 핸들러 적용해서 수정
    public getContainerStatus = async (req: Request, res: Response): Promise<void> => {
        const { containerId } = req.query;

        if (typeof containerId === 'string') {
            // 유효성 검증 후 처리
            if (!this.isValidContainerId(containerId)) {
                res.status(400).json(
                    createResponseVo(false, '유효하지 않은 컨테이너 ID입니다', null),
                );
                return;
            }
            const resData = await this.containerService.getContainerStatus(containerId);
            res.status(200).json(createResponseVo(true, '컨테이너 상태 조회 성공', resData));
        } else {
            res.status(400).json(createResponseVo(false, '컨테이너 ID가 필요합니다', null));
        }
    };

    public startContainer = async (req: Request, res: Response): Promise<void> => {
        // 아직 구현 안 함
    };

    public stopContainer = async (req: Request, res: Response): Promise<void> => {
        // 아직 구현 안 함
    };

    public reStartContainer = async (req: Request, res: Response): Promise<void> => {
        // 아직 구현 안 함
    };

    /**
     * 컨테이너 ID 유효성 검증 함수
     * - [a-f0-9]{12,64} 정규식으로 검증
     *
     * @param containerId 컨테이너 ID
     * @returns true / false
     */
    private isValidContainerId = (containerId: string): boolean => {
        // Docker 컨테이너 ID는 12자리 이상의 16진수로 되어있음
        const regex: RegExp = /^[a-f0-9]{12,64}$/;
        return regex.test(containerId);
    };
}
