import express from "express";
import routerFunc = express.Router;
const router = routerFunc();
import { ForgotPasswordController } from "../controllers/ForgotPassword";

router.post("/submit-email", ForgotPasswordController.submitEmail);
router.post("/submit-code", ForgotPasswordController.submitCode);
router.post("/resend-code", ForgotPasswordController.submitEmail);
router.post("/create-new-password", ForgotPasswordController.createNewPassword);

export default router;
