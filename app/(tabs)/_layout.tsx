import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dumbbell, Home, User } from "lucide-react-native";

interface TabIconProps {
	icon: any;
	color: string;
	name: string;
	focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
	return (
		<View className="items-center justify-center gap-2">
			{icon}
			<Text
				className={`${
					focused ? "font-psemibold" : "font-pregular"
				} text-xs`}
				style={{ color }}
			>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#66ff66",
					tabBarInactiveTintColor: "#CDCDE0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 1,
						borderTopColor: "#232533",
						height: 84,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<Home color={color} size={30} />}
								color={color}
								name="Home"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="workouts"
					options={{
						title: "Workouts",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<Dumbbell color={color} size={30} />}
								color={color}
								name="Workouts"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<User color={color} size={30} />}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
