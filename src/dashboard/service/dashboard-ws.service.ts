import { ContainerWsService } from './../../container/service/container-ws.service';
import { ContainerService } from '../../container/service/container-http.service';
import { ContainerVo } from '../../container/dto/container-http.vo';
import { SysUsageStreamVo, RunningContainer } from '../dto/dashboard-ws.vo';
import si from 'systeminformation';

export class DashboardWsService {
    private containerService = new ContainerService();
    private containerWsService = new ContainerWsService();

    /**
     * 실시간 서버 사용량 제공 함수
     * - cpu 사용율
     * - 메모리 사용율
     * - 초당 네트워크 사용량
     * - 실행중인 컨테이너 정보 및 리소스 사용량
     *
     * @returns
     */
    public getSysUsageStream = async (): Promise<SysUsageStreamVo> => {
        const [cpuPercent, memoryPercent, networkUsage, runningContainer] = await Promise.all([
            this.getCpuPerc(),
            this.getMemoryPerc(),
            this.getNetworkTotal(),
            this.getRunningContainer(),
        ]);

        const result: SysUsageStreamVo = {
            cpuPercent,
            memoryPercent,
            networkUsage,
            runningContainer,
        };
        return result;
    };

    /**
     * CPU 사용율 조회
     *
     * @returns CPU 사용율
     */
    private getCpuPerc = async (): Promise<number> => {
        return await si.fullLoad();
    };

    /**
     * 메모리 사용율 조회
     *
     * @returns 메모리 사용율
     */
    private getMemoryPerc = async (): Promise<number> => {
        const mem: si.Systeminformation.MemData = await si.mem();
        return (mem.active / mem.total) * 100;
    };

    /**
     * 초당 네트워크 사용량 조회
     *
     * @returns rx + tx(byte)
     */
    private getNetworkTotal = async (): Promise<number> => {
        const defaultNet = await si.networkInterfaceDefault();
        const stats = await si.networkStats(defaultNet);
        return stats[0].rx_sec + stats[0].tx_sec;
    };

    /**
     * 실행중인 컨테이너 조회
     * - cpu, memory 사용량도 함께 조회
     *
     * @returns 컨테이너 정보와 리소스 사용율이 포함된 RunningContainer 객체
     */
    private getRunningContainer = async (): Promise<RunningContainer[]> => {
        const containerList: ContainerVo[] = await this.containerService.getContainerList();

        const results: RunningContainer[] = await Promise.all(
            containerList.map(async (container): Promise<RunningContainer> => {
                const usage = await this.containerWsService.getUsageByContainer(container.id);
                return {
                    ...container,
                    usage,
                };
            }),
        );

        return results;
    };
}
