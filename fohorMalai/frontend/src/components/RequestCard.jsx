import React from "react";

const RequestCard = ({ request, onAccept, onReject }) => {
  const { username, phone, location, wasteType } = request;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 m-4 hover:shadow-2xl transition-shadow duration-300">
      {/* Card Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Waste Removal Request
      </h2>

      {/* User Information */}
      <div className="text-gray-600 space-y-2 mb-6">
        <p>
          <span className="font-semibold">Username: </span>
          {username}
        </p>
        <p>
          <span className="font-semibold">Phone: </span>
          {phone}
        </p>
        <p>
          <span className="font-semibold">Location: </span>
          {location}
        </p>
        <p>
          <span className="font-semibold">Waste Type: </span>
          {wasteType}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => onAccept(request)}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transform transition-transform duration-200 hover:scale-105"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request)}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transform transition-transform duration-200 hover:scale-105"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
