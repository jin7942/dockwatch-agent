import { Router } from 'express';
import { ServerController } from '../controller/server-http.controller';
import { asyncHandler } from '../../common/middleware/async-handler';

const serverRouter: Router = Router();
const serverController: ServerController = new ServerController();

// GET /api/server/info
serverRouter.get('/info', asyncHandler(serverController.getSysInfo));

// GET /api/server/network-interfaces
serverRouter.get('/network-interfaces', asyncHandler(serverController.getSysNetworkInfo));

// GET /api/server/container-disk
serverRouter.get('/container-disk', asyncHandler(serverController.getDiskUsageByContainer));

// GET /api/server/mount-disk
serverRouter.get('/mount-disk', asyncHandler(serverController.getDiskUsageByMount));

export { serverRouter };
