import { SysUsageVo, Traffic } from '../dto/dashboard-http.vo';

export class DashboardService {
    public getSysUsage = async (): Promise<SysUsageVo> => {
        // TODO
    };
    private getDiskUsage = async (): Promise<number> => {
        // TODO
    };
    private getUptimeHours = async (): Promise<number> => {
        // TODO
    };
    private getNetworkTraffic = async (): Promise<Traffic[]> => {
        // TODO
    };
}
