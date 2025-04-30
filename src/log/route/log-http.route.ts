import { asyncHandler } from '../../common/middleware/async-handler';
import { LogController } from './../controller/log-http.controller';
import { Router } from 'express';

const logRouter: Router = Router();
const logController: LogController = new LogController();

logRouter.get('/active', asyncHandler(logController.getRunningContainers));

export { logRouter };
