import signupBeneficiado from "./controllers/signupBeneficiado";
import signinBeneficiado from "./controllers/signinBeneficiado";
import signupVoluntario from "./controllers/signupVoluntario";
import signinVoluntario from "./controllers/signinVoluntario";
import signInModerador from "./controllers/signInModerador";
import updateModeradorPassword from "./controllers/updateModeradorPassword";

const controller = {
  signupBeneficiado,
  signinBeneficiado,
  signupVoluntario,
  signinVoluntario,
  signInModerador,
  updateModeradorPassword,
};

export default controller;
