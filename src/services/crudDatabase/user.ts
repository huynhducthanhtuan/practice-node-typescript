import {
	UserModel,
	CoinModel,
	InvestorModel,
	TagModel,
	TransactionModel
} from "../../models";
import {
	QUERY_LIMIT_ITEM,
	TRENDING_REDUCING_LIMIT_ITEM
} from "../../constants";
import { ICreateNewUser } from "./../../types";

const getUserByUsername = async (username: string) => {
	return await UserModel.findOne({ username: username }).lean();
};

const getUserByEmail = async (email: string) => {
	return await UserModel.findOne({ email: email }).lean();
};

const getUsersLength = async () => {
	return await UserModel.count({}).lean();
};

const createNewUser = async ({
	username,
	email,
	phoneNumber,
	hashPassword
}: ICreateNewUser) => {
	try {
		const newUserInfo = {
			username: username,
			email: email,
			phoneNumber: phoneNumber,
			password: hashPassword
		};

		await UserModel.create(newUserInfo)
			.then((data) => {})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const updateUserConfirmationCode = async (userId: number, code: string) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ confirmationCode: code }
		)
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const updateUserIsCodeConfirmed = async (
	userId: number,
	isCodeConfirmed: boolean
) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ isCodeConfirmed: isCodeConfirmed }
		)
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const updateUserPassword = async (userId: number, password: string) => {
	try {
		await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ password: password }
		)
			.lean()
			.then((data) => {
				if (!data) throw new Error();
			})
			.catch((error) => {
				throw new Error(error);
			});

		return true;
	} catch (error) {
		return false;
	}
};

const checkExistedUsername = async (username: string) => {
	const isExisted = await UserModel.exists({ username: username }).lean();
	return Boolean(isExisted);
};

const checkExistedEmail = async (email: string) => {
	const isExisted = await UserModel.exists({ email: email }).lean();
	return Boolean(isExisted);
};

const checkExistedUserId = async (userId: number) => {
	const isExisted = await UserModel.exists({ userId: userId }).lean();
	return Boolean(isExisted);
};

const checkExistedSharkId = async (sharkId: number) => {
	const isExisted = await InvestorModel.exists({ sharkId: sharkId }).lean();
	return Boolean(isExisted);
};

const getPasswordByUsername = async (username: string) => {
	const user = await UserModel.findOne({ username: username })
		.select("password -_id")
		.lean();
	return user?.password || null;
};

const getPasswordByEmail = async (email: string) => {
	const user = await UserModel.findOne({ email: email })
		.select("password -_id")
		.lean();
	return user?.password || null;
};

const getListOfCoinsAndTokens = async () => {
	const tokens = await CoinModel.find({})
		.select(
			"coinId name type symbol iconURL tagNames cmcRank usd marketCap circulatingSupply pricesLast1Month -_id"
		)
		.sort("coinId")
		.lean();

	return tokens || [];
};

const getCoinsAndTokensLength = async () => {
	return await CoinModel.count({}).lean();
};

