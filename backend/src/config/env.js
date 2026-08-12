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
	GOOGLE_CLIENT_ID: checkENV(process.env.GOOGLE_CLIENT_ID),
	GOOGLE_CLIENT_SECRET: checkENV(process.env.GOOGLE_CLIENT_SECRET),
	GOOGLE_REDIRECT_URI: checkENV(process.env.GOOGLE_REDIRECT_URI),
	FRONTEND_URL: checkENV(process.env.FRONTEND_URL),
	IMAGEKIT_PUBLIC_KEY: checkENV(process.env.IMAGEKIT_PUBLIC_KEY),
	IMAGEKIT_PRIVATE_KEY: checkENV(process.env.IMAGEKIT_PRIVATE_KEY),
};
