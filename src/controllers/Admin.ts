import _ from "lodash";
import {
	checkExistedUsername,
	getPasswordByUsername,
	getAdminByUsername,
	getListOfAdmins,
	deleteUsersByUserId,
	getListOfUsers,
	getUserProfile
} from "../services/crudDatabase/admin";
import { comparePassword } from "../helpers";
import { validateSignInBody } from "../validators/admin";
import { RequestFunction, RequestMiddlewares } from "../types";

const AdminController = {
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
						const admin = await getAdminByUsername(username);

						return res.json({
							message: "successfully",
							error: null,
							user: {
								role: "admin",
								username: admin?.username,
								email: admin?.email
							}
						});
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

	signout: async ({ req, res, next }: RequestFunction) => {
		try {
			// req.user = null;
			// req.session = null;

			return res.json({ message: "successfully", error: null });
		} catch (error) {
			return res.json({ message: "failed", error: error });
		}
	},

	getAdminsList: async ({ req, res, next }: RequestFunction) => {
		await getListOfAdmins()
			.then((datas) => {
				datas.length === 0
					? res.json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  });
			})
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	deleteUsers: async ({ req, res, next }: RequestFunction) => {
		try {
			const { ids } = req.body;

			const checkedIds = ids;
			checkedIds.forEach((id: number) => {
				id = Number(id);
				if (_.isNaN(id)) {
					Error.captureStackTrace({});
				}
			});

			const isDeletedSuccessful = await deleteUsersByUserId(checkedIds);

			if (!isDeletedSuccessful)
				return res.json({
					message: "ids-notfound",
					error: "ids-notfound"
				});

			return res.json({ message: "successfully", error: null });
		} catch (error) {
			return res.json({ message: "failed", error: error });
		}
	},

	getUsersList: async ({ req, res, next }: RequestFunction) => {
		await getListOfUsers()
			.then((datas) => {
				datas.length === 0
					? res.json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  });
			})
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getUserDetail: async ({ req, res, next }: RequestFunction) => {
		let userId: number | null | undefined;

		if (!req.query.userId) userId = null;
		else {
			const userIdCheck = _.toString(req.query.userId);
			if (_.isNaN(userIdCheck)) userId = undefined;
			else userId = Number(userIdCheck);
		}

		await getUserProfile(userId)
			.then((data) => {
				Object.entries(data).length === 0
					? res.json({
							message: "failed-userid-invalid",
							error: "userid-invalid",
							data: {}
					  })
					: res.json({
							message: "successfully",
							error: null,
							data: data
					  });
			})
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					data: {}
				})
			);
	}
};

export default AdminController;
