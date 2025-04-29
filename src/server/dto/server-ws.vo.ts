import { TopTableStreamVo } from '../../common/types/ws.vo';

/**
 * 서버 실시간 사용량 제공
 */
export interface UsageStreamVo {
    cpu: CpuUsageStreamVo;
    memory: MemoryUsageStreamVo;
    disk: DiskUsageStreamVo;
}

/**
 * 실시간 CPU 사용량
 */
export interface CpuUsageStreamVo {
    /**  사용율 (ex: 30) */
    usagePercent: number;

    /** CPU 사용 top table */
    topTable: TopTableStreamVo[];
}

/**
 * 실시간 메모리 사용량
 */
export interface MemoryUsageStreamVo {
    /** 사용율 (ex: 30) */
    usagePercent: number;

    /** 메모리 사용 top table */
    topTable: TopTableStreamVo[];
}

/**
 * 실시간 디스크 I/O 속도(평균)
 */
export interface DiskUsageStreamVo {
    /** 초당 I/O 평균 (ex: 30000)(bps) */
    activity: number;
}

/**
 * 실시간 네트워크 사용량
 */
export interface NetworkUsageStreamVo {
    /** 네트워크 인터 페이스 (ex: eth0) */
    interface: string;

    /** 초당 수신 바이트(bps) */
    rx: number;

    /** 초당 송신 바이트(bps) */
    tx: number;
}
