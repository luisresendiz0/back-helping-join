import { Router } from "express";
import voluntarioController from "./voluntario.controller";

const vountarioRouer = Router();

vountarioRouer.put("/update", voluntarioController.updatePerfil);
vountarioRouer.get("/:voluntarioId", voluntarioController.getVoluntarioById);
vountarioRouer.put("/updatePassword", voluntarioController.updatePassword);

export default vountarioRouer;
