import { createContext, useContext, useState, useEffect } from "react";
import { Profile, repository } from "@/lib/irepo";

interface GlobalContextType {
	isLoggedIn: boolean;
	setIsLoggedIn: (loggedIn: boolean) => void;
	profile: Profile | null;
	setProfile: (user: Profile | null) => void;
	isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	profile: null,
	setProfile: () => {},
	isLoading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		repository
			.getCurrentProfile()
			.then((profile) => {
				if (profile) {
					setIsLoggedIn(true);
					setProfile(profile);
				} else {
					setIsLoggedIn(false);
					setProfile(null);
				}
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				profile,
				setProfile,
				isLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
