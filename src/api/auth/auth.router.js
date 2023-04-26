import { Router } from "express";
import controller from "./auth.controller";

const router = Router();

router.post("/signup-beneficiado", controller.signupBeneficiado);
router.post("/signin-beneficiado", controller.signinBeneficiado);
router.post("/signup-voluntario", controller.signupVoluntario);
router.post("/signin-voluntario", controller.signinVoluntario);

export default router;
