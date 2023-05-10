import { Router } from 'express';
import categoriasController from './categorias.controller';

const categoriasRouter = Router();

categoriasRouter.get('/', categoriasController.getAllCategorias);

export default categoriasRouter;