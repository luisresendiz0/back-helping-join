import { Router } from "express";
import controller from "./auth.controller";

const router = Router();

router.post("/signup-beneficiado", controller.signupBeneficiado);

export default router;
