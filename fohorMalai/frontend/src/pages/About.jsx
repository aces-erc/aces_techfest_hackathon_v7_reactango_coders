import React from "react";
import Innovation from "../assets/innovation.avif";
import Collaboration from "../assets/orange.avif";
import Excellence from "../assets/brown.avif";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      {/* Hero Section */}
      <section className="bg-green-400 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-lg font-bold md:text-xl">
            We are a passionate team dedicated to improving environmeantal
            health and ensuring best future for our upcoming generation.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To create a digitally accessible platform for waste management for
            the every citizen of the country.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-green-800 mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 rounded-full text-5xl mb-4">
                <img
                  className="w-20 h-20 rounded-full mx-auto"
                  src={Innovation}
                  alt=""
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and continuously look for new ways to
                solve environmental challenges.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 rounded-full text-5xl mb-4">
                <img
                  className="w-20 h-20 rounded-full mx-auto"
                  src={Collaboration}
                  alt=""
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in working together to achieve common goals and
                foster relationships.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 rounded-full text-5xl mb-4">
                <img
                  className="w-20 h-20 rounded-full mx-auto"
                  src={Excellence}
                  alt=""
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Our team is committed to delivering quality and exceeding
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-500 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Join Us in Shaping the Future
          </h2>
          <p className="mb-6">
            Contact us to learn more about our mission and how we can work
            together.
          </p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-900 text-white font-semibold rounded">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
