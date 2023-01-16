import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};

export type RequestFunction = {
	req: Request;
	res: Response;
	next: NextFunction;
};

export type RequestMiddlewares = {
	err: any;
	req: Request;
	res: Response;
	next: NextFunction;
};

export interface IUserSignOutRequest extends Request {
	user: string | null;
	session: object | null;
}

export interface ICreateNewUser {
	username: string | null;
	email: string | null;
	phoneNumber: string | null;
	hashPassword: string | null | undefined;
}
