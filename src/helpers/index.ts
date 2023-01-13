import bcrypt from "bcrypt";

const randomConfirmationCode = () => {
	const code = Math.floor(100000 + Math.random() * 900000);
	return code.toString();
};

const cryptPassword = (
	password: string,
	callback: (error: any, hashPassword?: string) => {}
) => {
	bcrypt.genSalt(10, (error: any, salt) => {
		if (error) return callback(error);

		bcrypt.hash(password, salt, (error: any, hashPassword: string) => {
			return callback(error, hashPassword);
		});
	});
};

const comparePassword = (
	plainPassword: string,
	hashPassword: string,
	callback: (error: any, isPasswordMatch?: boolean) => {}
) => {
	bcrypt.compare(plainPassword, hashPassword, (error, isPasswordMatch) => {
		return error == null
			? callback(null, isPasswordMatch)
			: callback(error);
	});
};

const convertUnixTimestampToNumber = (unixTimestamp: number) => {
	const date = new Date(unixTimestamp * 1000);

	const year =
		date.getFullYear() < 10
			? "0" + date.getFullYear()
			: "" + date.getFullYear();
	const month =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: "" + (date.getMonth() + 1);
	const day =
		date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
	const hour =
		date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours();
	const minute =
		date.getMinutes() < 10
			? "0" + date.getMinutes()
			: "" + date.getMinutes();
	const second =
		date.getSeconds() < 10
			? "0" + date.getSeconds()
			: "" + date.getSeconds();

	const formattedTimeStr = `${year}${month}${day}${hour}${minute}${second}`;
	const formattedTimeNumber = Number(formattedTimeStr);

	return formattedTimeNumber;
};

export {
	randomConfirmationCode,
	cryptPassword,
	comparePassword,
	convertUnixTimestampToNumber
};
