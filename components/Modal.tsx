import {
	View,
	ModalProps,
	KeyboardAvoidingView,
	Platform,
	Modal as RNModal,
} from "react-native";

type Props = ModalProps & {
	isOpen: boolean;
	withInput?: boolean;
};

const Modal = ({ isOpen, withInput, children, ...rest }: Props) => {
	const content = withInput ? (
		<KeyboardAvoidingView
			className="flex-1 justify-center items-center bg-black bg-opacity-50"
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			{children}
		</KeyboardAvoidingView>
	) : (
		<View className="flex-1 justify-center items-center bg-black bg-opacity-50">
			{children}
		</View>
	);

	return (
		<RNModal
			visible={isOpen}
			transparent
			animationType="fade"
			statusBarTranslucent
			{...rest}
		>
			{content}
		</RNModal>
	);
};

export default Modal;
