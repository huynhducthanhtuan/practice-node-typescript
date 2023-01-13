import { Express, Response } from "express";
import authRouter from "./auth";
import forgotPasswordRouter from "./forgotPassword";
import userRouter from "./user";
import displayRouter from "./display";
import adminRouter from "./admin";

function routing(app: Express) {
	/**
	 * @swagger
	 * tags:
	 *   name: Authentiation
	 *   name: Forgot Password
	 *   name: Coin - Token
	 *   name: Shark
	 *   name: Gain and Loss
	 *   name: User
	 *   name: Admin
	 *   name: Others
	 */

	/* User routes */
	app.use("/auth", authRouter);
	app.use("/forgot-password", forgotPasswordRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);

	/* Admin routes */
	app.use("/admin", adminRouter);

	/* Notfound routes */
	app.use("*", (res: Response) => {
		res.status(404).json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;
