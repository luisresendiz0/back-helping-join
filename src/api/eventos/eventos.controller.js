import { getAllEventos } from "./controllers/getAllEventos";
import { createEvento } from "./controllers/createEvento";
import { getEventoById } from "./controllers/getEventoById";
import { updateEventoInterest } from "./controllers/updateEventoInterest";

const controller = {
	getAllEventos,
	createEvento,
	getEventoById,
	updateEventoInterest
}

export default controller;