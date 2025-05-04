import { DashboardService } from '../service/dashboard-http.service';

export class DashboardController {
    private dashboardService = new DashboardService();

    public getSysUsage = async (req: Request, res: Response): Promise<void> => {
        // TODO
    };
}
