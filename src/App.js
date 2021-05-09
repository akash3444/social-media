import { createContext, useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { PostList } from "./components/PostList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  const token =
    localStorage.getItem("x-auth-token") ||
    localStorage.getItem("x-auth-token") !== "undefined"
      ? localStorage.getItem("x-auth-token")
      : null;
  const [user, setUser] = useState(token);
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/login");
  }, [history, user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/:username" component={PostList} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
    </UserContext.Provider>
  );
}

export const UserContext = createContext();
