import React, { useEffect, useState } from "react";
import coverImg from "../assets/login.avif";
import profileImg from "../assets/landing.avif";
import { get } from "react-hook-form";
import { getMyWasteRequests, getUser } from "../api/endPoints";
import { useParams } from "react-router-dom";

// wastes/[username]

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [request, setRequest] = useState([]);

  async function fetchUser() {
    try {
      const curruser = await getUser(username);
      setUser(curruser);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getMyWasteRequests(username);
        setRequest(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequests();
    fetchUser();
  }, [username]);

  return (
    <div className="h-full w-full bg-lime-50 flex flex-col items-center">
      {/* Profile Cover */}
      <div
        className="w-full h-64 relative shadow-md"
        style={{
          backgroundImage: `url(${coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Profile Picture */}
        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2">
          <img
            src={profileImg}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{username}</h1>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </div>

      {/* User Records Section */}
      <div className="w-full max-w-6xl mt-12 bg-white shadow-lg rounded-lg p-6 m-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Previous Records
        </h2>
        {/* Record List */}
        <div className="overflow-auto">
          <table className="w-full table-auto text-left border-collapse">
            <thead>
              <tr className="text-gray-600 font-semibold border-b">
                <th className="p-3">Date</th>
                <th className="p-3">Request Type</th>
                <th className="p-3">Weight (kg)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {request &&
                request.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-green-200">
                    <td className="p-3">{req.collection_date}</td>
                    <td className="p-3">{req.waste_type_display}</td>
                    <td className="p-3">{req.waste_weight}</td>
                    {/* fix the color for different status of the req */}
                    <td
                      className={`p-3 font-medium ${
                        req.status_display === "pending"
                          ? "text-purple-400"
                          : req.status_display === "accepted"
                          ? "text-lime-400"
                          : req.status_display === "rejected"
                          ? "text-red-400"
                          : req.status_display === "completed"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      {req.status_display}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // `p-3 font-medium `
  );
};

export default Profile;
