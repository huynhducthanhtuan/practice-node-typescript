import { Request } from "express";
import {
	validateUsername,
	validateEmail,
	validateEmailOptional,
	validatePhoneNumber,
	validatePhoneNumberOptional,
	validatePassword,
	validateConfirmPassword,
	validateCode,
	validateOldPassword,
	validateNewPassword,
	validateNewConfirmPassword,
	validateFullNameOptional,
	validateWebsiteOptional,
	validateAvatarOptional,
	returnValidationResult
} from "./index";

const validateSignUpBody = async (req: Request) => {
	await validateUsername(req);
	await validateEmail(req);
	await validatePhoneNumber(req);
	await validatePassword(req);
	await validateConfirmPassword(req);
	return returnValidationResult(req);
};

const validateSignInBody = async (req: Request) => {
	await validateUsername(req);
	await validatePassword(req);
	return returnValidationResult(req);
};

const validateSubmitEmailBody = async (req: Request) => {
	await validateEmail(req);
	return returnValidationResult(req);
};

const validateSubmitCodeBody = async (req: Request) => {
	await validateEmail(req);
	await validateCode(req);
	return returnValidationResult(req);
};

const validateCreateNewPasswordBody = async (req: Request) => {
	await validateEmail(req);
	await validatePassword(req);
	await validateConfirmPassword(req);
	return returnValidationResult(req);
};

const validateChangePasswordBody = async (req: Request) => {
	await validateEmail(req);
	await validateOldPassword(req);
	await validateNewPassword(req);
	await validateNewConfirmPassword(req);
	return returnValidationResult(req);
};

const validateUpdateProfileBody = async (req: Request) => {
	// await validateFullNameOptional(req);
	await validateEmailOptional(req);
	await validatePhoneNumberOptional(req);
	await validateWebsiteOptional(req);
	await validateAvatarOptional(req);
	return returnValidationResult(req);
};

export {
	validateSignUpBody,
	validateSignInBody,
	validateSubmitEmailBody,
	validateSubmitCodeBody,
	validateCreateNewPasswordBody,
	validateChangePasswordBody,
	validateUpdateProfileBody
};
