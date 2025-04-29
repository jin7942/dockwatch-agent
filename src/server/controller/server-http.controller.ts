import { Request, Response } from 'express';
import { sendHttpResponse } from '../../common/utils/utilHttp';
import { ServerService } from '../service/server-http.service';
import { ResponseVo } from '../../common/types/response.vo';

/**
 * 서버 컨트롤러 클래스
 */
export class ServerController {
    private serverService = new ServerService();

    /**
     * 서버 기본 정보 조회 API
     *
     * @route GET /api/server/info
     * @returns 서버의 CPU, 메모리, 디스크 기본 정보를 포함한 JSON 응답
     */
    public getSysInfo = async (req: Request, res: Response): Promise<void> => {
        await sendHttpResponse(res, () => this.serverService.getSysInfo());
    };

    /**
     * 네트워크 인터페이스 조회 API
     *
     * @route GET /api/server/network-interfaces
     * @returns 서버의 네트워크 인터페이스 정보를 포함한 JSON 응답
     */
    public getSysNetworkInfo = async (req: Request, res: Response): Promise<void> => {
        await sendHttpResponse(res, () => this.serverService.getSysNetworkInfo());
    };

    /**
     * 마운트별 디스크 사용량 조회 API
     *
     * @route GET /api/server/mount-disk
     * @returns  마운트별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public getDiskUsageByMount = async (req: Request, res: Response): Promise<void> => {
        await sendHttpResponse(res, () => this.serverService.getDiskUsageByMount());
    };

    /**
     * 컨테이너별 디스크 사용량 조회 API
     *
     * @route GET /api/server/container-disk
     * @returns  컨테이너별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public getDiskUsageByContainer = async (req: Request, res: Response): Promise<void> => {
        await sendHttpResponse(res, () => this.serverService.getDiskUsageByContainer());
    };
}
