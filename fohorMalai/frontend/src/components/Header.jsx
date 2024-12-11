import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="shadow-md bg-white">
      <nav className="flex items-center justify-between p-4">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-samarkan font-extrabold text-gray-600">
            <span className="text-green-400">Fohor</span>Malai
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a href="#home" className="text-gray-600 hover:text-green-400 font-medium">Home</a>
          </li>
          <li>
            <a href="#about" className="text-gray-600 hover:text-green-400 font-medium">About</a>
          </li>
          <li>
            <a href="#services" className="text-gray-600 hover:text-green-400 font-medium">Services</a>
          </li>
          <li>
            <a href="#contact" className="text-gray-600 hover:text-green-400 font-medium">Contact</a>
          </li>
        </ul>

        {/* Profile Section */}
        <div className="relative">
          <img
            src=""
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#signout"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
