/** 대시보드용 시스템 사용 요약 */
export interface SysUsageVo {
    /** 디스크 사용량(%) */
    diskUsage: number;
    /** 서버 가동시간(1시간 단위로 반올림) */
    uptimeHours: number;
    /** 네트워크 트래픽 */
    network: Traffic[];
}

/** 네트워크 트래픽 정보 */
export interface Traffic {
    /** 날짜 YYYY-MM-DD */
    date: string;

    /** 수신(인바운드)bps */
    rx: number;

    /** 송신(아웃바운드)bps */
    tx: number;
}
