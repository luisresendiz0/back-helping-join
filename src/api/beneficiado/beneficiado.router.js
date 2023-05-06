import { Router } from "express";
import controller from "./beneficiado.controller";

const router = Router();

router.put("/categorias", controller.modificarCategorias);
router.delete("/delete/:beneficiadoId", controller.deleteBeneficiado);

export default router;
