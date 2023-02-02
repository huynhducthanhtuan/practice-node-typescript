import {
	createNewUser,
	checkExistedUsername,
	checkExistedEmail,
	getPasswordByUsername,
	getUserByUsername
} from "../services/crudDatabase/user";
import { cryptPassword, comparePassword } from "../helpers";
import { isAuthed, generateAccessToken } from "../services/authentication";
import { validateSignUpBody, validateSignInBody } from "../validators/user";
import { RequestFunction } from "../types";

const TI_AUTH_COOKIE = process.env.TI_AUTH_COOKIE || "";

const AuthController = {
	signup: async ({ req, res, next }: RequestFunction) => {
		const { username, email, phoneNumber, password } = req.body;
		const { status, error } = await validateSignUpBody(req);

		if (status === "failed")
			return res.json({ message: error, error: error });

		if (await checkExistedUsername(username))
			return res.json({
				message: "username-existed",
				error: "username-existed"
			});

		if (await checkExistedEmail(email))
			return res.json({
				message: "email-existed",
				error: "email-existed"
			});

		cryptPassword(password, async (error, hashPassword) =>
			(await createNewUser({
				username,
				email,
				phoneNumber,
				hashPassword
			})) == true
				? res.json({
						message: "successfully",
						error: null
				  })
				: res.json({
						message: "failed",
						error: error
				  })
		);
	},

	// Comment
	signin: async ({ req, res, next }: RequestFunction) => {
		const { username, password } = req.body;
		const { status, error } = await validateSignInBody(req);

		if (status === "failed")
			return res.json({
				message: error,
				error: error,
				user: null
			});

		if (!(await checkExistedUsername(username))) {
			return res.json({
				message: "username-notfound",
				error: "username-notfound",
				user: null
			});
		} else {
			const hashPassword = (await getPasswordByUsername(username)) || "";
			comparePassword(
				password,
				hashPassword,
				async (error, isPasswordMatch) => {
					if (isPasswordMatch) {
						const user = await getUserByUsername(username);
						const cookie = req.cookies[TI_AUTH_COOKIE];

						if (!cookie) {
							const accessToken = await generateAccessToken({
								username
							});

							res.cookie(TI_AUTH_COOKIE, accessToken, {
								// Expire in 1 week
								maxAge: 604800000
							});

							return res.json({
								message: "successfully",
								error: null,
								user: {
									role: "user",
									username: user?.username,
									// userId: user?.userId,
									email: user?.email
								}
							});
						} else {
							if (await isAuthed(req)) {
								return res.json({
									message: "successfully",
									error: null,
									user: {
										role: "user",
										username: user?.username,
										// userId: user?.userId,
										email: user?.email
									}
								});
							} else {
								return res.json({
									message: "failed-unauthorized",
									error: "failed-unauthorized",
									user: null
								});
							}
						}
					} else {
						return res.json({
							message: "incorrect-password",
							error: "incorrect-password",
							user: null
						});
					}
				}
			);
		}
	},

	// Comment
	signout: ({ req, res, next }: RequestFunction) => {
		// req: IUserSignOutRequest
		try {
			// req.user = null;
			// req.session = null;

			return res.json({ message: "successfully", error: null });
		} catch (error) {
			return res.json({ message: "failed", error: error });
		}
	}
};

export { AuthController };
