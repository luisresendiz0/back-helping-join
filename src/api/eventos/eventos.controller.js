import { getAllEventos } from "./controllers/getAllEventos";
import { createEvento } from "./controllers/createEvento";
import { getEventoById } from "./controllers/getEventoById";
import { updateEventoInterest } from "./controllers/updateEventoInterest";
import { deleteEvento } from "./controllers/deleteEvento";
import { getEventosInteres } from "./controllers/getEventosInteres";
import { getPastEventosInteres } from "./controllers/getPastEventosInteres";
import { getEventosByBeneficiadoId } from "./controllers/getEventosByBeneficiadoId";

const controller = {
	getAllEventos,
	createEvento,
	getEventoById,
	updateEventoInterest,
	deleteEvento,
	getEventosInteres,
	getPastEventosInteres,
	getEventosByBeneficiadoId
}

export default controller;