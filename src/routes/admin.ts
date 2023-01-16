import express from "express";
import routerFunc = express.Router;
const router = routerFunc();
import { AdminController } from "../controllers/Admin";
import { isAdmin } from "../middlewares/authentication";

router.post("/signin", AdminController.signin);
router.post("/signout", AdminController.signout);

router.get("/list", isAdmin, AdminController.getAdminsList);
router.post("/delete-users", isAdmin, AdminController.deleteUsers);
router.get("/user/list", isAdmin, AdminController.getUsersList);
router.get("/user/details", isAdmin, AdminController.getUserDetail);

export default router;
