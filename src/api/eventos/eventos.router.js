import { Router } from "express";
import controller from "./eventos.controller";

const router = Router();

router.get("/", controller.getAllEventos);
router.post("/create", controller.createEvento);
router.get("/detail", controller.getEventoById);
router.post("/update-interest", controller.updateEventoInterest);
router.delete("/delete", controller.deleteEvento);
router.get("/interes", controller.getEventosInteres);
router.get("/interes-pasados", controller.getPastEventosInteres);
router.get("/beneficiado/:beneficiadoId", controller.getEventosByBeneficiadoId);
router.put("/update", controller.updateEvento);

export default router;