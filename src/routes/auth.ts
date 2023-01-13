import express from "express";
import routerFunc = express.Router;
const router = routerFunc();
import { AuthController } from "../controllers/Auth";

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Sign Up
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phoneNumber
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                  type: string
 *               email:
 *                  type: string
 *               phoneNumber:
 *                  type: string
 *               password:
 *                  type: string
 *               confirmPassword:
 *                  type: string
 *             example:
 *               username: "hieuhn"
 *               email: "hieuhn@gmail.com"
 *               phoneNumber: "0366871673"
 *               password: "12345678"
 *               confirmPassword: "12345678"
 *     responses:
 *       200:
 *         description: Sign up successfully
 *       400:
 *         description: Sign up failed
 */
router.post("/signup", AuthController.signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Sign In
 *     tags: [Authentication]
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
 *       404:
 *         description: Not found
 */
router.post("/signin", AuthController.signin);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     description: Sign Out
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Sign out successfully
 *       400:
 *         description: Sign out failed
 */
router.post("/signout", AuthController.signout);

export default router;
