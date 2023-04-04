import { Router } from "express";
import controller from "./eventos.controller";

const router = Router();

router.get("/", controller.getAllEventos);

export default router;