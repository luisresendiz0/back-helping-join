import updatePerfil from "./controllers/updatePerfil";
import getVoluntarioById from "./controllers/getVoluntarioById";
import updatePassword from "./controllers/updatePassword";
import deleteVoluntarioById from "./controllers/deleteVoluntarioById";

const voluntarioController = {
  updatePerfil,
  getVoluntarioById,
  updatePassword,
  deleteVoluntarioById
};

export default voluntarioController;
