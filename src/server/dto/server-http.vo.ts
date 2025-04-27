// 도메인별 HTTP ValueObject 정의

/**
 * 서버 기본 정보
 */
export interface SysInfoVo {
    cpu: CpuInfoVo;
    memory: MemoryInfoVo;
    disk: DiskInfoVo;
}
/**
 * 서버 네트워크 인터페이스 정보
 */
export interface SysNetworkInfoVo {
    /** 네트워크 인터페이스 이름 (ex: 'eth0') */
    interface: string;

    /** IPv4 주소 (ex: '192.168.0.10') */
    ip4: string;

    /** IPv4 서브넷 (ex: '255.255.255.0') */
    ip4Subnet: string;

    /** MAC 주소 (ex: '00:1B:44:11:3A:B7') */
    mac: string;

    /** 링크 속도 (Mbps) */
    speed: number;
}

/**
 * CPU 정보
 */
export interface CpuInfoVo {
    /** CPU 모델명 (ex: 'Intel Core i5-5000') */
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
    /** 총 디스크 용량 (bytes) */
    total: number;

    /** 사용 중인 디스크 용량 (bytes) */
    used: number;
}

/**
 * 컨테이너별 디스크 사용량
 */
export interface DiskUsageByContainerVo {
    /** 컨테이너 이름 (ex: 'ray-server') */
    name: string;

    /** 사용량 (bytes) */
    used: number;

    /** 컨테이너 실행 상태 (ex: true / false) */
    isActive: boolean;
}

/**
 * 마운트별 디스크 사용량
 */
export interface DiskUsageByMountVo {
    /** 마운트 경로 (ex: '/mnt/data') */
    mountPath: string;

    /** 총 용량 (bytes) */
    total: number;

    /** 사용량 (bytes) */
    used: number;

    /** 사용률 (%) */
    use: number;
}
