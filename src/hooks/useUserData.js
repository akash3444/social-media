import { useContext } from "react";
import { UserContext } from "../App";

export const useUserData = () => {
	const { user, setUser } = useContext(UserContext);

	return {
		token: user.token,
		username: user.user.username,
		setUser,
	};
};
