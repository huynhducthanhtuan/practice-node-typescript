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
} from "../services/crud-database/user";

const DisplayController = {
	getCoinsAndTokens: async (req: Request, res: Response, next: Next) => {
		await getListOfCoinsAndTokens()
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getReducingCoinsAndTokens: async (
		req: Request,
		res: Response,
		next: Next
	) => {
		await getListReducingCoinsAndTokens()
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTrendingCoins: async (req: Request, res: Response, next: Next) => {
		await getListTrendingCoins()
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTrendingTokens: async (req: Request, res: Response, next: Next) => {
		await getListTrendingTokens()
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getCoinOrTokenDetails: async (req: Request, res: Response, next: Next) => {
		if (!req.query.symbol) symbol = null;
		else {
			const symbolCheck = _.toString(req.query.symbol).toLowerCase();
			if (_.isNaN(symbolCheck)) symbol = undefined;
			else symbol = symbolCheck;
		}

		await getCoinOrTokenDetails(symbol)
			.then((data) =>
				Object.entries(data).length === 0
					? res.status(400).json({
							message: "failed-symbol-invalid",
							error: "symbol-invalid",
							data: {}
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					data: {}
				})
			);
	},

	getSharks: async (req: Request, res: Response, next: Next) => {
		const { userId } = req.query;
		await getListOfSharks(userId)
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getCryptosOfShark: async (req: Request, res: Response, next: Next) => {
		let sharkId = req.query.sharkId;

		if (!sharkId) sharkId = null;
		else {
			const idCheck = _.toNumber(sharkId);
			if (_.isNaN(idCheck)) sharkId = undefined;
			else sharkId = idCheck;
		}

		await getListCryptosOfShark(sharkId)
			.then((datas) =>
				datas === -1
					? res.status(400).json({
							message: "failed-sharkid-invalid",
							error: "sharkid-invalid",
							datas: [],
							datasLength: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datas: datas,
							datasLength: datas.length
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datas: [],
					datasLength: 0
				})
			);
	},

	getTransactionsOfShark: async (req: Request, res: Response, next: Next) => {
		let sharkId = req.query.id;

		if (!sharkId) sharkId = null;
		else {
			const idCheck = _.toNumber(sharkId);
			if (_.isNaN(idCheck)) sharkId = undefined;
			else sharkId = idCheck;
		}

		await getListTransactionsOfShark(sharkId)
			.then((datas) =>
				!_.isArray(datas)
					? res.status(400).json({
							message: "failed-sharkid-invalid",
							error: "sharkid-invalid",
							datas: [],
							datasLength: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datas: datas,
							datasLength: datas.length
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datas: [],
					datasLength: 0
				})
			);
	},

	getTransactionsLengthForPage: async (
		req: Request,
		res: Response,
		next: Next
	) => {
		let { valueFilter } = req.body;

		valueFilter = _.toNumber(valueFilter);

		if (_.isNaN(valueFilter) || valueFilter < 0) valueFilter = 0;

		await getTransactionsLengthForPage(valueFilter)
			.then((data) =>
				data === 0
					? res.status(400).json({
							message: "failed-listtransaction-not-exist",
							error: "listtransaction-not-exist",
							data: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					data: 0
				})
			);
	},

	getListTransactionsOfAllSharks: async (
		req: Request,
		res: Response,
		next: Next
	) => {
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
					? res.status(400).json({
							message: "failed-listtransaction-not-exist",
							error: "listtransaction-not-exist",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTradeTransactionHistory: async (
		req: Request,
		res: Response,
		next: Next
	) => {
		let { sharkId, coinSymbol } = req.query;

		if (!sharkId) sharkId = null;
		else {
			if (isNaN(sharkId)) sharkId = undefined;
			else sharkId = Number(sharkId);
		}

		await getTradeTransactionHistoryOfShark(sharkId, coinSymbol)
			.then((data) =>
				data.message === "success"
					? res.status(200).json({
							message: "successfully",
							error: null,
							datas: data.data,
							datasLength: data.data.length
					  })
					: res.status(400).json({
							message: data.message,
							error: data.message,
							datas: null,
							datasLength: 0
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datas: null,
					datasLength: 0
				})
			);
	},

	getGainLossOfSharks: async (req: Request, res: Response, next: Next) => {
		let isLoss = false;
		if (!req.query.isLoss) isLoss = false;
		else isLoss = req.query.isLoss === "true";

		await getGainLossOfSharks(isLoss)
			.then((datas) =>
				!_.isArray(datas)
					? res.status(400).json({
							message: "failed-listgainloss-invalid",
							error: "listgainloss-invalid",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getGainLossOfCoins: async (req: Request, res: Response, next: Next) => {
		let isLoss = false;

		if (!req.query.isLoss) isLoss = false;
		else isLoss = req.query.isLoss === "true";

		await getGainLossOfCoins(isLoss)
			.then((datas) =>
				!_.isArray(datas)
					? res.status(400).json({
							message: "failed-listgainloss-invalid",
							error: "listgainloss-invalid",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getTags: async (req: Request, res: Response, next: Next) => {
		await getListOfTags()
			.then((datas) =>
				datas.length === 0
					? res.status(400).json({
							message: "failed-empty-data",
							error: "empty-data",
							datasLength: 0,
							datas: []
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							datasLength: datas.length,
							datas: datas
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfSharksList: async (req: Request, res: Response, next: Next) => {
		await getLengthOfSharksList()
			.then((data) =>
				data.message !== "success"
					? res.status(400).json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfTransactionsList: async (
		req: Request,
		res: Response,
		next: Next
	) => {
		await getLengthOfTransactionsList()
			.then((data) =>
				data.message !== "success"
					? res.status(400).json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	},

	getLengthOfUsersList: async (req: Request, res: Response, next: Next) => {
		await getLengthOfUsersList()
			.then((data) =>
				data.message !== "success"
					? res.status(400).json({
							message: "failed-get-length",
							error: data?.error,
							data: 0
					  })
					: res.status(200).json({
							message: "successfully",
							error: null,
							data: data?.length
					  })
			)
			.catch((error) =>
				res.status(400).json({
					message: "failed",
					error: error,
					datasLength: 0,
					datas: []
				})
			);
	}
};

export { DisplayController };
