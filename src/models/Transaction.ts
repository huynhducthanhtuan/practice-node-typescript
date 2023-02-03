import { Schema, model } from "mongoose";

interface ITransaction {
	id: number;
	transactionId: number;
	sharkId: number;
	timeStamp: number;
	pastPrice: number;
	presentPrice: number;
	numberOfTokens: number;
	contractAddress: string;
	tokenName: string;
	tokenSymbol: string;
	value: string;
	from: string;
	to: string;
	gas: string;
	hash: string;
	blockHash: string;
	cumulativeGasUsed: string;
	blockNumber: string;
	nonce: string;
	gasPrice: string;
	transactionIndex: string;
	input: string;
	gasUsed: string;
	confirmations: string;
	tokenDecimal: string;
	presentDate: string;
	pastDate: string;
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
