import { Router } from "express";
import controller from "./auth.controller";

const router = Router();

router.post("/signup-beneficiado", controller.signupBeneficiado);
router.post("/signin-beneficiado", controller.signinBeneficiado);

export default router;
