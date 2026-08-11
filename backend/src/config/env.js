import dotenv from "dotenv";
dotenv.config();

function checkENV(envVar) {
	if (!envVar) {
		throw new Error("Missing environment variable");
	}
	return envVar;
}

export const config = {
	MONGO_URI: checkENV(process.env.MONGO_URI),
	JWT_SECRET: checkENV(process.env.JWT_SECRET),
	JWT_EXPIRES_IN: checkENV(process.env.JWT_EXPIRES_IN),
};
