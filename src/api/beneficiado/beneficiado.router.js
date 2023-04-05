import { Router } from "express";
import controller from "./beneficiado.controller";

const router = Router();

router.put("/categorias", controller.modificarCategorias);

export default router;
