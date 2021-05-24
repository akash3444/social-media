import { createContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { PostList } from "./components/PostList";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { Layout } from "./components/Layout";

export default function App() {
	const token =
		localStorage.getItem("x-auth-token") ||
		localStorage.getItem("x-auth-token") !== "undefined"
			? JSON.parse(localStorage.getItem("x-auth-token"))
			: null;
	const [user, setUser] = useState(token);
	const history = useHistory();

	useEffect(() => {
		if (!user) history.push("/login");
	}, [history, user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Layout>
				<Switch>
					<Route path='/' exact component={PostList} />
					<Route path='/login' exact component={Login} />
					<Route path='/:username' exact component={Profile} />
				</Switch>
			</Layout>
		</UserContext.Provider>
	);
}

export const UserContext = createContext();
