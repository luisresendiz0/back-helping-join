import { Router } from "express";
import controller from "./eventos.controller";

const router = Router();

router.get("/", controller.getAllEventos);
router.post("/create", controller.createEvento);
router.get("/:id", controller.getEventoById);

export default router;