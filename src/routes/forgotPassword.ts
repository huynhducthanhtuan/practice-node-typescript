import { ForgotPasswordController } from "../controllers/ForgotPassword";
import { Router } from "express";
const router = Router();

router.post("/submit-email", ForgotPasswordController.submitEmail);
router.post("/submit-code", ForgotPasswordController.submitCode);
router.post("/resend-code", ForgotPasswordController.submitEmail);
router.post("/create-new-password", ForgotPasswordController.createNewPassword);

export default router;
