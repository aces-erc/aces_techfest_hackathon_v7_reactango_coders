import { Link, useNavigate, useParams } from "react-router-dom";
import Home from "../assets/home-banner.avif";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { heros } from "../links/heros";
import { sections } from "../links/sections";
import { UserContext } from "../context/AuthContext";

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center border h-full w-full">
      {/* Hero Section */}
      <div className="w-full  h-[90vh] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
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
            Embrace the beauty of the future with us.
          </h2>
        </div>
      </div>
      {/* Container: Achievements of Our Company */}
      <div className="flex flex-wrap justify-center gap-6 w-full py-10 bg-white">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-3xl font-bold text-green-600 mb-2">
            2000+ kg of waste collected
          </h3>
          <p className="text-gray-800 font-medium">
            We as a team have been able to collect more than 2000kg of waste
            from different parts of the country.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-3xl font-bold text-green-600 mb-2">
            150+ numbers of employees
          </h3>
          <p className="text-gray-800 font-medium">
            We have been able to generate more than 150+ employment
            opportunities for the community.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h3 className="text-3xl font-bold text-green-600 mb-2">
            Over 50+ places of Nepal
          </h3>
          <p className="text-gray-800 font-medium">
            We have been able to collect waste from over 50+ places of Nepal.
          </p>
        </div>
      </div>
      {/* CTA Section */}
      <div className="w-[70%] bg-white py-10 px-5 pb-16 md:px-20">
        <h1 className="text-4xl font-extrabold mb-6">Issues We Work On</h1>
        <p className="text-gray-600 mb-8">
          For more than 35 years, we have been at the forefront of driving
          economic and environmental solutions to solve the world's challenges.
        </p>

        {/* Accordion Section */}
        <div className=" flex flex-col border-t border-gray-300">
          {sections &&
            sections.map((section, index) => (
              <div key={index} className="border-b border-gray-300">
                {/* Title */}
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center py-4 text-left"
                >
                  <h2
                    className={`text-xl font-bold ${
                      activeIndex === index ? "text-black" : "text-green-600"
                    }`}
                  >
                    {section.title}
                  </h2>
                  {activeIndex === index ? (
                    <FiChevronUp size={24} />
                  ) : (
                    <FiChevronDown size={24} />
                  )}
                </button>

                {/* Content */}
                {activeIndex === index && (
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10 py-4">
                    <p className="text-gray-700 flex-1">
                      {section.description}
                    </p>
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-[320px] h-[220px] object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <p className="text-gray-600 mb-8">
        Our heroes are the people who make it possible for us to do what we do.
      </p>
      <h1 className="text-4xl font-extrabold mb-6">Our Heroes</h1>
      <div className="flex gap-5 bg-white py-10 px-5 pb-16 md:px-20">
        {heros &&
          heros.map((heros, index) => (
            <HeroCard key={index} image={heros.imageUrl} name={heros.name} />
          ))}
      </div>
    </div>
  );
};

export default Homepage;
