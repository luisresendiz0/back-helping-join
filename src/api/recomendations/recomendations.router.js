import { Router } from "express";
import recomendationsCotroller from "./recomendations.controller";

const recomendationsRouter = Router();

recomendationsRouter.get("/", recomendationsCotroller.getRecomendations);
recomendationsRouter.get("/generate", recomendationsCotroller.generateRecomendations);

export default recomendationsRouter;