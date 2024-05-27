import { z } from "zod";

const EnvScchema = z.object({
	APPWRITE_ENDPOINT: z.string().min(1, "APPWRITE_ENDPOINT is required"),
	APPWRITE_PLATFORM: z.string().min(1, "APPWRITE_PLATFORM is required"),
	APPWRITE_PROJECTID: z.string().min(1, "APPWRITE_PROJECTID is required"),
	APPWRITE_DATABASE: z.string().min(1, "APPWRITE_DATABASE is required"),
	APPWRITE_PROFILE_COLLECTIONID: z
		.string()
		.min(1, "APPWRITE_PROFILE_COLLECTIONID is required"),
	APPWRITE_WEIGHT_COLLECTIONID: z
		.string()
		.min(1, "APPWRITE_WEIGHT_COLLECTIONID is required"),
});

export type Env = z.infer<typeof EnvScchema>;

export const env: Env = EnvScchema.parse({
	APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
	APPWRITE_PLATFORM: process.env.APPWRITE_PLATFORM,
	APPWRITE_PROJECTID: process.env.APPWRITE_PROJECTID,
	APPWRITE_DATABASE: process.env.APPWRITE_DATABASE,
	APPWRITE_PROFILE_COLLECTIONID: process.env.APPWRITE_PROFILE_COLLECTIONID,
	APPWRITE_WEIGHT_COLLECTIONID: process.env.APPWRITE_WEIGHT_COLLECTIONID,
});
