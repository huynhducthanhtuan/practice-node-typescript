import { Request } from "express";
import {
	validateUsername,
	validatePassword,
	returnValidationResult
} from "./index";

const validateSignInBody = async (req: Request) => {
	await validateUsername(req);
	await validatePassword(req);
	return returnValidationResult(req);
};

export { validateSignInBody };
