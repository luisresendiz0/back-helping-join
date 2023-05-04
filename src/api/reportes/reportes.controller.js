import { createReporte } from "./controllers/createReporte"
import { getReportes } from "./controllers/getReportes"
import { getReportesByEventoId } from "./controllers/getReportesByEventoId"


const reportesController = {
  createReporte,
  getReportes,
  getReportesByEventoId
}

export default reportesController;