import _ from "lodash";
import {
	getListOfCoinsAndTokens,
	getListOfSharks,
	getListOfTags,
	getListReducingCoinsAndTokens,
	getListTrendingCoins,
	getListTrendingTokens,
	getCoinOrTokenDetails,
	getListCryptosOfShark,
	getTransactionsOfAllSharks,
	getListTransactionsOfShark,
	getTransactionsLengthForPage,
	getGainLossOfSharks,
	getGainLossOfCoins,
	getTradeTransactionHistoryOfShark,
	getLengthOfSharksList,
	getLengthOfUsersList,
	getLengthOfTransactionsList
} from "../services/crudDatabase/user";
import { RequestFunction } from "../types";

const DisplayController = {
	getCoinsAndTokens: async ({ req, res, next }: RequestFunction) => {
		await getListOfCoinsAndTokens()
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getReducingCoinsAndTokens: async ({ req, res, next }: RequestFunction) => {
		await getListReducingCoinsAndTokens()
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTrendingCoins: async ({ req, res, next }: RequestFunction) => {
		await getListTrendingCoins()
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTrendingTokens: async ({ req, res, next }: RequestFunction) => {
		await getListTrendingTokens()
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getCoinOrTokenDetails: async ({ req, res, next }: RequestFunction) => {
		let symbol: string | null | undefined;

		if (!req.query.symbol) symbol = null;
		else {
			const symbolCheck = _.toString(req.query.symbol).toLowerCase();
			if (_.isNaN(symbolCheck)) symbol = undefined;
			else symbol = symbolCheck;
		}

		await getCoinOrTokenDetails(symbol)
			.then((data) =>
				Object.entries(data).length === 0
					? res.json({
							message: "failed-symbol-invalid",
							error: "symbol-invalid",
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

	getSharks: async ({ req, res, next }: RequestFunction) => {
		const userId = req.query.userId as string;

		await getListOfSharks(userId)
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getCryptosOfShark: async ({ req, res, next }: RequestFunction) => {
		let sharkId = req.query.sharkId as string;

		await getListCryptosOfShark(sharkId)
			.then((datas) =>
				datas === -1
					? res.json({
							message: "failed-sharkid-invalid",
							error: "sharkid-invalid",
							datas: [],
							datasLength: 0
					  })
					: res.json({
							message: "successfully",
							error: null,
							datas: datas,
							datasLength: datas.length
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datas: [],
					datasLength: 0
				})
			);
	},

	getTransactionsOfShark: async ({ req, res, next }: RequestFunction) => {
		let sharkId = req.query.id as string;

		await getListTransactionsOfShark(sharkId)
			.then((datas) =>
				!_.isArray(datas)
					? res.json({
							message: "failed-sharkid-invalid",
							error: "sharkid-invalid",
							datas: [],
							datasLength: 0
					  })
					: res.json({
							message: "successfully",
							error: null,
							datas: datas,
							datasLength: datas.length
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datas: [],
					datasLength: 0
				})
			);
	},

	// Comment
	getTransactionsLengthForPage: async ({
		req,
		res,
		next
	}: RequestFunction) => {
		// let { valueFilter } = req.body;
		// valueFilter = _.toNumber(valueFilter);

		// if (_.isNaN(valueFilter) || valueFilter < 0) valueFilter = 0;
		
		// await getTransactionsLengthForPage(valueFilter)
		// 	.then((data) =>
		// 		data === 0
		// 			? res.json({
		// 					message: "failed-listtransaction-not-exist",
		// 					error: "listtransaction-not-exist",
		// 					data: 0
		// 			  })
		// 			: res.json({
		// 					message: "successfully",
		// 					error: null,
		// 					data: data
		// 			  })
		// 	)
		// 	.catch((error) =>
		// 		res.json({
		// 			message: "failed",
		// 			error: error,
		// 			data: 0
		// 		})
		// 	);
	},

	getListTransactionsOfAllSharks: async ({
		req,
		res,
		next
	}: RequestFunction) => {
		let { page, valueFilter } = req.body;

		valueFilter = _.toNumber(valueFilter);

		if (!page) page = null;
		else if (_.isNaN(valueFilter) || valueFilter < 0) valueFilter = 0;
		else {
			const numberCheck = _.toNumber(page);
			if (_.isNaN(numberCheck)) page = undefined;
			else page = numberCheck;
		}

		await getTransactionsOfAllSharks(page, valueFilter)
			.then((datas) =>
				!_.isArray(datas)
					? res.json({
							message: "failed-listtransaction-not-exist",
							error: "listtransaction-not-exist",
							datasLength: 0,
							datas: []
					  })
					: res.json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	// Comment
	getTradeTransactionHistory: async ({ req, res, next }: RequestFunction) => {
		// let sharkId: string | undefined = req.query.sharkId;
		// let coinSymbol: string | undefined = req.query.coinSymbol;
		// if (!sharkId) sharkId = null;
		// else {
		// 	if (isNaN(sharkId)) sharkId = undefined;
		// 	else sharkId = Number(sharkId);
		// }
		// await getTradeTransactionHistoryOfShark(sharkId, coinSymbol)
		// 	.then((data) =>
		// 		data.message === "success"
		// 			? res.json({
		// 					message: "successfully",
		// 					error: null,
		// 					datas: data.data,
		// 					datasLength: data.data.length
		// 			  })
		// 			: res.json({
		// 					message: data.message,
		// 					error: data.message,
		// 					datas: null,
		// 					datasLength: 0
		// 			  })
		// 	)
		// 	.catch((error) =>
		// 		res.json({
		// 			message: "failed",
		// 			error: error,
		// 			datas: null,
		// 			datasLength: 0
		// 		})
		// 	);
	},

	getGainLossOfSharks: async ({ req, res, next }: RequestFunction) => {
		let isLoss = false;
		if (!req.query.isLoss) isLoss = false;
		else isLoss = req.query.isLoss === "true";

		await getGainLossOfSharks(isLoss)
			.then((datas) =>
				!_.isArray(datas)
					? res.json({
							message: "failed-listgainloss-invalid",
							error: "listgainloss-invalid",
							datasLength: 0,
							datas: []
					  })
					: res.json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getGainLossOfCoins: async ({ req, res, next }: RequestFunction) => {
		let isLoss = false;

		if (!req.query.isLoss) isLoss = false;
		else isLoss = req.query.isLoss === "true";

		await getGainLossOfCoins(isLoss)
			.then((datas) =>
				!_.isArray(datas)
					? res.json({
							message: "failed-listgainloss-invalid",
							error: "listgainloss-invalid",
							datasLength: 0,
							datas: []
					  })
					: res.json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTags: async ({ req, res, next }: RequestFunction) => {
		await getListOfTags()
			.then((datas) =>
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
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfSharksList: async ({ req, res, next }: RequestFunction) => {
		await getLengthOfSharksList()
			.then((data) =>
				data.message !== "success"
					? res.json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfTransactionsList: async ({
		req,
		res,
		next
	}: RequestFunction) => {
		await getLengthOfTransactionsList()
			.then((data) =>
				data.message !== "success"
					? res.json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfUsersList: async ({ req, res, next }: RequestFunction) => {
		await getLengthOfUsersList()
			.then((data) =>
				data.message !== "success"
					? res.json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	}
};

export default  DisplayController;
