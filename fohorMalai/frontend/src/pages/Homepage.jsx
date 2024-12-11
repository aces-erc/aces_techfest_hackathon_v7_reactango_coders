import React from "react";
import { Link } from "react-router-dom";
import Home from "../assets/home-banner.avif";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center border h-screen w-full">
      {/* Hero Section */}
      <div className="h-[90%] w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Home})`,
          }}
        ></div>

        {/* Slogan Overlay */}
        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            <span className="text-green-400">Empowering the Future</span>, One
            Step at a Time
          </h1>
          <h2 className="text-lg md:text-2xl text-white font-semibold mt-4">
            Embrace the beatuy of the future with us.
          </h2>
        </div>
      </div>

      {/* Container: Achievements of Our Company */}
      <div className="bg-purple-600 flex justify-around w-full py-10">
        <div className="bg-white p-4 rounded-lg shadow-md">Card 1</div>
        <div className="bg-white p-4 rounded-lg shadow-md">Card 2</div>
        <div className="bg-white p-4 rounded-lg shadow-md">Card 3</div>
      </div>
    </div>
  );
};

export default Homepage;
