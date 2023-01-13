import { Schema, model } from "mongoose";

const TagSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true
		}
	},
	{ versionKey: false }
);

const TagModel = model("Tag", TagSchema);

export default TagModel;
