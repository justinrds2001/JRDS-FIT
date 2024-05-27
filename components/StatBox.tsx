import { View, Text } from "react-native";

interface StatBoxProps {
	title: string;
	stat: number;
	unit: string;
	containerStyles?: string;
	titleStyles?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
	title,
	stat,
	unit,
	containerStyles,
	titleStyles,
}) => {
	return (
		<View className={containerStyles}>
			<Text className="text-sm text-gray-100 text-center font-pregular">
				{title}
			</Text>
			<Text
				className={`text-white text-center font-psemibold ${titleStyles}`}
			>
				{stat}
				<Text className="text-secondary font-plight">{unit}</Text>
			</Text>
		</View>
	);
};

export default StatBox;
