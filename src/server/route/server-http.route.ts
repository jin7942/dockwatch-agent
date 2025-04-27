import { Router } from 'express';
import { ServerController } from '../controller/server-http.controller';

const serverRouter = Router();
const serverController = new ServerController();

// GET /api/server/info
serverRouter.get('/info', serverController.getSysInfo);

// GET /api/server/network-interfaces
serverRouter.get('/network-interfaces', serverController.getSysNetworkInfo);

// GET /api/server/container-disk
serverRouter.get('/container-disk', serverController.getDiskUsageByContainer);

// GET /api/server/mount-disk
serverRouter.get('/mount-disk', serverController.getDiskUsageByMount);

export { serverRouter };
