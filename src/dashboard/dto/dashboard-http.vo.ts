/** 대시보드용 시스템 사용 요약 */
export interface SysUsageVo {
    /** 디스크 사용량(%) */
    diskUsage: number;
    /** 서버 가동시간(1시간 단위로 반올림) */
    uptimeHours: number;
}
