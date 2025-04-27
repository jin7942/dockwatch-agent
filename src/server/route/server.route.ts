import { Router } from 'express';
import { ServerController } from '../controller/server.controller';

const serverRouter = Router();
const serverController = new ServerController();

// GET /api/server/info
serverRouter.get('/info', serverController.getSysInfo.bind(serverController));

// GET /api/server/network-interfaces
serverRouter.get('/network-interfaces', serverController.getSysNetworkInfo.bind(serverController));

// GET /api/server/container-disk
serverRouter.get(
    '/container-disk',
    serverController.getDiskUsageByContainer.bind(serverController),
);
// GET /api/server/mount-disk
serverRouter.get('/mount-disk', serverController.getDiskUsageByMount.bind(serverController));

export { serverRouter };
