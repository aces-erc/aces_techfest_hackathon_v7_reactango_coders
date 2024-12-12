import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { header } from "../links/header";
import { CiUser } from "react-icons/ci";
import { logout } from "../api/endPoints";
import { toast } from "react-toastify";
import { UserContext } from "../context/AuthContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        localStorage.removeItem("username");
        localStorage.removeItem("auth");
        toast("Logged out successfully!");
        navigate("/signup");
      } else {
        toast.warn("Login Failed! Please try again later!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full shadow-md bg-white">
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
            <Link
              to={`/home/${username}`}
              className="text-gray-600 hover:text-green-400 font-medium"
            >
              Home
            </Link>
          </li>
          {header &&
            header.map((header, index) => (
              <li key={index}>
                <Link
                  to={header.url}
                  className="text-gray-600 hover:text-green-400 font-medium"
                >
                  {header.name}
                </Link>
              </li>
            ))}
        </ul>

        {/* Profile Section */}
        <div className="relative">
          <CiUser
            className="w-10 p-2 h-10 rounded-full border border-gray-300 cursor-pointer"
            onClick={toggleDropdown}
            size={24}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <Link
                    to={`/profile/${username}`}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </div>
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
