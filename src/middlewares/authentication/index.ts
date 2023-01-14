import { isAuthed } from "../../services/authentication";
import { RequestFunction } from "../../types";

const isAuth = async ({ req, res, next }: RequestFunction) => {
	// try {
	// 	if (!(await isAuthed(req))) {
	// 		return res.status(403).json({
	// 			message: "access-denied unauthorized",
	// 			error: "access-denied unauthorized"
	// 		});
	// 	}

	next();
	// } catch (error) {
	// 	return res.status(403).json({
	// 		message: "access-denied unauthorized",
	// 		error: "access-denied unauthorized"
	// 	});
	// }
};

const isAdmin = async ({ req, res, next }: RequestFunction) => {
	// try {
	// 	if (req.user.role !== "admin") {
	// 		return res.status(403).json({
	// 			message: "access-denied admin-resource",
	// 			error: "access-denied admin-resource"
	// 		});
	// 	}
	next();
	// } catch (error) {
	// 	return res.status(403).json({
	// 		message: "access-denied admin-resource",
	// 		error: "access-denied admin-resource"
	// 	});
	// }
};

export { isAuth, isAdmin };
