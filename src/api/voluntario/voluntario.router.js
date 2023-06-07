import { Router } from "express";
import voluntarioController from "./voluntario.controller";

const vountarioRouer = Router();

vountarioRouer.put("/update", voluntarioController.updatePerfil);
vountarioRouer.get("/:voluntarioId", voluntarioController.getVoluntarioById);
vountarioRouer.put("/updatePassword", voluntarioController.updatePassword);
vountarioRouer.delete("/delete", voluntarioController.deleteVoluntarioById);

export default vountarioRouer;
