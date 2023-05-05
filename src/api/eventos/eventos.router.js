import { Router } from "express";
import controller from "./eventos.controller";

const router = Router();

router.get("/", controller.getAllEventos);
router.post("/create", controller.createEvento);
router.get("/detail", controller.getEventoById);
router.post("/update-interest", controller.updateEventoInterest);
router.delete("/delete", controller.deleteEvento);

export default router;