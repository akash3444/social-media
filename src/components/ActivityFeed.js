import React from "react";
import { Popover } from "@headlessui/react";
import OutlineHeart from "./icons/OutlineHeart";

const ActivityFeed = () => {
	return (
		<Popover className='relative'>
			<Popover.Button className='relative top-1'>
				<OutlineHeart />
			</Popover.Button>

			<Popover.Panel
				className='absolute -right-4 border h-96 w-96 bg-white shadow-xl rounded-lg p-5'
				style={{ top: "calc(100% + .5rem)" }}>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam hic
					illum repellendus eligendi nam odio facere neque qui enim magni ut
					eveniet tempore fugiat in rerum voluptatum culpa iste aut eius, sit
					nihil libero ullam impedit? Labore aliquam quaerat voluptatibus nihil
					illum magnam? Iste, vitae ullam. Non repellendus soluta libero.
				</p>
			</Popover.Panel>
		</Popover>
	);
};

export default ActivityFeed;
