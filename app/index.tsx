import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/global";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
	const { isLoading, isLoggedIn } = useGlobalContext();
	if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
					<View className="relative mt-5">
						<Text className="text-2xl text-white font-bold text-center">
							Train like never before with
							<Text className="text-secondary-200">
								{" "}
								JRDS Fit
							</Text>
						</Text>
					</View>
					<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
						Never miss a workout again with JRDS Fit. Get access to
						a wide range of workouts and exercises to help you stay
						fit and healthy.
					</Text>

					<CustomButton
						title="Continue with email"
						handlePress={() => router.push("/sign-in")}
						containerStyles="w-full mt-7"
					/>
				</View>
			</ScrollView>
			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	);
};

export default App;
