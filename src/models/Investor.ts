import mongoose, { Schema, Model } from "mongoose";
import mongooseSequence from "mongoose-sequence";

interface IInvestor {
	isShark: Boolean;
	coins: Object;
	totalAssets: String;
	totalValueOut: String;
	totalValueIn: String;
	percent24h: Number;
	transactionsHistory: Array<{}>;
	walletAddress: String;
	cryptos: Array<{}>;
	historyDatas: Array<{}>;
	followers: Array<{}>;
}

const InvestorSchema: Schema = new Schema(
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
	{
		timestamps: true,
		versionKey: false
	}
);

// ERROR
// const AutoIncrement = mongooseSequence(InvestorSchema, {
// 	inc_field: "sharkId"
// });

// InvestorSchema.plugin(AutoIncrement);

const InvestorModel: Model<IInvestor> = mongoose.model<IInvestor>(
	"Investor",
	InvestorSchema
);

export default InvestorModel;
