import React, { useState } from "react";

const RequestPage = () => {
  const [wasteType, setWasteType] = useState("");
  const [wasteWeight, setWasteWeight] = useState("");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Submitted!");
    // Uncomment below to log the values
    // console.log({
    //   wasteType,
    //   wasteWeight,
    //   urgency,
    //   location
    // });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      {/* Container with styling */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-2xl w-[40%] h-[90%] flex flex-col justify-between"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Waste Removal Request
        </h1>

        {/* Form Fields */}
        <div className="flex flex-col space-y-6 flex-1">
          {/* Waste Type */}
          <div>
            <label
              htmlFor="wasteType"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Waste Type
            </label>
            <select
              id="wasteType"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-blue-400 transition-all duration-200"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
            >
              <option value="">Select Waste Type</option>
              <option className="hover:bg-blue-100" value="Degradable">
                Degradable
              </option>
              <option className="hover:bg-blue-100" value="Non-BioDegradable">
                Non-BioDegradable
              </option>
            </select>
          </div>

          {/* Waste Weight */}
          <div>
            <label
              htmlFor="wasteWeight"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Waste Weight (kg)
            </label>
            <input
              id="wasteWeight"
              type="number"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 hover:ring-blue-400 transition-all duration-200"
              value={wasteWeight}
              onChange={(e) => setWasteWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </div>

          {/* Urgency */}
          <div>
            <label
              htmlFor="urgency"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Urgency
            </label>
            <select
              id="urgency"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-blue-400 transition-all duration-200"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="">Select Urgency</option>
              <option className="hover:bg-blue-100" value="Low">
                Low
              </option>
              <option className="hover:bg-blue-100" value="High">
                High
              </option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Location
            </label>
            <select
              id="location"
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 hover:ring-blue-400 transition-all duration-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option className="hover:bg-blue-100" value="Itahari">
                Itahari
              </option>
              <option className="hover:bg-blue-100" value="Kathmandu">
                Kathmandu
              </option>
              <option className="hover:bg-blue-100" value="Namche Bazaar">
                Namche Bazaar
              </option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-green-500 hover:scale-105 transform transition-all duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPage;
