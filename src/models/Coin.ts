import { Schema, model } from "mongoose";

interface ICoin {
	coinId: number;
	ethId: string;
	coingeckoId: string;
	cmcRank: number;
	name: string;
	symbol: string;
	contractAddress: string;
	type: string;
	iconURL: string;
	marketCap: number;
	maxSupply: number;
	totalSupply: number;
	circulatingSupply: number;
	tagNames: string[];
	urls: object;
	usd: object;
	prices: object;
	originalPrices: { hourly: object; daily: object };
	pricesLast1Month: object;
	totalInvestment: number;
}

const CoinSchema = new Schema(
	{
		coinId: {
			type: Number,
			default: null
		},
		ethId: {
			type: String,
			default: ""
		},
		coingeckoId: {
			type: String,
			default: ""
		},
		cmcRank: {
			type: Number,
			default: null
		},
		name: {
			type: String,
			trim: true,
			required: true,
			default: ""
		},
		symbol: {
			type: String,
			trim: true,
			required: true
		},
		contractAddress: {
			type: String,
			trim: true,
			default: ""
		},
		type: {
			type: String,
			trim: true,
			default: ""
		},
		iconURL: {
			type: String,
			trim: true,
			default: ""
		},
		marketCap: {
			type: Number,
			default: null
		},
		maxSupply: {
			type: Number,
			default: null
		},
		totalSupply: {
			type: Number,
			default: null
		},
		circulatingSupply: {
			type: Number,
			default: null
		},
		tagNames: {
			type: Array,
			default: []
		},
		urls: {
			type: Object,
			required: true,
			default: {}
		},
		usd: {
			type: Object,
			required: true,
			default: {}
		},
		prices: {
			type: Object,
			default: {}
		},
		originalPrices: {
			type: { hourly: Object, daily: Object },
			default: {}
		},
		pricesLast1Month: {
			type: Object,
			default: {}
		},
		totalInvestment: {
			type: Number,
			default: 0
		}
	},
	{ versionKey: false }
);

const CoinModel = model<ICoin>("Coin", CoinSchema);

export default CoinModel;
