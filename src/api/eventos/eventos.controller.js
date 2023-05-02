import { getAllEventos } from "./controllers/getAllEventos";
import { createEvento } from "./controllers/createEvento";
import { getEventoById } from "./controllers/getEventoById";

const controller = {
	getAllEventos,
	createEvento,
	getEventoById
}

export default controller;