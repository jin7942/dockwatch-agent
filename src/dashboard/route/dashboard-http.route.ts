import { DashboardController } from './../controller/dashboard-http.controller';
import { asyncHandler } from '../../common/middleware/async-handler';
import { Router } from 'express';

const dashboardRouter: Router = Router();
const dashboardController: DashboardController = new DashboardController();

export { dashboardRouter };
