import { AdminModel, UserModel } from "../../models";
import { checkExistedUserId } from "./user";

const getListOfAdmins = async () => {
	return await AdminModel.find({})
		.sort("id")
		.select("id username email -_id")
		.lean();
};

const getListOfUsers = async () => {
	return await UserModel.find({})
		.sort("id")
		.select(
			"userId username email phoneNumber fullName avatar website sharksFollowed updatedAt createdAt -_id"
		)
		.lean();
};

const getUserProfile = async (userId: number | null | undefined) => {
	if (!userId) return {};
	else {
		const user = await UserModel.findOne({ userId: userId })
			.select(
				"userId username email phoneNumber fullName avatar website sharksFollowed updatedAt createdAt -_id"
			)
			.lean();

		if (!user) return {};
		else return user;
	}
};

const checkExistedUsernameForUpdateProfile = async (
	userId: number,
	username: string
) => {
	const user = await UserModel.findOne({ username: username }).lean();
	if (user && user?.userId !== userId) return true;
	else return false;
};

const checkExistedEmailForUpdateProfile = async (
	userId: number,
	email: string
) => {
	const user = await UserModel.findOne({ email: email }).lean();
	if (user && user?.userId !== userId) return true;
	else return false;
};

const updateUserProfile = async (
	userId: number,
	updateInfo: {
		fullName: string;
		email: string;
		phoneNumber: string;
		website: string;
		avatar: string;
	}
) => {
	try {
		if (!userId) return "userid-required";
		else {
			const { fullName, email, phoneNumber, website, avatar } =
				updateInfo;

			if (!(await checkExistedUserId(userId))) return "user-notfound";

			if (
				email &&
				(await checkExistedEmailForUpdateProfile(userId, email))
			)
				return "email-existed";

			const newUpdateInfo = {
				fullName: fullName === "" ? undefined : fullName,
				email: email === "" ? undefined : email,
				phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
				website: website === "" ? undefined : website,
				avatar: avatar === "" ? undefined : avatar
			};

			await UserModel.findOneAndUpdate({ userId: userId }, newUpdateInfo)
				.lean()
				.then((data) => {
					if (!data) throw new Error();
				})
				.catch((error) => {
					throw new Error(error);
				});

			return "success";
		}
	} catch (error) {
		return "error";
	}
};

const upgradeUserPremiumAccount = async (userId: number) => {
	try {
		if (userId === null) return "userid-required";
		if (userId === undefined) return "userid-invalid";
		if (!(await checkExistedUserId(userId))) return "user-notfound";

		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ premiumAccount: true }
		)
			.lean()
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return "success";
	} catch (error) {
		return "error";
	}
};

const checkExistedUsername = async (username: string) => {
	const isExisted = await AdminModel.exists({ username: username }).lean();
	return Boolean(isExisted);
};

const getPasswordByUsername = async (username: string) => {
	const admin = await AdminModel.findOne({ username: username })
		.select("password -_id")
		.lean();
	return admin?.password || null;
};

const getAdminByUsername = async (username: string) => {
	return await AdminModel.findOne({ username: username }).lean();
};

const deleteUsersByUserId = async (userIds: any) => {
	try {
		const deletedObj = await UserModel.remove({
			userId: { $in: userIds }
		}).lean();

		return deletedObj.deletedCount > 0;
	} catch (error) {
		return false;
	}
};

export {
	getListOfAdmins,
	getListOfUsers,
	getUserProfile,
	checkExistedUsername,
	checkExistedUsernameForUpdateProfile,
	checkExistedEmailForUpdateProfile,
	updateUserProfile,
	upgradeUserPremiumAccount,
	getPasswordByUsername,
	getAdminByUsername,
	deleteUsersByUserId
};
