import { Router } from "express";
import controller from "./beneficiado.controller";

const router = Router();

router.put("/categorias", controller.modificarCategorias);
router.delete("/delete/:beneficiadoId", controller.deleteBeneficiado);
router.put("/updatePassword", controller.updatePassword);
router.put("/update", controller.updateBeneficiado);

export default router;
