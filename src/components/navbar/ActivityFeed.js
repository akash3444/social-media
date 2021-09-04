import React from "react";
import { useQuery } from '@apollo/client';
import { Popover } from "@headlessui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import OutlineHeart from "../icons/OutlineHeart";
import { GET_ACTIVITY } from "../../queries";
import { useUserData } from "../../hooks/useUserData";

const ActivityFeed = () => {
	const { token } = useUserData();

	const { data, error, loading } = useQuery(GET_ACTIVITY, {
		variables: {
			token
		}
	});

	return (
		<Popover className='relative'>
			<Popover.Button className='relative top-1'>
				<OutlineHeart />
			</Popover.Button>

			<Popover.Panel
				className='absolute -right-4 border h-96 w-96 bg-white shadow-xl rounded-lg'
				style={{ top: "calc(100% + .5rem)" }}>
				<div>
				{loading && "Loading..."}
				{error && "Error" + error.message}
				{data && data.activities.map(({ username, text, profilePicture, createdAt}) => (
					<div className="flex items-center p-4">
						<div>
							<img src={profilePicture ? profilePicture : 'https://picsum.photos/100/100'} alt={username} className="h-12 w-12 rounded-full ring-1 ring-offset-2 mr-5"/>
						</div>
						<div>
							<b>{username}</b>
							<span className="text-gray-700 ml-0.5">{text}</span>
							<p className="-mt-1 text-gray-500 text-sm">{formatDistanceToNow(new Date(parseInt(createdAt)))}</p>
						</div>
					</div>

				))}
				</div>
			</Popover.Panel>
		</Popover>
	);
};

export default ActivityFeed;
