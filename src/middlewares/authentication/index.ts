import { isAuthed } from "../../services/authentication";
import { Request, Response } from "express";
type Next = () => void | Promise<void>;

const isAuth = async (req: Request, res: Response, next: Next) => {
	try {
		if (!(await isAuthed(req, res, next))) {
			return res.status(403).json({
				message: "access-denied unauthorized",
				error: "access-denied unauthorized"
			});
		}

		next();
	} catch (e) {
		return res.status(403).json({
			message: "access-denied unauthorized",
			error: "access-denied unauthorized"
		});
	}
};

const isAdmin = async (req: Request, res: Response, next: Next) => {
	// try {
	// 	if (req.user.role !== "admin") {
	// 		return res.status(403).json({
	// 			message: "access-denied admin-resource",
	// 			error: "access-denied admin-resource"
	// 		});
	// 	}
	// 	next();
	// } catch (e) {
	// 	return res.status(403).json({
	// 		message: "access-denied admin-resource",
	// 		error: "access-denied admin-resource"
	// 	});
	// }
};

export { isAuth, isAdmin };
