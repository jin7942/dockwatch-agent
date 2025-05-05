import { SysUsageVo } from '../dto/dashboard-http.vo';
import si from 'systeminformation';
export class DashboardService {
    /**
     * 대시보드용 시스템 자원 사용율 조회
     * - 디스크 사용율
     * - 서버 가동시간 제공(반올림)
     *
     * @returns 디스크 사용율과 서버 가동시간이 포함된 Vo 객체
     */
    public getSysUsage = async (): Promise<SysUsageVo> => {
        const [diskUsage, uptimeHours] = await Promise.all([
            this.getDiskUsage(),
            this.getUptimeHours(),
        ]);

        const result: SysUsageVo = { diskUsage, uptimeHours };
        return result;
    };
    /**
     * 전체 디스크 사용율 조회
     *
     * @returns 디스크 사용율
     */
    private getDiskUsage = async (): Promise<number> => {
        const fsSize = await si.fsSize();

        let total: number = 0;
        let used: number = 0;

        for (const fs of fsSize) {
            total += fs.size;
            used += fs.used;
        }
        return (used / total) * 100;
    };

    /**
     * 서버 가동시간 조회
     *
     * @returns 한시간 단위로 반올림
     */
    private getUptimeHours = async (): Promise<number> => {
        const uptime: number = await si.time().uptime;
        return Math.round(uptime / 3600);
    };
}