const getListReducingCoinsAndTokens = async () => {
	return await CoinModel.find({})
		.sort({ "usd.percentChange24h": "asc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd pricesLast1Month -_id"
		)
		.lean();
};

const getListTrendingCoins = async () => {
	return await CoinModel.find({ type: "coin" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd marketCap circulatingSupply -_id"
		)
		.lean();
};

const getListTrendingTokens = async () => {
	return await CoinModel.find({ type: "token" })
		.sort({ "usd.percentChange24h": "desc" })
		.limit(TRENDING_REDUCING_LIMIT_ITEM)
		.select(
			"coinId name type symbol iconURL tagNames usd marketCap circulatingSupply -_id"
		)
		.lean();
};

const getCoinOrTokenDetails = async (coinSymbol: string | null | undefined) => {
	const coinOrToken = await CoinModel.findOne({
		symbol: coinSymbol?.toLowerCase()
	})
		.select(
			"coinId ethId coingeckoId name type symbol iconURL cmcRank tagNames maxSupply totalSupply circulatingSupply contractAddress marketCap urls usd prices totalInvestment -_id"
		)
		.lean();

	return coinOrToken || {};
};

const getListOfTags = async () => {
	return await TagModel.find({}).sort("id").select("id name -_id").lean();
};

const getSharksLength = async () => {
	return await InvestorModel.count({}).lean();
};

// Comment
const getListOfSharks = async (userId: string) => {
	const sharks = await InvestorModel.find({ isShark: true })
		.sort("sharkId")
		.select(
			"sharkId walletAddress totalAssets percent24h followers isShark -_id"
		)
		.lean();

	const sharksList = sharks.map((shark) => {
		const isFollowed: boolean = true; // shark.followers.includes(userId);
		let objShark = { ...shark, isFollowed: isFollowed };
		return objShark;
	});

	return sharksList;
};

const followWalletOfShark = async (userId: number, sharkId: number) => {
	try {
		if (userId === null) return { message: "userid-required" };
		if (userId === undefined) return { message: "userid-invalid" };

		if (sharkId === null) return { message: "sharkid-required" };
		if (sharkId === undefined) return { message: "sharkid-invalid" };

		if (!(await checkExistedUserId(userId)))
			return { message: "user-notfound" };
		if (!(await checkExistedSharkId(sharkId)))
			return { message: "shark-notfound" };

		const projection = {
			sharkId: 1,
			walletAddress: 1,
			totalAssets: 1,
			percent24h: 1,
			followers: 1
		};
		const shark = await InvestorModel.findOne(
			{ sharkId: sharkId },
			projection
		);

		const sharkFollowers = shark?.followers;

		if (sharkFollowers && sharkFollowers.some((id) => id === userId))
			return { message: "already-followed" };

		shark?.followers.push(userId);
		shark?.save();

		return {
			message: "success",
			data: { ...shark, isFollowed: true }
		};
	} catch (error) {
		return { message: "error-follow-failed", error: error };
	}
};

// Comment
const unfollowWalletOfShark = async (userId: number, sharkId: number) => {
	// try {
	// 	if (userId === null) return { message: "userid-required" };
	// 	if (userId === undefined) return { message: "userid-invalid" };
	// 	if (sharkId === null) return { message: "sharkid-required" };
	// 	if (sharkId === undefined) return { message: "sharkid-invalid" };
	// 	if (!(await checkExistedUserId(userId)))
	// 		return { message: "user-notfound" };
	// 	if (!(await checkExistedSharkId(sharkId)))
	// 		return { message: "shark-notfound" };
	// 	const projection = {
	// 		sharkId: 1,
	// 		walletAddress: 1,
	// 		totalAssets: 1,
	// 		percent24h: 1,
	// 		followers: 1
	// 	};
	// 	const shark = await InvestorModel.findOne(
	// 		{ sharkId: sharkId },
	// 		projection
	// 	);
	// 	const sharkFollowers = shark.followers;
	// 	if (sharkFollowers && !sharkFollowers.some((id) => id === userId))
	// 		return { message: "not-followed" };
	// 	shark.followers.pull(userId);
	// 	shark.save();
	// 	return {
	// 		message: "success",
	// 		data: { ...shark, isFollowed: false }
	// 	};
	// } catch (error) {
	// 	return { message: "error-unfollow-failed", error: error };
	// }
};

const getListOfSharkFollowed = async (userId: number) => {
	if (userId === null) return { message: "userid-required" };
	if (userId === undefined) return { message: "userid-invalid" };
	if (!(await checkExistedUserId(userId)))
		return { message: "user-notfound" };

	const projection = {
		sharkId: 1,
		totalAssets: 1,
		percent24h: 1,
		walletAddress: 1,
		totalValueIn: 1,
		totalValueOut: 1
	};

	const users = await InvestorModel.find(
		{ followers: { $in: [userId] } },
		projection
	).lean();

	return { message: "success", datas: users || [] };
};

const getListCryptosOfShark = async (sharkId: string) => {
	const shark = await InvestorModel.findOne({ sharkId: sharkId })
		.select("cryptos -_id")
		.lean();
	return shark?.cryptos || -1;
};

const getTransactionsLengthForPage = async (valueFilter = 0) => {
	return await TransactionModel.aggregate([
		{
			$project: {
				total: { $multiply: ["$presentPrice", "$numberOfTokens"] }
			}
		},

		{ $match: { total: { $gte: valueFilter } } },
		{ $count: "transactionsLength" }
	]);
};

const getTransactionsOfAllSharks = async (page: number, valueFilter = 0) => {
	if (page < 1 || page % 1 !== 0) return [];

	const transactions = await TransactionModel.aggregate([
		{
			$project: {
				_id: 0,
				walletAddress: 1,
				timeStamp: 1,
				sharkId: 1,
				hash: 1,
				from: 1,
				to: 1,
				tokenName: 1,
				tokenSymbol: 1,
				numberOfTokens: 1,
				pastPrice: 1,
				presentPrice: 1,
				total: { $multiply: ["$presentPrice", "$numberOfTokens"] }
			}
		},

		{ $match: { total: { $gte: valueFilter } } }
	])
		.sort({ timeStamp: "desc" })
		.skip((page - 1) * QUERY_LIMIT_ITEM)
		.limit(QUERY_LIMIT_ITEM);

	return transactions || [];
};

const getListTransactionsOfShark = async (sharkId: string) => {
	const shark = await InvestorModel.findOne({ sharkId: sharkId })
		.select("transactionsHistory -_id")
		.lean();
	return shark?.transactionsHistory || -1;
};

// Comment
const getTradeTransactionHistoryOfShark = async (
	sharkId: number,
	coinSymbol: string
) => {
	// try {
	// 	if (sharkId === null) return { message: "sharkid-required" };
	// 	if (sharkId === undefined) return { message: "sharkid-invalid" };
	// 	if (!coinSymbol) return { message: "coinsymbol-required" };
	// 	if (!(await checkExistedSharkId(sharkId)))
	// 		return { message: "shark-notfound" };
	// 	const sharks = await InvestorModel.findOne({ sharkId: sharkId }).select(
	// 		"historyDatas cryptos -_id"
	// 	);
	// 	const { historyDatas, cryptos } = sharks;
	// 	// Need reset to toLowerCase()
	// 	const historyData = historyDatas
	// 		.find(
	// 			(data: { coinSymbol: string }) =>
	// 				data?.coinSymbol === coinSymbol.toUpperCase()
	// 		)
	// 		.lean();
	// 	const coinInfo = await CoinModel.findOne({
	// 		symbol: coinSymbol.toLowerCase()
	// 	})
	// 		.select(
	// 			"coinId name symbol iconURL cmcRank maxSupply totalSupply circulatingSupply marketCap contractAddress prices -_id"
	// 		)
	// 		.lean();
	// 	// Need reset to toLowerCase()
	// 	if (!historyData) {
	// 		if (
	// 			cryptos &&
	// 			cryptos.find(
	// 				(crypto: { symbol: string }) =>
	// 					crypto.symbol === coinSymbol.toUpperCase()
	// 			)
	// 		) {
	// 			return {
	// 				message: "success",
	// 				data: {
	// 					historyData: null,
	// 					coinInfo: coinInfo || null
	// 				}
	// 			};
	// 		} else {
	// 			return { message: "coin-notfound" };
	// 		}
	// 	} else {
	// 		return {
	// 			message: "success",
	// 			data: {
	// 				historyData: historyData.historyData || null,
	// 				coinInfo: coinInfo || null
	// 			}
	// 		};
	// 	}
	// } catch (error) {
	// 	return { message: "error" };
	// }
};

const getHoursPriceOfToken = async (tokenSymbol: string) => {
	const token = await CoinModel.findOne({
		symbol: tokenSymbol.toLowerCase()
	})
		.select("originalPrices -_id")
		.lean();

	return token?.originalPrices?.hourly || {};
};

const getGainLossOfSharks = async (isLoss: boolean) => {
	const sortType = isLoss ? "asc" : "desc";

	const sharkGainLoss = isLoss
		? await InvestorModel.find({})
				.select("sharkId totalAssets percent24h -_id")
				.where("percent24h")
				.lt(0)
				.sort({ percent24h: sortType })
				.limit(20)
				.lean()
		: await InvestorModel.find({})
				.select("sharkId totalAssets percent24h -_id")
				.where("percent24h")
				.gte(0)
				.sort({ percent24h: sortType })
				.limit(20)
				.lean();

	return sharkGainLoss;
};

const getGainLossOfCoins = async (isLoss: boolean) => {
	const sortType = isLoss ? "asc" : "desc";

	const sharkGainLoss = isLoss
		? await CoinModel.find({})
				.select("symbol usd.price usd.percentChange24h -_id")
				.where("usd.percentChange24h")
				.lt(0)
				.sort({ "usd.percentChange24h": sortType })
				.limit(20)
				.lean()
		: await CoinModel.find({})
				.select("symbol usd.price usd.percentChange24h -_id")
				.where("usd.percentChange24h")
				.gte(0)
				.sort({ "usd.percentChange24h": sortType })
				.limit(20)
				.lean();

	return sharkGainLoss;
};

const addNewShark = async (walletAddress: string, userId: number) => {
	try {
		if (!(await checkExistedUserId(userId)))
			return { message: "user-notfound", isAdded: false };

		const sharkExisted = await InvestorModel.findOne({
			walletAddress: walletAddress
		}).lean();

		if (sharkExisted !== null)
			return { message: "wallet-address-exists", isAdded: false };

		const addedData = await InvestorModel.create({
			walletAddress: walletAddress,
			isShark: true
		});

		const user = await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ $push: { addedSharks: walletAddress } },
			{ new: true }
		).lean();

		let addedSharks = user?.addedSharks;

		return {
			message: "successfully",
			isAdded: true,
			data: addedData,
			sharkAdded: addedSharks
		};
	} catch (error) {
		return { message: "error", error: error };
	}
};

