import { SysUsageStreamVo, RunningContainer } from '../dto/dashboard-ws.vo';

export class DashboardWsService {
    public getSysUsageStream = async (): Promise<SysUsageStreamVo> => {
        // TODO
    };

    private getCpuPerc = async (): Promise<number> => {
        //TODO
    };

    private getMemoryPerc = async (): Promise<number> => {
        //TODO
    };

    private getNetworkTotal = async (): Promise<number> => {
        //TODO
    };

    private getRunningContainer = async (): Promise<RunningContainer[]> => {
        //TODO
    };
}
