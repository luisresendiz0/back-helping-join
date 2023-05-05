
import { Router } from 'express';
import reportesController from './reportes.controller';

const reportesRouter = Router();

reportesRouter.post('/create', reportesController.createReporte);
reportesRouter.get('/', reportesController.getReportes);
reportesRouter.get('/evento', reportesController.getReportesByEventoId);
reportesRouter.put('/update-status', reportesController.updateReporteStatus);

export default reportesRouter;