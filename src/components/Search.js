import React from "react";
import { Dialog } from "@headlessui/react";
import { Spinner } from "../ui/Spinner";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button } from "../ui/Button";
import { SEARCH_USER } from "../queries";
import { useUserData } from "../hooks/useUserData";

export const Search = ({ isOpen, setIsOpen }) => {
	const { token } = useUserData();
	const [searchUser, { data, loading, error }] = useLazyQuery(SEARCH_USER);
	const history = useHistory();
	const handleChange = (e) => {
		e.target.value !== "" &&
			searchUser({ variables: { token: token, query: e.target.value } });
	};

	const handleClick = (username) => {
		history.push("/" + username);
		setIsOpen(false);
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-sm mx-auto py-10 rounded'
			style={{
				boxShadow: "0 0 0 100vw rgba(0, 0, 0, .5)",
			}}>
			<Dialog.Overlay />
			<div className='w-full h-96'>
				<div className='bg-white h-full max-w-sm rounded px-6 w-full flex flex-col'>
					<input
						type='text'
						placeholder='Search...'
						className='py-2 px-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500 focus:ring-1 ring-indigo-500 transition duartion-300'
						onChange={handleChange}
					/>
					<div className='flex-1 flex items-center justify-center'>
						{loading ? (
							<Spinner />
						) : error ? (
							"error"
						) : data && data.searchUser.results.length !== 0 ? (
							<div className='w-full px-5 space-y-4 self-start mt-8'>
								{data.searchUser.results.map((user) => (
									<div
										key={user.id}
										className='cursor-pointer py-2 px-3 border rounded shadow'
										onClick={() => handleClick(user.username)}>
										{user.username}
									</div>
								))}
							</div>
						) : (
							<span className='text-gray-500'>No users found</span>
						)}
					</div>
					<Button onClick={() => setIsOpen(false)} className='w-max py-2 px-6'>
						Close
					</Button>
				</div>
			</div>
		</Dialog>
	);
};
