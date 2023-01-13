import { Schema, model } from "mongoose";

const AdminSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minlength: 16,
			maxlength: 40
		},
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minLength: 5,
			maxlength: 16
		},
		password: {
			type: String,
			trim: true,
			required: true
		}
	},
	{ versionKey: false }
);

const AdminModel = model("Admin", AdminSchema);

export default AdminModel;
