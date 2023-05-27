import { Router } from "express";
import controller from "./auth.controller";

const router = Router();

router.post("/signup-beneficiado", controller.signupBeneficiado);
router.post("/signin-beneficiado", controller.signinBeneficiado);
router.post("/signup-voluntario", controller.signupVoluntario);
router.post("/signin-voluntario", controller.signinVoluntario);
router.post("/signin-moderador", controller.signInModerador);
router.put("/update-moderador-password", controller.updateModeradorPassword);
router.get("/verify/beneficiado/:id", controller.verifyBeneficiado);
router.get("/verify/voluntario/:id", controller.verifyVoluntario);

export default router;
