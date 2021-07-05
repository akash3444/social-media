import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/Button";
import { REGISTER_USER } from "../queries";
import Input from "../ui/Input";

export const Register = () => {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const history = useHistory();

	const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
		onCompleted: (data) => {
			console.log("registered", data);
			history.push("/login");
		},
	});

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
		registerUser({
			variables: userData,
		});
	};

	return (
		<div className='h-screen w-full bg-gray-200 grid place-items-center'>
			<div className='bg-white w-full max-w-md py-12 px-8 rounded-md'>
				<h2 className='text-3xl font-bold text-center mb-8'>Register</h2>
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
						<label className='text-gray-700' htmlFor='email'>
							Email
						</label>
						<Input
							type='email'
							value={userData.email}
							name='email'
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
						<p className='text-red-500 mb-2'>{error && error.message}</p>
						<input
							type='submit'
							value={
								loading
									? "Registering.."
									: data
									? "Registered successfully"
									: "Register"
							}
							className='cursor-pointer bg-gray-900 hover:bg-gray-800 w-full py-3 text-gray-50 rounded transition duration-300 ring-0 focus:ring-4 ring-gray-400 focus:outline-none uppercase text-sm tracking-wider'
						/>
					</div>

					<div>
						<p className='text-gray-700 text-center mb-3'>
							Already have an account?
						</p>
						<Link to='/login'>
							<Button type='button' className='uppercase text-sm'>
								Log In
							</Button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
