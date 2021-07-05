import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { LOGIN_USER } from "../queries";
import { useUserData } from "../hooks/useUserData";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

export const Login = () => {
	const { setUser } = useUserData();
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
				<form className='space-y-6' onSubmit={hanldeSubmit}>
					<div>
						<label className='text-gray-700' htmlFor='username'>
							Username
						</label>
						<Input
							type='text'
							value={userData.username}
							name='username'
							onChange={handleChange}
							autoComplete='off'
						/>
					</div>

					<div>
						<label className='text-gray-700' htmlFor='password'>
							Password
						</label>
						<Input
							type='password'
							value={userData.password}
							name='password'
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
							className='cursor-pointer bg-gray-900 hover:bg-gray-800 w-full py-3 text-gray-50 rounded transition duration-300 ring-0 focus:ring-4 ring-gray-400 focus:outline-none uppercase text-sm tracking-wider'
						/>
					</div>

					<div>
						<p className='text-gray-700 text-center mb-3'>
							Don't have an account?
						</p>
						<Link to='/register'>
							<Button type='button' className='uppercase text-sm'>
								Register
							</Button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
