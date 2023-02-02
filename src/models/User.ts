import mongoose, { Schema, Model } from "mongoose";
import mongooseSequence from "mongoose-sequence";

interface IUser {
	userId: number;
	username: string;
	email: string;
	phoneNumber: string;
	password: string;
	fullName: string;
	confirmationCode: string;
	isCodeConfirmed: boolean;
	avatar: string;
	website: string;
	premiumAccount: boolean;
	walletAddress: string;
	sharksFollowed: Array<{}>;
	addedSharks: Array<{}>;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minlength: 5,
			maxlength: 16
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minlength: 16,
			maxlength: 40
		},
		phoneNumber: {
			type: String,
			trim: true,
			minLength: 10,
			maxlength: 10,
			default: ""
		},
		password: {
			type: String,
			trim: true,
			required: true
		},
		fullName: {
			type: String,
			trim: true,
			default: ""
		},
		confirmationCode: {
			type: String,
			trim: true,
			default: ""
		},
		isCodeConfirmed: {
			type: Boolean,
			default: false
		},
		avatar: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/dhzbsq7fj/image/upload/v1643101647/avatardefault_92824_aifry9.png"
		},
		website: {
			type: String,
			trim: true,
			default: ""
		},
		premiumAccount: {
			type: Boolean,
			default: false
		},
		walletAddress: {
			type: String,
			trim: true,
			default: null
		},
		sharksFollowed: {
			type: Array,
			default: []
		},
		addedSharks: {
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
// const AutoIncrement = mongooseSequence(UserSchema, { inc_field: "userId" });

// UserSchema.plugin(AutoIncrement);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
