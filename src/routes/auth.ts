import express from "express";
import routerFunc = express.Router;
const router = routerFunc();
import { AuthController } from "../controllers/Auth";

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
