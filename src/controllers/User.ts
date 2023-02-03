import _ from "lodash";
import {
	getUserByEmail,
	updateUserPassword,
	getPasswordByEmail,
	followWalletOfShark,
	unfollowWalletOfShark,
	getListOfSharkFollowed,
	addNewShark,
	deleteSharkNotFound
} from "../services/crudDatabase/user";
import {
	getUserProfile,
	updateUserProfile,
	upgradeUserPremiumAccount
} from "../services/crudDatabase/admin";
import {
	validateUpdateProfileBody,
	validateChangePasswordBody
} from "../validators/user";
import { cryptPassword, comparePassword } from "../helpers";
import { RequestFunction } from "../types";

const UserController = {
	getUserProfile: async ({ req, res, next }: RequestFunction) => {
		let userId = req.query.userId as string;

		await getUserProfile(Number(userId))
			.then((data) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					data: {}
				})
			);
	},

	updateUserProfile: async ({ req, res, next }: RequestFunction) => {
		let userId: any = req.query.userId;

		if (!userId) userId = null;
		else {
			const userIdCheck = _.toString(userId);
			if (_.isNaN(userIdCheck)) userId = undefined;
			else userId = Number(userIdCheck);
		}

		const { status, error } = await validateUpdateProfileBody(req);

		if (status === "failed")
			return res.json({ message: error, error: error });
		else {
			const updateInfo = req.body;
			await updateUserProfile(userId, updateInfo)
				.then((data) =>
					data === "success"
						? res.json({
								message: "successfully",
								error: null
						  })
						: res.json({
								message: data,
								error: data
						  })
				)
				.catch((error) =>
					res.json({
						message: "failed",
						error: error
					})
				);
		}
	},

	changePassword: async ({ req, res, next }: RequestFunction) => {
		const { status, error } = await validateChangePasswordBody(req);

		if (status === "failed")
			return res.json({ message: error, error: error });
		else {
			const { email, oldPassword, newPassword } = req.body;
			const user = await getUserByEmail(email);

			if (user) {
				// Check correct old password
				const password = (await getPasswordByEmail(email)) || "";
				
				comparePassword(
					oldPassword,
					password,
					async (_error, isPasswordMatch) => {
						if (isPasswordMatch) {
							cryptPassword(
								newPassword,
								async (error, hashPassword) => {
									(await updateUserPassword(
										user?.userId,
										hashPassword
									)) === true
										? res.json({
												message: "successfully",
												error: null
										  })
										: res.json({
												message: "failed",
												error: error
										  });
								}
							);
						} else {
							return res.json({
								message: "incorrect-oldpassword",
								error: "incorrect-oldpassword"
							});
						}
					}
				);
			} else {
				return res.json({
					message: "user-notfound",
					error: "user-notfound"
				});
			}
		}
	},

	upgradePremiumAccount: async ({ req, res, next }: RequestFunction) => {
		let userId = req.body.userId;

		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}

		await upgradeUserPremiumAccount(userId)
			.then((data) =>
				data === "success"
					? res.json({
							message: "successfully",
							error: null
					  })
					: res.json({
							message: data,
							error: data
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error
				})
			);
	},

	followSharkWallet: async ({ req, res, next }: RequestFunction) => {
		let { userId, sharkId } = req.body;

		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}

		if (!sharkId) sharkId = null;
		else {
			if (isNaN(sharkId)) sharkId = undefined;
			else sharkId = Number(sharkId);
		}

		await followWalletOfShark(userId, sharkId)
			.then((data) => {
				if (data.message === "success")
					return res.json({
						message: "successfully",
						error: null,
						data: data.data
					});
				else
					return res.json({
						message: data.message,
						error: data.message
					});
			})
			.catch((error) =>
				res.json({
					message: "failed",
					error: error
				})
			);
	},

	unfollowSharkWallet: async ({ req, res, next }: RequestFunction) => {
		let { userId, sharkId } = req.body;

		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}

		if (!sharkId) sharkId = null;
		else {
			if (isNaN(sharkId)) sharkId = undefined;
			else sharkId = Number(sharkId);
		}

		await unfollowWalletOfShark(userId, sharkId)
			.then((data) => {
				if (data.message === "success")
					return res.json({
						message: "successfully",
						error: null,
						data: data.data
					});
				else
					return res.json({
						message: data.message,
						error: data.error
					});
			})
			.catch((error) =>
				res.json({
					message: "failed",
					error: error
				})
			);
	},

	getSharkFollowed: async ({ req, res, next }: RequestFunction) => {
		let userId: any = req.query.userId;
		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}
		await getListOfSharkFollowed(userId)
			.then((data) => {
				data.message === "success"
					? res.json({
							message: "successfully",
							error: null,
							datasLength: data?.datas?.length,
							datas: data.datas
					  })
					: res.json({
							message: data.message,
							error: data.message,
							datasLength: 0,
							datas: []
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

	addNewShark: async ({ req, res, next }: RequestFunction) => {
		let { walletAddress, userId } = req.body;

		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}

		await addNewShark(walletAddress, userId)
			.then((data) => {
				data.isAdded
					? res.json({
							message: data.message,
							data: data.data,
							sharkAdded: data.sharkAdded,
							error: null
					  })
					: res.json({
							message: "add-failed",
							error: data.message
					  });
			})
			.catch((error) =>
				res.json({
					message: error.message,
					error: error.error
				})
			);
	},

	deleteSharkNotFound: async ({ req, res, next }: RequestFunction) => {
		let { walletAddress, userId } = req.body;

		if (!userId) userId = null;
		else {
			if (isNaN(userId)) userId = undefined;
			else userId = Number(userId);
		}

		await deleteSharkNotFound(walletAddress, userId)
			.then((data) => {
				data.isDeleted
					? res.json({
							message: data.message,
							error: null
					  })
					: res.json({
							message: "deleted-failed",
							error: data.message
					  });
			})
			.catch((error) =>
				res.json({
					message: error.message,
					error: error.error
				})
			);
	}
};

export default UserController;
