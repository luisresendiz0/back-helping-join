import { createReporte } from "./controllers/createReporte"
import { getReportes } from "./controllers/getReportes"
import { getReportesByEventoId } from "./controllers/getReportesByEventoId"
import { updateReporteStatus } from "./controllers/updateReporteStatus"


const reportesController = {
  createReporte,
  getReportes,
  getReportesByEventoId,
  updateReporteStatus
}

export default reportesController;