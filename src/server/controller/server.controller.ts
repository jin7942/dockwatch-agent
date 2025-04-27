import { Request, Response } from 'express';
import { ServerService } from '../service/server.service';
import { createResponseVo } from '../../common/utils/utilCreate';

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
    public async getSysInfo(req: Request, res: Response): Promise<void> {
        try {
            const resData = await this.serverService.getSysInfo();
            res.status(200).json(createResponseVo(true, '조회 성공', resData));
        } catch (e) {
            const message = e instanceof Error ? e.message : '조회 실패';
            res.status(500).json(createResponseVo(false, message, null));
        }
    }

    /**
     * 네트워크 인터페이스 조회 API
     *
     * @route GET /api/server/network-interfaces
     * @returns 서버의 네트워크 인터페이스 정보를 포함한 JSON 응답
     */
    public async getSysNetworkInfo(req: Request, res: Response): Promise<void> {
        try {
            const resData = await this.serverService.getSysNetworkInfo();
            res.status(200).json(createResponseVo(true, '조회 성공', resData));
        } catch (e) {
            const message = e instanceof Error ? e.message : '조회 실패';
            res.status(500).json(createResponseVo(false, message, null));
        }
    }

    /**
     * 마운트별 디스크 사용량 조회 API
     *
     * @route GET /api/server/mount-disk
     * @returns 마운트별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public async getDiskUsageByMount(req: Request, res: Response): Promise<void> {
        try {
            const resData = await this.serverService.getDiskUsageByMount();
            res.status(200).json(createResponseVo(true, '조회 성공', resData));
        } catch (e) {
            const message = e instanceof Error ? e.message : '조회 실패';
            res.status(500).json(createResponseVo(false, message, null));
        }
    }

    /**
     * 컨테이너별 디스크 사용량 조회 API
     *
     * @route GET /api/server/container-disk
     * @returns 컨테이너별 디스크 사용량 배열을 포함한 JSON 응답
     */
    public async getDiskUsageByContainer(req: Request, res: Response): Promise<void> {
        try {
            const resData = await this.serverService.getDiskUsageByContainer();
            res.status(200).json(createResponseVo(true, '조회 성공', resData));
        } catch (e) {
            const message = e instanceof Error ? e.message : '조회 실패';
            res.status(500).json(createResponseVo(false, message, null));
        }
    }

    // 템플릿 복사해서 쓰셈
    // public async (req: Request, res: Response): Promise<void> {
    //     try {
    //         const resData = await this.serverService;
    //         res.status(200).json(createResponseVo(true, '조회 성공', resData));
    //     } catch (e) {
    //         const message = e instanceof Error ? e.message : '조회 실패';
    //         res.status(500).json(createResponseVo(false, message, null));
    //     }
    // }
}
