import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/Button";

export const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const history = useHistory();

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log("registered", data);
      history.push("/login");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    registerUser({
      variables: {
        username: userData.username,
        email: userData.email,
        password: userData.password
      }
    });
  };

  return (
    <div className="h-screen w-full bg-gray-200 grid place-items-center">
      <div className="bg-white w-full max-w-md py-12 px-8 rounded-md">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <form className="space-y-8" onSubmit={hanldeSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={userData.username}
              name="username"
              className="border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-gray-700 focus:shadow-md"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={userData.email}
              name="email"
              className="border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-gray-700 focus:shadow-md"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={userData.password}
              name="password"
              className="border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-gray-700 focus:shadow-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <p className="text-red-500 mb-2">{error && error.message}</p>
            <input
              type="submit"
              value={
                loading
                  ? "Registering.."
                  : data
                  ? "Registered successfully"
                  : "Register"
              }
              className="bg-gray-800 w-full py-3 text-gray-50 rounded transition duration-300 ring-0 focus:ring-4 ring-gray-400 focus:outline-none uppercase text-sm tracking-wider"
            />
          </div>

          <div>
            <p className="text-gray-700 text-center mb-3">
              Already have an account?
            </p>
            <Button type="button">
              <Link to="/login"> Log In </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
