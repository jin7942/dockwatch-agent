// 도메인별 VO 정의

/**
 * 서버 기본 정보
 */
export interface SysInfoVo {
    cpu: CpuInfoVo;
    memory: MemoryInfoVo;
    disk: DiskInfoVo;
}

/**
 * CPU 정보
 */
export interface CpuInfoVo {
    /** CPU 모델명 (예: Intel Core i5-5000) */
    model: string;

    /** CPU 기본 클럭 속도 (GHz 단위) */
    speedGHz: number;

    /** 물리 CPU 코어 수 */
    cores: number;

    /** 스레드 수 */
    thread: number;
}

/**
 * 메모리 정보
 */
export interface MemoryInfoVo {
    /** 총 메모리 용량 (bytes) */
    total: number;

    /** 사용 중인 메모리 용량 (bytes) */
    used: number;
}

/**
 * 디스크 정보
 */
export interface DiskInfoVo {
    /** 총 디스크 용량 (예: "512 GB") */
    total: number;

    /** 사용 중인 디스크 용량 (예: "320 GB") */
    used: number;
}
