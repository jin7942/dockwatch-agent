import { dir } from 'console';
import { CustomError } from '../../common/error/custom-error';
import { HttpStatus } from '../../common/types/http-status.enum';
import { createResponseVo } from '../../common/utils/create-util';
import { ContainerVo, LogFileContentVo, TreeNodeVo } from '../dto/log-http.vo';
import { LogService } from './../service/log-http.service';
import { Request, Response } from 'express';
import { LogPathDto } from '../dto/log-http.dto';

export class LogController {
    private logService = new LogService();

    /**
     * 실행중인 컨테이너 리스트 조회 API
     *
     * @route GET /api/log/active
     * @returns {ContainerVo} 컨테이너 ID와 이름을 포함한 JSON 배열
     */
    public getRunningContainers = async (req: Request, res: Response): Promise<void> => {
        const resData: ContainerVo[] = await this.logService.getRunningContainers();
        res.status(200).json(createResponseVo(true, '실행중인 컨테이너 조회 성공', resData));
    };

    /**
     * 로그 디렉터리 조회 API
     * - 파라미터로 디렉터리 경로를 요청
     * - 경로노출 최소화를 위해 POST로 처리
     * - 1단계 깊이의 노드만 반환, 하위 노드 조회시 재호출 필요
     *
     * @route POST /api/log/directory
     * @requestBody {LogPathDto}
     * @returns {TreeNodeVo[]} 디렉터리 정보를 포함한 JSON 배열
     */
    public getDirectoryTree = async (req: Request, res: Response): Promise<void> => {
        const dirPath: LogPathDto = req.body;
        // 유효성 검사
        this.validDirPath(dirPath.path);

        const resData: TreeNodeVo[] = await this.logService.getDirectoryTree(dirPath.path);
        res.status(200).json(createResponseVo(true, '디렉터리 조회 성공', resData));
    };

    /**
     * 로그 파일 조회 API
     * - 파라미터로 파일 전체 경로를 요청
     * - 경로노출 최소화를 위해 POST로 처리
     *
     * @route POST /api/log/file
     * @requestBody {LogPathDto}
     * @returns {LogFileContentVo} 해당 파일의 전체 텍스트를 담은 JSON 객체
     */
    public getLogFile = async (req: Request, res: Response): Promise<void> => {
        const filePathDto: LogPathDto = req.body;
        // 유효성 검사
        this.validDirPath(filePathDto.path);

        const resData: LogFileContentVo = await this.logService.getLogFile(filePathDto.path);
        res.status(200).json(createResponseVo(true, '파일 조회 성공', resData));
    };

    /**
     * 디렉터리 유효성 검사 함수
     * - 조건 불만족시 Error 던짐
     * - /var/log 로 시작하는 경로만 허용함
     *
     * @param path 검사할 디렉터리 경로
     */
    private validDirPath(path: any): void {
        const isValid =
            typeof path === 'string' &&
            path.trim() !== '' &&
            path.length <= 1024 &&
            !path.includes('..') &&
            path.startsWith('/var/log');

        if (!isValid) {
            throw new CustomError(HttpStatus.BAD_REQUEST, '잘못된 요청 입니다.');
        }
    }
}