const deleteSharkNotFound = async (walletAddress: string, userId: number) => {
	try {
		if (!(await checkExistedUserId(userId)))
			return { message: "user-notfound", isDeleted: false };

		const sharkExisted = await InvestorModel.findOne({
			walletAddress: walletAddress
		}).lean();

		if (sharkExisted === null)
			return { message: "wallet-address-not-exists", isAdded: false };

		// Tuan's comment
		const user = await UserModel.findOneAndUpdate(
			{ userId: userId },
			{ $pull: { addedSharks: walletAddress } }
		).lean();

		const deletedData = await InvestorModel.remove({
			walletAddress: walletAddress
		}).lean();

		return deletedData.deletedCount > 0
			? { message: "successfully", isDeleted: true }
			: { message: "wallet-address-notfound", isDeleted: false };
	} catch (error) {
		return { message: "error", error: error };
	}
};

const getLengthOfSharksList = async () => {
	try {
		const length = await InvestorModel.count({ isShark: true }).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

const getLengthOfUsersList = async () => {
	try {
		const length = await UserModel.count({}).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

const getLengthOfTransactionsList = async () => {
	try {
		const length = await TransactionModel.count({}).lean();

		return { message: "success", length: length };
	} catch (err) {
		return { message: "failed-get-length", error: err };
	}
};

export {
	getUserByUsername,
	getUserByEmail,
	getUsersLength,
	createNewUser,
	updateUserConfirmationCode,
	updateUserIsCodeConfirmed,
	updateUserPassword,
	checkExistedUsername,
	checkExistedEmail,
	checkExistedUserId,
	checkExistedSharkId,
	getPasswordByUsername,
	getPasswordByEmail,
	getListOfCoinsAndTokens,
	getCoinsAndTokensLength,
	getCoinOrTokenDetails,
	getListOfSharks,
	getSharksLength,
	getListOfTags,
	getListReducingCoinsAndTokens,
	getListTrendingCoins,
	getListTrendingTokens,
	getListCryptosOfShark,
	getTransactionsLengthForPage,
	getTransactionsOfAllSharks,
	getListTransactionsOfShark,
	getTradeTransactionHistoryOfShark,
	getHoursPriceOfToken,
	getGainLossOfSharks,
	getGainLossOfCoins,
	getListOfSharkFollowed,
	followWalletOfShark,
	unfollowWalletOfShark,
	addNewShark,
	deleteSharkNotFound,
	getLengthOfSharksList,
	getLengthOfUsersList,
	getLengthOfTransactionsList
};
