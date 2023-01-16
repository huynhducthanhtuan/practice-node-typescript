import { Request, Response } from "express";
import { UserModel } from "../../models";

import jwt from "jsonwebtoken";
import { promisify } from "util";
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_ACCESS_TOKEN_SECRET =
	process.env.REFRESH_ACCESS_TOKEN_SECRET || "";
const ENCODE_ALGORITHM = process.env.ENCODE_ALGORITHM || "";

// Comment
const generateAccessToken = async (payloadData: Object) => {
	// try {
	// 	const accessToken = await sign(payloadData, ACCESS_TOKEN_SECRET, {
	// 		algorithm: ENCODE_ALGORITHM,
	// 		expiresIn: "7d"
	// 	});
	// 	return accessToken;
	// } catch (error) {
	// 	return null;
	// }
};

// Comment
const generateRefreshAccessToken = async (payloadData: Object) => {
	// try {
	// 	const refreshAccessToken = await sign(
	// 		payloadData,
	// 		REFRESH_ACCESS_TOKEN_SECRET,
	// 		{
	// 			algorithm: ENCODE_ALGORITHM,
	// 			expiresIn: "7d"
	// 		}
	// 	);
	// 	return refreshAccessToken;
	// } catch (error) {
	// 	return null;
	// }
};

// Comment
const refreshAccessToken = async (refreshToken: string, userId: number) => {
	// try {
	// 	const refreshAccessToken = await decodeToken(
	// 		refreshToken,
	// 		REFRESH_ACCESS_TOKEN_SECRET
	// 	);
	// 	const user = await UserModel.find({ userId: userId }).select(
	// 		"accessToken refreshAccessToken username -_id"
	// 	);
	// 	// Check valid refreshToken
	// 	if (user?.refreshAccessToken !== refreshAccessToken) return null;
	// 	// Generate new tokens
	// 	const payloadData = {
	// 		username: user?.username
	// 	};
	// 	const newAccessToken = await generateAccessToken(payloadData);
	// 	const newRefreshAccessToken = await generateRefreshAccessToken(
	// 		payloadData
	// 	);
	// 	return { newAccessToken, newRefreshAccessToken };
	// } catch (error) {
	// 	return null;
	// }
};

// Comment
const decodeToken = async (token: string, secretKey: string) => {
	// try {
	// 	return await verify(token, secretKey, {
	// 		ignoreExpiration: true
	// 	});
	// } catch (error) {
	// 	return undefined;
	// }
};

// Comment
const isAuthed = async (req: Request) => {
	// const accessTokenHeader = req.headers.authorization;
	// if (!accessTokenHeader) return false;

	// const cookie = req.cookies.TI_AUTH_COOKIE;
	// const decodeValue1 = await decodeToken(
	// 	accessTokenHeader,
	// 	ACCESS_TOKEN_SECRET
	// );

	// const decodeValue2 = await decodeToken(cookie, ACCESS_TOKEN_SECRET);

	// if (!decodeValue1 || !decodeValue2) return false;

	// if (decodeValue1.username !== decodeValue2.username) return false;

	return true;
};

export {
	generateAccessToken,
	generateRefreshAccessToken,
	refreshAccessToken,
	decodeToken,
	isAuthed
};
