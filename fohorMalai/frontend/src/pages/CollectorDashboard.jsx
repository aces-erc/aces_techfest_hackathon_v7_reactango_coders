import React, { useEffect, useState } from "react";
import RequestCard from "../components/RequestCard";
import { pullRequests } from "../api/endPoints";

const CollectorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await pullRequests();
        setRequests(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Collector Dashboard
      </h1>

      {/* Requests Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <p className="text-xl text-gray-600">No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default CollectorDashboard;
