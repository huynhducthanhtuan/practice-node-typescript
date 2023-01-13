import express from "express";
import routerFunc = express.Router;
const router = routerFunc();

import AdminController from "../controllers/Admin";
import { isAdmin } from "../middlewares/authentication";

/**
 * @swagger
 * /admin/signin:
 *   post:
 *     description: Sign In
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: string
 *             example:
 *               username: "hieuhn"
 *               password: "12345678"
 *     responses:
 *       200:
 *         description: Sign in successfully
 *       400:
 *         description: Sign in failed
 */
router.post("/signin", AdminController.signin);

/**
 * @swagger
 * /admin/signout:
 *   post:
 *     description: Sign Out
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Sign out successfully
 *       400:
 *         description: Sign out failed
 */
router.post("/signout", AdminController.signout);

/**
 * @swagger
 * /admin/list:
 *   get:
 *     description: Get list of admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Get list of admins successfully
 *       400:
 *         description: Get list of admins failed
 */
router.get("/list", AdminController.getAdminsList);
// router.get("/list", isAdmin, AdminController.getAdminsList);

/**
 * @swagger
 * /admin/delete-users:
 *   post:
 *     description: Delete user
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                  type: array
 *             example:
 *               ids: [1,2,3]
 *     responses:
 *       200:
 *         description: Delete users successfully
 *       400:
 *         description: Delete users failed
 */
router.post("/delete-users", AdminController.deleteUsers);
// router.post("/delete-users", isAdmin, AdminController.deleteUser);

/**
 * @swagger
 * /admin/user/list:
 *   get:
 *     description: Get list of users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Get list of users successfully
 *       400:
 *         description: Get list of users failed
 */
router.get("/user/list", AdminController.getUsersList);
// router.get("/user/list", isAdmin, AdminController.getUsersList);

/**
 * @swagger
 * /admin/user/details:
 *   get:
 *     description: Get detail user
 *     tags: [Admin]
 *     parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get detail user successfully
 *       400:
 *         description: Get detail user failed
 */
router.get("/user/details", AdminController.getUserDetail);
// router.get("/user/details", isAdmin, AdminController.getUserDetail);

export default router;
