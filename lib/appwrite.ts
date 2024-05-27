import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
	Models,
} from "react-native-appwrite";
import { IRepo, Profile } from "./irepo";
import { SignUpForm, SignUpFormSchema } from "./schemas";
import { env } from "@/env";

const config = {
	endpoint: env.APPWRITE_ENDPOINT || "",
	platform: env.APPWRITE_PLATFORM || "",
	projectId: env.APPWRITE_PROJECTID || "",
	databaseId: env.APPWRITE_DATABASE || "",
	profileCollectionId: env.APPWRITE_PROFILE_COLLECTIONID || "",
	weightCollectionId: env.APPWRITE_WEIGHT_COLLECTIONID || "",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	profileCollectionId,
	weightCollectionId,
} = config;

// Init your react-native SDK
const client = new Client();

client
	.setEndpoint(endpoint) // Your Appwrite Endpoint
	.setProject(projectId) // Your project ID
	.setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export class AppwriteRepo implements IRepo {
	documentToProfile(document: Models.Document): Profile {
		return {
			id: document.$id,
			email: document.email,
			name: document.name,
			age: document.age,
			height: document.height,
			fitnessGoal: document.fitnessGoal,
			avatarUrl: document.avatarUrl,
			weightRegistrations: document.weightRegistrations,
		};
	}

	async createProfile(form: SignUpForm): Promise<Profile> {
		let accountId: string | undefined;
		let profileId: string | undefined;
		let weightRegistrationId: string | undefined;

		try {
			const validForm = SignUpFormSchema.parse(form);
			const age = parseInt(validForm.age);
			const height = parseFloat(validForm.height);
			const newAccount = await account.create(
				ID.unique(),
				validForm.email,
				validForm.password
			);
			accountId = newAccount.$id;
			const avatarUrl = avatars.getInitials(validForm.name);

			const newWeightRegistration = await database.createDocument(
				databaseId,
				weightCollectionId,
				ID.unique(),
				{
					weight: parseFloat(validForm.weight),
					date: new Date().toISOString(),
				}
			);
			weightRegistrationId = newWeightRegistration.$id;

			const newProfile = await database.createDocument(
				databaseId,
				profileCollectionId,
				ID.unique(),
				{
					accountId: newAccount.$id,
					email: validForm.email,
					name: validForm.name,
					fitnessGoal: validForm.fitnessGoal,
					age,
					height,
					avatarUrl,
					weightRegistrations: [newWeightRegistration.$id],
				}
			);
			profileId = newProfile.$id;

			const profile: Profile = this.documentToProfile(newProfile);
			await this.signIn(validForm.email, validForm.password);
			return profile;
		} catch (error) {
			console.error(error);
			// roll back if error occurs
			if (accountId) await account.deleteIdentity(accountId);
			if (profileId)
				await database.deleteDocument(
					databaseId,
					profileCollectionId,
					profileId
				);
			if (weightRegistrationId)
				await database.deleteDocument(
					databaseId,
					weightCollectionId,
					weightRegistrationId
				);

			throw error;
		}
	}

	async updateProfile(profile: Profile): Promise<Profile> {
		const { id, ...rest } = profile;
		const updatedProfile = await database.updateDocument(
			databaseId,
			profileCollectionId,
			id,
			rest
		);
		return this.documentToProfile(updatedProfile);
	}

	async addWeightRegistration(
		profileId: string,
		weight: number
	): Promise<Profile> {
		const newWeightRegistration = await database.createDocument(
			databaseId,
			weightCollectionId,
			ID.unique(),
			{
				weight,
				date: new Date().toISOString(),
			}
		);
		const profile = await database.getDocument(
			databaseId,
			profileCollectionId,
			profileId
		);
		// TODO: Update Function doesn't work with updated data, fix this
		const updatedProfile = await database.updateDocument(
			databaseId,
			profileCollectionId,
			profileId,
			{
				...profile,
				weightRegistrations: [
					...profile.weightRegistrations,
					newWeightRegistration.$id,
				],
			}
		);
		return this.documentToProfile(updatedProfile);
	}

	async signIn(email: string, password: string): Promise<void> {
		await account.createEmailSession(email, password);
	}

	async signOut(): Promise<void> {
		await account.deleteSession("current");
	}

	async getCurrentProfile(): Promise<Profile | undefined> {
		try {
			const currentAccount = await account.get();
			if (!currentAccount) return undefined;
			const currentProfile = await database.listDocuments(
				databaseId,
				profileCollectionId,
				[Query.equal("accountId", currentAccount.$id)]
			);
			if (!currentProfile) throw Error;
			return this.documentToProfile(currentProfile.documents[0]);
		} catch (_error) {}
	}
}
