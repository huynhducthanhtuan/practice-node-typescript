import { Schema, model } from "mongoose";

interface ITag {
	id: number;
	name: string;
}

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

const TagModel = model<ITag>("Tag", TagSchema);

export default TagModel;
