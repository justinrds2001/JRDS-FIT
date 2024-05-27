import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { repository } from "@/lib/irepo";
import { useGlobalContext } from "@/context/global";
import { Dumbbell } from "lucide-react-native";
import { SignUpForm, SignUpFormSchema } from "@/lib/schemas";
import { ZodError } from "zod";
import { AppwriteException } from "react-native-appwrite";

const SignUp = () => {
	const { setProfile, setIsLoggedIn } = useGlobalContext();
	const [form, setform] = useState<SignUpForm>({
		email: "",
		password: "",
		name: "",
		age: "",
		height: "",
		weight: "",
		fitnessGoal: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
		{}
	);

	const submit = async () => {
		try {
			const validSchema = SignUpFormSchema.parse(form);
			setIsSubmitting(true);
			const result = await repository.createProfile(validSchema);
			setProfile(result);
			setIsLoggedIn(true);
			router.replace("/home" as any);
		} catch (error) {
			if (error instanceof ZodError) {
				setErrors(error.formErrors.fieldErrors);
			} else if (
				error instanceof AppwriteException &&
				error.message.includes("already exists")
			) {
				setErrors({ email: ["Email already exists"] });
			} else {
				setErrors({});
				Alert.alert(
					"Error",
					"An error occurred. Please try again later."
				);
				console.log(error);
			}
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
						Sign up to JRDS Fit
					</Text>
					<Text className="text-xl text-white text-semibold mt-10 font-psemibold">
						Account Details
					</Text>
					{errors.username && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.username[0]}
						</Text>
					)}
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(e) => setform({ ...form, email: e })}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					{errors.email && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.email[0]}
						</Text>
					)}
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(e) =>
							setform({ ...form, password: e })
						}
						otherStyles="mt-7"
					/>
					{errors.password && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.password[0]}
						</Text>
					)}
					<Text className="text-xl text-white text-semibold mt-10 font-psemibold">
						Profile Details
					</Text>
					<FormField
						title="Full Name"
						value={form.name}
						handleChangeText={(e) => setform({ ...form, name: e })}
						otherStyles="mt-7"
					/>
					{errors.name && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.name[0]}
						</Text>
					)}
					<FormField
						title="Age"
						value={form.age}
						handleChangeText={(e) => setform({ ...form, age: e })}
						otherStyles="mt-7"
						keyboardType="numeric"
					/>
					{errors.age && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.age[0]}
						</Text>
					)}
					<FormField
						title="Height"
						value={form.height}
						handleChangeText={(e) =>
							setform({ ...form, height: e })
						}
						otherStyles="mt-7"
						keyboardType="numeric"
					/>
					{errors.height && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.height[0]}
						</Text>
					)}
					<FormField
						title="Weight"
						value={form.weight}
						handleChangeText={(e) =>
							setform({ ...form, weight: e })
						}
						otherStyles="mt-7"
						keyboardType="numeric"
					/>
					{errors.weight && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.weight[0]}
						</Text>
					)}
					<FormField
						title="Fitness Goal"
						value={form.fitnessGoal}
						handleChangeText={(e) =>
							setform({ ...form, fitnessGoal: e })
						}
						otherStyles="mt-7"
					/>
					{errors.fitnessGoal && (
						<Text className="text-red-500 text-base font-pmedium">
							{errors.fitnessGoal[0]}
						</Text>
					)}
					<CustomButton
						title="Sign Up"
						handlePress={submit}
						containerStyles="mt-7"
						isLoading={isSubmitting}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sign-in"
							className="text-lg font-psemibold text-secondary"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignUp;
