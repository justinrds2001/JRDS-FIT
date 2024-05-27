import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global";
import { repository } from "@/lib/irepo";
import { router } from "expo-router";
import { Edit, LogOut } from "lucide-react-native";
import StatBox from "@/components/StatBox";
import { useState } from "react";
import EditStatModal from "@/components/EditStatModal";

const Profile = () => {
	const { profile, setProfile, setIsLoggedIn } = useGlobalContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [weight, setWeight] = useState(
		profile?.weightRegistrations[0].weight.toString()
	);
	const [modalStat, setModalStat] = useState("");

	const logout = async () => {
		await repository.signOut();
		setProfile(null);
		setIsLoggedIn(false);
		router.replace("/sign-in");
	};

	return (
		<SafeAreaView className="bg-primary border-2 h-full">
			<View className="w-full justify-center items-center mt-6 mb-12 px-4">
				<TouchableOpacity
					className="w-full items-end mb-10"
					onPress={logout}
				>
					<LogOut size={30} color="#161622" />
				</TouchableOpacity>

				<View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
					<Image
						source={{
							uri: profile?.avatarUrl.toString(),
						}}
						className="w-[90%] h-[90%] rounded-lg"
						resizeMode="cover"
					/>
				</View>

				<Text
					className={`text-white text-center font-psemibold text-lg mt-3`}
				>
					{profile?.name || "User"}
				</Text>

				<View className="mt-5 flex-row">
					<StatBox
						title="Height"
						stat={profile?.height || 0}
						unit="cm"
						titleStyles="text-xl"
					/>
					<TouchableOpacity
						onPress={() => {
							setModalStat("height");
							setIsModalOpen(true);
						}}
					>
						<Edit color="#66ff66" className="mt-7 mx-2" />
					</TouchableOpacity>
					<StatBox
						title="Weight"
						stat={profile?.weightRegistrations[0].weight || 0}
						unit="kg"
						containerStyles="ml-4"
						titleStyles="text-xl"
					/>
					<TouchableOpacity
						onPress={() => {
							setModalStat("weight");
							setIsModalOpen(true);
						}}
					>
						<Edit color="#66ff66" className="mt-7 ml-1" />
					</TouchableOpacity>
					<EditStatModal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						stat={modalStat}
						setValue={setWeight}
						value={weight || ""}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Profile;
