import { Schema, model } from "mongoose";

interface ITransaction {
	id: Number;
	transactionId: Number;
	sharkId: Number;
	timeStamp: Number;
	pastPrice: Number;
	presentPrice: Number;
	numberOfTokens: Number;
	contractAddress: String;
	tokenName: String;
	tokenSymbol: String;
	value: String;
	from: String;
	to: String;
	gas: String;
	hash: String;
	blockHash: String;
	cumulativeGasUsed: String;
	blockNumber: String;
	nonce: String;
	gasPrice: String;
	transactionIndex: String;
	input: String;
	gasUsed: String;
	confirmations: String;
	tokenDecimal: String;
	presentDate: String;
	pastDate: String;
}

const TransactionSchema = new Schema(
	{
		id: {
			type: Number
		},
		transactionId: {
			type: Number
		},
		sharkId: {
			type: Number
		},
		timeStamp: {
			type: Number
		},
		pastPrice: {
			type: Number
		},
		presentPrice: {
			type: Number
		},
		numberOfTokens: {
			type: Number
		},
		contractAddress: {
			type: String,
			trim: true
		},
		tokenName: {
			type: String,
			trim: true
		},
		tokenSymbol: {
			type: String,
			trim: true
		},
		value: {
			type: String,
			trim: true
		},
		from: {
			type: String,
			trim: true
		},
		to: {
			type: String,
			trim: true
		},
		gas: {
			type: String,
			trim: true
		},
		hash: {
			type: String,
			trim: true
		},
		blockHash: {
			type: String,
			trim: true
		},
		cumulativeGasUsed: {
			type: String,
			trim: true
		},
		blockNumber: {
			type: String,
			trim: true
		},
		nonce: {
			type: String,
			trim: true
		},
		gasPrice: {
			type: String,
			trim: true
		},
		transactionIndex: {
			type: String,
			trim: true
		},
		input: {
			type: String,
			trim: true
		},
		gasUsed: {
			type: String,
			trim: true
		},
		confirmations: {
			type: String,
			trim: true
		},
		tokenDecimal: {
			type: String,
			trim: true
		},
		presentDate: {
			type: String,
			trim: true
		},
		pastDate: {
			type: String,
			trim: true
		}
	},
	{ versionKey: false }
);

const TransactionModel = model<ITransaction>("Transaction", TransactionSchema);

export default TransactionModel;
