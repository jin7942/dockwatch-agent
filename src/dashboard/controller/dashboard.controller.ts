import { Router } from 'express';
import { DashboardService } from '../service/dashboard.service';

const dashboardRouter = Router();
const dashboardService = new DashboardService();

// 대시보드 요약 데이터 조회
dashboardRouter.get('/summary', async (req, res) => {
    try {
        const summary = await dashboardService.getSummary();
        res.json({ success: true, message: 'Dashboard summary fetched successfully.', data: summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.', data: null });
    }
});

export { dashboardRouter };
