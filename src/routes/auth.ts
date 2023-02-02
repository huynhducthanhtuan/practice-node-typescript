import AuthController from "../controllers/Auth";
import { Router } from "express";
const router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
