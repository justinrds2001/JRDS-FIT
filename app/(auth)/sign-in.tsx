import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/global";
import { Profile, repository } from "@/lib/irepo";
import { Dumbbell } from "lucide-react-native";
import { SignInForm, SignInFormSchema } from "@/lib/schemas";

const SignIn = () => {
	const [form, setform] = useState<SignInForm>({
		email: "",
		password: "",
	});
	const { setProfile, setIsLoggedIn } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const submit = async () => {
		if (!form.email || !form.password) {
			setErrorMessage("Please fill in all fields");
			return;
		}
		const validationResult = SignInFormSchema.safeParse(form);
		if (!validationResult.success) {
			setErrorMessage("Invalid email or password");
			return;
		}
		setIsSubmitting(true);
		try {
			await repository.signIn(form.email, form.password);
			const profile = (await repository.getCurrentProfile()) as Profile;
			setProfile(profile);
			setIsLoggedIn(true);
			router.replace("/home" as any);
		} catch (error: any) {
			setErrorMessage("Invalid email or password");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[83vh] px-4 my-6">
					<View className="flex-row gap-1">
						<Dumbbell size={40} color="#66ff66" />
						<Text className="text-2xl text-secondary-200 font-bold">
							JRDS Fit
						</Text>
					</View>
					<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
						Log in to JRDS Fit
					</Text>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setform({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
						placeholder=""
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setform({ ...form, password: e })
						}
						otherStyles="my-7"
						placeholder=""
					/>
					{errorMessage && (
						<Text className="text-red-500 text-base font-pmedium mb-3">
							{errorMessage}
						</Text>
					)}
					<CustomButton
						title="Sign In"
						handlePress={submit}
						isLoading={isSubmitting}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have account?
						</Text>
						<Link
							href={"/sign-up" as any}
							className="text-lg font-psemibold text-secondary"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
