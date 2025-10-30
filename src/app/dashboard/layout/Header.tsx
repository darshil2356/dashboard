"use client";
import React, { useState } from "react";

interface User {
  name: string;
  avatar?: string;
}
interface HeaderProps {
  user: User;
  badges?: { notifications?: number; messages?: number };
  onSearch?: (query: string) => void;
  searchValue?: string;
  mobileToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  badges = {},
  onSearch,
  searchValue = "",
  mobileToggle,
}) => {
  const [arrowUp, setArrowUp] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) onSearch(e.target.value);
  };

  const toggleArrow = () => setArrowUp(!arrowUp);

  const SearchIcon = <i className="fi fi-rr-search text-[#858D9D] w-6 h-6" />;
  const CalendarIcon = (
    <i className="fi fi-sr-calendar w-6 h-6 text-[#858D9D]" />
  );
  const BellIcon = <i className="fi fi-sr-bell w-6 h-6 text-[#858D9D]" />;
  const EnvelopeIcon = (
    <i className="fi fi-sr-envelope w-6 h-6 text-[#858D9D]" />
  );
  const ArrowIcon = (
    <i
      className={`fi ${
        arrowUp ? "fi-rr-caret-up" : "fi-rr-caret-down"
      } w-6 h-6 text-[#858D9D]`}
    />
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="
  
   flex    items-center justify-between
    bg-[#FBFBFB] p-4 w-full gap-3
  "
    >
      <div className="flex items-center flex-1">
        <div
          className="
      flex items-center w-full max-w-[100px] h-[40px] bg-transparent rounded-md px-2
      md:max-w-[300px] sm:max-w-[200px]
      transition-all duration-300
      pl-12 md:pl-0   /* <-- add left padding only when hamburger is visible */"
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center">
            {SearchIcon}
          </div>
          <input
            type="text"
            placeholder={`Search ${user?.name}`}
            value={searchValue}
            onChange={handleSearchChange}
            className="flex-1 h-[40px]  pl-2 text-[#4A4C56] placeholder-[#858D9D] focus:outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-end sm:justify-normal ml-0 sm:ml-4 w-full sm:w-auto  ">
        <div className="hidden md:flex items-center space-x-4">
      
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded hover:bg-gray-100">
            {CalendarIcon}
          </div>
          <div className="relative w-[40px] h-[40px] flex items-center justify-center rounded hover:bg-gray-100">
            {BellIcon}
            {badges.notifications && badges.notifications > 0 && (
              <div
                className="absolute top-[0.5px] right-[6px] min-w-[16px] h-4 px-1 rounded-[4px] flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: "#2BB2FE" }}
              >
                {badges.notifications}
              </div>
            )}
          </div>

          <div className="relative w-[40px] h-[40px] flex items-center justify-center rounded hover:bg-gray-100">
            {EnvelopeIcon}
            {badges.notifications && badges.notifications > 0 && (
              <div
                className="absolute top-[0.5px] right-[6px] min-w-[16px] h-4 px-1 rounded-[4px] flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: "#2BB2FE" }}
              >
                {badges.notifications}
              </div>
            )}
          </div>
        </div>
        <div
          className="flex  items-center ml-4 space-x-0 sm:space-x-space-y-0 sm:space-y-0 cursor-pointer select-none text-center"
          onClick={toggleArrow}
        >
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
              {user?.name[0]}
            </div>
          )}
          <span className="text-sm font-medium text-[#4A4C56]">
            {user?.name}
          </span>
      
          <div className="w-6 h-6 flex items-center justify-center">
            <i
              className={`fi ${
                arrowUp ? "fi-sr-caret-up" : "fi-sr-caret-down"
              } text-[#858D9D] h-6 w-6`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
