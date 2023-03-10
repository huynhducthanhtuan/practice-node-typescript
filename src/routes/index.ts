import { Express } from "express";
import { RequestFunction } from "./../types";
import authRouter from "./auth";
import forgotPasswordRouter from "./forgotPassword";
import userRouter from "./user";
import displayRouter from "./display";
import adminRouter from "./admin";

function routing(app: Express) {
	/* User routes */
	app.use("/auth", authRouter);
	app.use("/forgot-password", forgotPasswordRouter);
	app.use("/display", displayRouter);
	app.use("/user", userRouter);

	/* Admin routes */
	app.use("/admin", adminRouter);

	/* Notfound routes */
	app.use("*", ({ req, res, next }: RequestFunction) => {
		res.json({
			message: "not-found",
			error: "not-found"
		});
	});
}

export default routing;
