// interface 정의
import {
    UsageStreamVo,
    CpuUsageStreamVo,
    MemoryUsageStreamVo,
    DiskUsageStreamVo,
    NetworkUsageStreamVo,
} from '../dto/server-ws.vo';
import { TopTableStreamVo } from '../../common/types/ws.vo';

import si from 'systeminformation';

export class ServerWsService {
    /**
     * 서버 실시간 사용량 통합 조회
     *
     * @returns  실시간 사용량(CPU, MEMORY, DISK) 담긴 객체
     */
    public getUsageSummary = async (): Promise<UsageStreamVo> => {
        const [cpu, memory, disk] = await Promise.all([
            this.getCpuUsage(),
            this.getMemoryUsage(),
            this.getDiskUsage(),
        ]);
        const usageStreamVo: UsageStreamVo = { cpu, memory, disk };

        return usageStreamVo;
    };

    /**
     * 실시간 네트워크 송수신량 조회
     *
     * @returns  인터페이스별 rx/tx 배열
     */
    public getNetworkUsage = async (): Promise<NetworkUsageStreamVo[]> => {
        const stats = await si.networkStats();
        const usage: NetworkUsageStreamVo[] = stats.map((stat) => ({
            interface: stat.iface,
            rx: stat.rx_sec,
            tx: stat.tx_sec,
        }));

        return usage;
    };

    /**
     * TopTable 생성을 위한 내부 유틸
     * @param processes
     * @param sortField ('cpu' | 'mem')
     * @returns  객체
     */
    private buildTopTable = (
        processes: si.Systeminformation.ProcessesData,
        sortField: 'cpu' | 'mem',
    ): TopTableStreamVo[] => {
        const topTableStreamVo: TopTableStreamVo[] = processes.list
            .sort((a, b) => b[sortField] - a[sortField])
            .slice(0, 10)
            .map((proc, idx) => ({
                idx: idx + 1,

                pid: proc.pid,
                user: proc.user,
                s: proc.state,
                mem: proc.mem,
                command: proc.name,
            }));

        return topTableStreamVo;
    };

    /**
     * 실시간 CPU 사용률 + TopTable 조회
     * @returns CPU 사용률, TopTable 상위 10개 rows
     */
    private getCpuUsage = async (): Promise<CpuUsageStreamVo> => {
        const [load, processes] = await Promise.all([si.currentLoad(), si.processes()]);
        const topTable: TopTableStreamVo[] = this.buildTopTable(processes, 'cpu');

        const cpuUsageStreamVo: CpuUsageStreamVo = { usagePercent: load.currentLoad, topTable };

        return cpuUsageStreamVo;
    };

    /**
     * 실시간 Memory 사용률 + TopTable 조회
     *
     * @returns  Memory 사용률, TopTable 상위 10개 rows
     */
    private getMemoryUsage = async (): Promise<MemoryUsageStreamVo> => {
        const [mem, processes] = await Promise.all([si.mem(), si.processes()]);
        const usagePercent = (mem.active / mem.total) * 100;
        const topTable: TopTableStreamVo[] = this.buildTopTable(processes, 'mem');

        const memoryUsageStreamVo: MemoryUsageStreamVo = { usagePercent, topTable };

        return memoryUsageStreamVo;
    };

    /**
     * 실시간 Disk I/O 평균 속도 조회
     *
     * @returns I/O 평균속도(bps)
     */
    private getDiskUsage = async (): Promise<DiskUsageStreamVo> => {
        const io = await si.disksIO();
        const activity = (io.rIO + io.wIO) / 2;

        const diskUsageStreamVo: DiskUsageStreamVo = { activity };

        return diskUsageStreamVo;
    };
}
