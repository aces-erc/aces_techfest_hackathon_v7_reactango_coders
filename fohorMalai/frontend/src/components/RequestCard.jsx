import React, { useState } from "react";
import { acceptRequest, rejectRequest } from "../api/endPoints";

const RequestCard = ({ request }) => {
  const { id, status_display, location_display, waste_type_display } = request;
  const [status, setStatus] = useState("pending");

  const handleAccept = async () => {
    const res = await acceptRequest(id);
  };

  const handleReject = async () => {
    const res = await rejectRequest(id);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 m-4 hover:shadow-md transition-shadow duration-300">
      {/* Card Header */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center tracking-wide">
        Waste Removal Request
      </h2>

      {request && (
        <div className="text-gray-500 space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Username:</span>
            <span>{request.user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{request.user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{location_display}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Waste Type:</span>
            <span>{waste_type_display}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{status_display}</span>
          </div>
        </div>
      )}
      {/* User Information */}

      {/* Divider */}
      <hr className="mb-4 border-t border-gray-200" />

      {/* Action Buttons */}
      {status === "pending" ? (
        // Show both buttons when the status is pending
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-400 transition-colors duration-200"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="w-full bg-red-500 text-white py-2 rounded-md text-sm hover:bg-red-400 transition-colors duration-200"
          >
            Reject
          </button>
        </div>
      ) : (
        // Show only the selected button, span it across the card
        <div className="w-full mt-4">
          <button
            className={`w-full py-2 rounded-md text-sm ${
              status === "accepted"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {status === "accepted" ? "Request Accepted" : "Request Rejected"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
