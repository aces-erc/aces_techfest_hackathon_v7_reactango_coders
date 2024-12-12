import React from "react";
import Landing from "../assets/landing.avif";
import { Link } from "react-router-dom";
import DustbinMap from "../components/DustbinMap";

const LandingPage = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Transparent Header */}
      <header className="fixed top-0 z-50 w-full bg-transparent">
        <nav className="flex items-center justify-center py-2">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-4xl font-samarkan font-extrabold text-white">
              <Link to={"/"}>
                <span className="text-green-400">Fohor</span>Malai
              </Link>
            </h1>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className=" w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${Landing})`,
          }}
        ></div>

        {/* Slogan Overlay */}
        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center text-white bg-black bg-opacity-50">
          {/* Slogan with Drop Shadow */}
          <div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
              <span className="text-green-400">Your Waste,</span> <br /> Our
              Responsibility
            </h1>
            <h2 className="text-lg md:text-2xl text-white font-bold mt-4 drop-shadow-md">
              Together for a Greener Future.
            </h2>
          </div>

          {/* Enhanced Signup Button */}
          <div className="mt-6">
            <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              <a href="/signup">Get Started</a>
            </button>
          </div>
        </div>
      </div>

      <DustbinMap />
    </div>
  );
};

export default LandingPage;
