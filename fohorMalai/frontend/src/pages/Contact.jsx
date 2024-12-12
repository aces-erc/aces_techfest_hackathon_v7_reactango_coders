import React from "react";
import Map from "../components/Map";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-5">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Information */}
          <div className="bg-blue-600 text-white p-8 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Contact Information</h2>
            <p className="text-lg">Say something to start a live chat!</p>
            <div>
              <p className="flex items-center gap-2">
                <span>📞</span> 01-5553019
              </p>
              <p className="flex items-center gap-2">
                <span>✉</span> info@recentair.com
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span> Itaha, Nepal
              </p>
            </div>
            <div className="bg-white rounded-md h-60  mt-6 overflow-hidden">a
              <Map />
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
              Contact Us
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Any question or remarks? Just write us a message!
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <div>
                <p className="text-gray-600 mb-2">Select Subject:</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-blue-500" />
                    General Inquiry
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-blue-500" />
                    Sensor Inquiry
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-blue-500" />
                    Other
                  </label>
                </div>
              </div>
              <textarea
                placeholder="Message"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-24"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white w-full rounded-lg py-2 font-bold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;