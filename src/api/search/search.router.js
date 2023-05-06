
import { Router } from 'express';
import searchController from './search.controller';

const searchRouter = Router();

searchRouter.post('/', searchController.search);

export default searchRouter;