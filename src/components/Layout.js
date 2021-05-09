import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  const authToken = JSON.parse(localStorage.getItem("x-auth-token"));
  const [token, setToken] = useState(authToken);
  useEffect(() => {
    console.log(authToken)
    setToken(authToken);
  }, [authToken]);
  return (
    <>
      {!token || token !== "" || token === "undefined" ? (
        <Login />
      ) : (
        <div className="lg:flex bg-gray-100 relative">
          <div>
            <Navbar />
            {children}
          </div>
          <Sidebar />
        </div>
      )}
    </>
  );
};
