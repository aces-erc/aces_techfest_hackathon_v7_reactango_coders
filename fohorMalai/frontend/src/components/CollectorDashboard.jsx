import React, { useState } from "react";
import RequestCard from "./RequestCard";

const CollectorDashboard = () => {
  // Dummy request data
  const [requests, setRequests] = useState([
    {
      id: 1,
      username: "Shovan Bhattarai",
      phone: "9876543210",
      location: "Kathmandu",
      wasteType: "Degradable",
    },
    {
      id: 2,
      username: "Shovan Bhattarai",
      phone: "9876543210",
      location: "Kathmandu",
      wasteType: "Degradable",
    },
    {
      id: 1,
      username: "Shovan Bhattarai",
      phone: "9876543210",
      location: "Kathmandu",
      wasteType: "Degradable",
    },
    {
      id: 1,
      username: "Shovan Bhattarai",
      phone: "9876543210",
      location: "Kathmandu",
      wasteType: "Degradable",
    },
    {
      id: 1,
      username: "Shovan Bhattarai",
      phone: "9876543210",
      location: "Kathmandu",
      wasteType: "Degradable",
    }
  ]);

  // Handle Accept
  const handleAccept = (request) => {
    alert(`Request from ${request.username} has been accepted!`);
    // Logic to handle accepted request (e.g., updating the server/database)
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  // Handle Reject
  const handleReject = (request) => {
    alert(`Request from ${request.username} has been rejected!`);
    // Logic to handle rejected request
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Collector Dashboard
      </h1>

      {/* Requests Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        ) : (
          <p className="text-xl text-gray-600">No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default CollectorDashboard;
