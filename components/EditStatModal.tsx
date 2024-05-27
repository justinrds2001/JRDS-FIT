import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Modal from "./Modal";
import FormField from "./FormField";
import { Check, X } from "lucide-react-native";
import { useGlobalContext } from "@/context/global";
import { firstLetterToUpperCase } from "@/lib/utils";
import { repository } from "@/lib/irepo";

type EditStatModalProps = {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	stat: string;
	value: string;
	setValue: (value: string) => void;
};

export default function EditStatModal({
	isModalOpen,
	setIsModalOpen,
	stat,
	value,
	setValue,
}: EditStatModalProps) {
	const { profile, setProfile } = useGlobalContext();
	const title = `New ${firstLetterToUpperCase(stat)}`;
	const isDisabled = isNaN(parseInt(value));

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const changeStat = async () => {
		console.log("changeStat");
		if (stat === "weight") {
			console.log("changeStat weight");
			try {
				const updatedProfile = await repository.addWeightRegistration(
					profile!.id,
					parseInt(value)
				);
				setProfile(updatedProfile);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("changeStat yes");

			const updatedProfile = await repository.updateProfile({
				...profile!,
				[stat]: parseInt(value),
			});
			setProfile(updatedProfile);
		}
		setIsModalOpen(false);
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={() => {
				setIsModalOpen(false);
			}}
			withInput
		>
			<View className="bg-primary border-2 p-4 rounded-3xl">
				<FormField
					title={title}
					value={value}
					handleChangeText={(e) => {
						setValue(e);
					}}
					otherStyles="mt-7"
					keyboardType="numeric"
				/>
				<View className="flex-row gap-1">
					<TouchableOpacity
						onPress={changeStat}
						disabled={isDisabled}
					>
						<Check color={isDisabled ? "gray" : "#66ff66"} />
					</TouchableOpacity>
					<TouchableOpacity onPress={closeModal}>
						<X color="orange" />
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
