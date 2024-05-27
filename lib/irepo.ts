import { AppwriteRepo } from "./appwrite";
import { SignUpForm } from "./schemas";

export interface Profile {
	id: string;
	email: string;
	name: string;
	age: number;
	height: number;
	fitnessGoal: string;
	avatarUrl: URL;
	weightRegistrations: {
		weight: number;
		date: Date;
	}[];
}

export interface IRepo {
	createProfile(form: SignUpForm): Promise<Profile>;
	updateProfile(profile: Profile): Promise<Profile>;
	addWeightRegistration(profileId: string, weight: number): Promise<Profile>;
	signIn(email: string, password: string): Promise<void>;
	signOut(): Promise<void>;
	getCurrentProfile(): Promise<Profile | undefined>;
}

export const repository: IRepo = new AppwriteRepo();
