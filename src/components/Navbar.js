import React, { useState } from "react";
import { BiSearch, BiSkipPrevious } from "react-icons/bi";
import { Search } from "./Search";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [searchDisplay, setSearchDisplay] = useState(false);

  return (
    <>
      <div
        className={`bg-white h-14 flex items-center justify-between px-5 ${
          searchDisplay ? "sticky top-0" : ""
        }`}
      >
        <h3 className="uppercase font-bold text-gray-700 tracking-wider">
          Social App
        </h3>
        <div
          className="flex items-center h-10 bg-blue-50 p-2 space-x-2 rounded relative"
          onClick={() => setSearchDisplay((prevDisplay) => !prevDisplay)}
        >
          <label htmlFor="search">
            <BiSearch size="20" className="text-gray-400" />
          </label>
          <input
            type="text"
            placeholder="Search"
            id="search"
            autoComplete="off"
            className="bg-transparent focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search searchDisplay={searchDisplay} query={query} />
        </div>
      </div>
    </>
  );
};
