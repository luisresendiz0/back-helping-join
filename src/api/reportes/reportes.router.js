
import { Router } from 'express';
import reportesController from './reportes.controller';

const reportesRouter = Router();

reportesRouter.post('/create', reportesController.createReporte);

export default reportesRouter;