import { Request, Response, NextFunction } from "express";

export type RequestFunction = {
	req: Request;
	res: Response;
	next: NextFunction;
};

export interface IUserSignOutRequest extends Request {
	user: string | null;
	session: object | null;
}