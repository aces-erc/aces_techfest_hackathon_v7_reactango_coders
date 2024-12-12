import React from 'react';
import coverImg from '../assets/login.avif';
import profileImg from '../assets/landing.avif';

const Profile = () => {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col items-center">
      {/* Profile Cover */}
      <div
        className="w-full h-64 relative shadow-md"
        style={{
          backgroundImage: `url(${coverImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
        <h1 className="text-3xl font-bold text-gray-800">Shovan Bhattarai</h1>
        <p className="text-gray-600 mt-2">shovanbthr@gmail.com</p>
        <p className="text-green-600 font-semibold">User</p>
        {/* Edit Profile Button */}
        <div className="mt-6">
          <a
            href="/user/editProfile"
            className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 transition-all duration-300"
          >
            Edit Profile
          </a>
        </div>
      </div>

      {/* User Records Section */}
      <div className="w-full max-w-6xl mt-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Previous Records</h2>
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
              <tr className="border-b hover:bg-green-200">
                <td className="p-3">2024-07-05</td>
                <td className="p-3">Degradable Waste Pickup</td>
                <td className="p-3">12</td>
                <td className="p-3 text-green-500 font-medium">Completed</td>
              </tr>
              <tr className="border-b hover:bg-yellow-100">
                <td className="p-3">2024-06-28</td>
                <td className="p-3">Non-Biodegradable Pickup</td>
                <td className="p-3">8</td>
                <td className="p-3 text-yellow-500 font-medium">Pending</td>
              </tr>
              <tr className="border-b hover:bg-green-200">
                <td className="p-3">2024-06-15</td>
                <td className="p-3">Degradable Waste Pickup</td>
                <td className="p-3">15</td>
                <td className="p-3 text-green-500 font-medium">Completed</td>
              </tr>
              <tr className="border-b hover:bg-red-200">
                <td className="p-3">2024-10-15</td>
                <td className="p-3">Degradable Waste Pickup</td>
                <td className="p-3">11</td>
                <td className="p-3 text-red-500 font-medium">Rejected</td>
              </tr>
              <tr className="border-b hover:bg-blue-200">
                <td className="p-3">2024-07-15</td>
                <td className="p-3">Non-Biodegradable Waste Pickup</td>
                <td className="p-3">9</td>
                <td className="p-3 text-blue-500 font-medium">Accepted</td>
              </tr>
            </tbody>
          </table>
          {/* Placeholder Message for No Records */}
          {/* <p className="text-gray-500 mt-4">No records found.</p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
