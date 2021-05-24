import React, { useContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { LOGIN_USER } from "../queries";

export const Login = () => {
	const { setUser } = useContext(UserContext);
	const [userData, setUserData] = useState({
		username: "",
		password: "",
	});
	const history = useHistory();

	const [loginUser, { data, loading, error: loginError }] = useLazyQuery(
		LOGIN_USER,
		{
			onCompleted: (data) => {
				const user = { token: data.login.token, user: data.login.user };
				localStorage.setItem("x-auth-token", JSON.stringify(user));
				setUser(user);
				history.push("/");
			},
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevUserData) => ({
			...prevUserData,
			[name]: value,
		}));
	};

	const hanldeSubmit = (e) => {
		e.preventDefault();
		console.log(userData);
		loginUser({
			variables: {
				username: userData.username,
				password: userData.password,
			},
		});
	};

	return (
		<div className='h-screen w-full bg-gray-200 grid place-items-center'>
			<div className='bg-white w-full max-w-md py-12 px-8 rounded-md'>
				<h2 className='text-3xl font-bold text-center mb-8'>Login</h2>
				<form className='space-y-8' onSubmit={hanldeSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							value={userData.username}
							name='username'
							className='border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-gray-700 focus:shadow-md'
							onChange={handleChange}
							autoComplete='off'
						/>
					</div>

					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							value={userData.password}
							name='password'
							className='border border-gray-300 block mt-1 w-full h-10 rounded px-2 transition duration-300 focus:outline-none focus:border-gray-700 focus:shadow-md'
							onChange={handleChange}
						/>
					</div>

					<div>
						<p className='text-red-500 mb-2'>
							{loginError && loginError.message}
						</p>
						<input
							type='submit'
							value={
								loading
									? "Logging in..."
									: data
									? "Logged in successfully"
									: "Log In"
							}
							className='bg-gray-800 w-full py-3 text-gray-50 rounded transition duration-300 ring-0 focus:ring-4 ring-gray-400 focus:outline-none uppercase text-sm tracking-wider'
						/>
					</div>

					<div>
						<p className='text-gray-700 text-center mb-3'>
							Don't have an account?
						</p>
						<button
							type='button'
							className='bg-red-500 w-full py-3 text-gray-50 rounded transition duration-300 ring-0 focus:ring-4 ring-red-300 focus:outline-none uppercase text-sm tracking-wider'>
							<Link to='/register'> Register </Link>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
