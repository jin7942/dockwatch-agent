import { ContainerResourceStreamVo } from '../../container/dto/container-ws.vo';
import { ContainerVo } from '../../container/dto/container-http.vo';

/** 대시보드용 실시간 서버 사용량 */
export interface SysUsageStreamVo {
    /** CPU 사용률 (%) */
    cpuPercent: number;

    /** 메모리 사용률 (%) */
    memoryPercent: number;

    /** 네트워크 사용량 (수신 + 송신 합산, 단위: bps) */
    networkUsage: number;

    /** 실행중인 컨테이너 */
    runningContainer: RunningContainer[];
}

export interface RunningContainer extends ContainerVo {
    /** 사용율(cpu, mem) */
    usage: ContainerResourceStreamVo;
}
