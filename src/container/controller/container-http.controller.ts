import { Request, Response } from 'express';
import { ResponseVo } from '../../common/types/response.vo';
import { ContainerVo } from '../dto/container-http.vo';
import { ContainerDto } from '../dto/container-http.dto';
import { ContainerService } from '../service/container-http.service';
import { createResponseVo } from '../../common/utils/create-util';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';

export class ContainerController {
    private containerService = new ContainerService();

    /**
     * 컨테이너 리스트 조회 API
     *
     * @route GET /api/container/list
     * @returns {ContainerVo[]} 컨테이너 리스트
     */
    public getContainerList = async (req: Request, res: Response): Promise<void> => {
        const resData: ContainerVo[] = await this.containerService.getContainerList();
        res.status(200).json(createResponseVo(true, '컨테이너 리스트 조회 성공', resData));
    };

    /**
     * 컨테이너 상세 정보 조회 API
     *
     * @route GET /api/container/info?containerId=xxxx
     * @param req 쿼리 스트링에서 containerId를 받는다.
     * @returns {ContainerVo} 컨테이너 정보를 포함한 JSON 객체
     */
    public getContainerInfo = async (req: Request, res: Response): Promise<void> => {
        const { containerId } = req.query;

        // 타입 체크
        if (typeof containerId === 'string') {
            // 유효성 검사
            this.validContainerId(containerId);

            const resData: ContainerVo = await this.containerService.getContainerInfo(containerId);
            res.status(200).json(createResponseVo(true, '컨테이너 상태 조회 성공', resData));
        } else {
            throw new CustomError(HttpStatus.BAD_REQUEST, '컨테이너 ID가 필요합니다.');
        }
    };

    /**
     * 컨테이너 상태 조회 API
     *
     * @route GET /api/container/status?containerId=xxxxx
     * @param req 쿼리 스트링에서 containerId를 받는다.
     * @returns 조회 결과값 true / false
     */
    public getContainerStatus = async (req: Request, res: Response): Promise<void> => {
        const { containerId } = req.query;

        // 타입 체크
        if (typeof containerId === 'string') {
            // 유효성 검사
            this.validContainerId(containerId);

            const resData: boolean = await this.containerService.getContainerStatus(containerId);
            res.status(200).json(createResponseVo(true, '컨테이너 상태 조회 성공', resData));
        } else {
            throw new CustomError(HttpStatus.BAD_REQUEST, '컨테이너 ID가 필요합니다.');
        }
    };

    /**
     * 특정 컨테이너 실행 API
     *
     * @route POST /api/container/start
     * @param req 컨테이너ID가 포함된 dto
     * @returns 실행 결과 success: true | false, data 부분은 null
     */
    public startContainer = async (req: Request, res: Response): Promise<void> => {
        const dto: ContainerDto = req.body;
        this.validContainerId(dto.id);
        await this.containerService.startContainer(dto);
        res.status(200).json(createResponseVo(true, '컨테이너 시작 성공', null));
    };

    /**
     * 특정 컨테이너 중지 API
     *
     * @route POST /api/container/stop
     * @param req 컨테이너ID가 포함된 dto
     * @returns 실행 결과 success: true | false, data 부분은 null
     */
    public stopContainer = async (req: Request, res: Response): Promise<void> => {
        const dto: ContainerDto = req.body;
        this.validContainerId(dto.id);
        await this.containerService.stopContainer(dto);
        res.status(200).json(createResponseVo(true, '컨테이너 중지 성공', null));
    };

    /**
     * 특정 컨테이너 재시작 API
     *
     * @route POST /api/container/restart
     * @param req 컨테이너ID가 포함된 dto
     * @returns 실행 결과 success: true | false, data 부분은 null
     */
    public reStartContainer = async (req: Request, res: Response): Promise<void> => {
        const dto: ContainerDto = req.body;
        this.validContainerId(dto.id);
        await this.containerService.reStartContainer(dto);
        res.status(200).json(createResponseVo(true, '컨테이너 재시작 성공', null));
    };

    /**
     * 컨테이너 ID 유효성 검증 함수
     * - [a-f0-9]{12,64} 정규식으로 검증
     * - 검증을 통과하지 못하면 에러 발생
     *
     * @param containerId 컨테이너 ID
     */
    public validContainerId = (containerId: any): void => {
        // Docker 컨테이너 ID는 12자리 이상의 16진수로 되어있음
        const regex: RegExp = /^[a-f0-9]{12,64}$/;

        const result: boolean = regex.test(containerId);

        if (!result) {
            throw new CustomError(
                HttpStatus.UNPROCESSABLE_ENTITY,
                '올바르지 않은 컨테이너 ID 입니다.',
            );
        }
    };
}
