import { getAllEventos } from "./controllers/getAllEventos";
import { createEvento } from "./controllers/createEvento";
import { getEventoById } from "./controllers/getEventoById";
import { updateEventoInterest } from "./controllers/updateEventoInterest";
import { deleteEvento } from "./controllers/deleteEvento";

const controller = {
	getAllEventos,
	createEvento,
	getEventoById,
	updateEventoInterest,
	deleteEvento
}

export default controller;