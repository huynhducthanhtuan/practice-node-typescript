import { Schema, model } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const InvestorSchema = new Schema(
	{
		isShark: {
			type: Boolean,
			default: false
		},
		coins: {
			type: Object,
			default: {}
		},
		totalAssets: {
			type: String,
			default: "0"
		},
		totalValueOut: {
			type: String,
			default: "0"
		},
		totalValueIn: {
			type: String,
			default: "0"
		},
		percent24h: {
			type: Number,
			default: 0
		},
		transactionsHistory: {
			type: Array,
			default: []
		},
		walletAddress: {
			type: String,
			default: "",
			unique: true
		},
		cryptos: {
			type: Array,
			default: []
		},
		historyDatas: {
			type: Array,
			default: []
		},
		followers: {
			type: Array,
			default: []
		}
	},
	{ versionKey: false }
);

const AutoIncrement = mongooseSequence(InvestorSchema);
// InvestorSchema.plugin(AutoIncrement, { inc_field: "sharkId" });

const InvestorModel = model("Investor", InvestorSchema);

export default InvestorModel;