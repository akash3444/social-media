import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Search } from "./Search";
import FillHome from "./icons/FillHome";
import OutlineAdd from "./icons/OutlineAdd";
import OutlineExplore from "./icons/OutlineExplore";
import ActivityFeed from "./ActivityFeed";
import ProfilePopover from "./ProfilePopover";

export const Navbar = () => {
	const history = useHistory();
	const { pathname } = history.location;
	const [isOpen, setIsOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	return (
		<>
			<div className='sticky top-0 border-b h-14 bg-white'>
				<div className='max-w-screen-lg flex items-center justify-between h-full mx-auto px-5'>
					<img
						src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
						alt='Logo'
						className='cursor-pointer'
						onClick={() => history.push("/")}
					/>

					<div className='flex items-center space-x-5 text-gray-600'>
						<div className='cursor-pointer' onClick={() => history.push("/")}>
							{pathname === "/" ? <FillHome /> : <AiOutlineHome size={25} />}
						</div>
						<div className='cursor-pointer' onClick={() => setIsOpen(true)}>
							<OutlineAdd />
						</div>
						<OutlineExplore />
						<ActivityFeed />
						<IoSearchOutline
							size={25}
							className='cursor-pointer'
							onClick={() => setIsSearchOpen(true)}
						/>
						<ProfilePopover />
					</div>
				</div>
			</div>
			<CreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
			<Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
		</>
	);
};
