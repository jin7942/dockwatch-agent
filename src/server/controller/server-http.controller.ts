import { Request, Response } from 'express';
import { ServerService } from '../service/server-http.service';
import { ResponseVo } from '../../common/types/response.vo';
import { createResponseVo } from '../../common/utils/create-util';
import {
    DiskUsageByContainerVo,
    DiskUsageByMountVo,
    SysInfoVo,
    SysNetworkInfoVo,
} from '../dto/server-http.vo';

/**
 * 서버 컨트롤러 클래스
 */
export class ServerController {
    private serverService = new ServerService();

    /**
     * 서버 기본 정보 조회 API
     *
     * @route GET /api/server/info
     * @returns {SysInfoVo} 서버의 CPU, 메모리, 디스크 기본 정보를 포함한 JSON 객체
     */
    public getSysInfo = async (req: Request, res: Response): Promise<void> => {
        const resData: SysInfoVo = await this.serverService.getSysInfo();
        res.status(200).json(createResponseVo(true, '서버 기본 정보 조회 성공', resData));
    };

    /**
     * 네트워크 인터페이스 조회 API
     *
     * @route GET /api/server/network-interfaces
     * @returns {SysNetworkInfoVo[]} 서버의 네트워크 인터페이스 정보를 포함한 JSON 배열
     */
    public getSysNetworkInfo = async (req: Request, res: Response): Promise<void> => {
        const resData: SysNetworkInfoVo[] = await this.serverService.getSysNetworkInfo();
        res.status(200).json(createResponseVo(true, '네트워크 인터페이스 조회 성공', resData));
    };

    /**
     * 마운트별 디스크 사용량 조회 API
     *
     * @route GET /api/server/mount-disk
     * @returns {DiskUsageByMountVo[]} 마운트별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public getDiskUsageByMount = async (req: Request, res: Response): Promise<void> => {
        const resData: DiskUsageByMountVo[] = await this.serverService.getDiskUsageByMount();
        res.status(200).json(createResponseVo(true, '마운트별 디스크 사용량 조회 성공', resData));
    };

    /**
     * 컨테이너별 디스크 사용량 조회 API
     *
     * @route GET /api/server/container-disk
     * @returns {DiskUsageByContainerVo[]} 컨테이너별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public getDiskUsageByContainer = async (req: Request, res: Response): Promise<void> => {
        const resData: DiskUsageByContainerVo[] =
            await this.serverService.getDiskUsageByContainer();
        res.status(200).json(createResponseVo(true, '컨테이너별 디스크 사용량 조회 성공', resData));
    };
}
