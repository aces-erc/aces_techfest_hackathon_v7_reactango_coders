import React, { useState } from 'react';

const RequestPage = () => {
  const [wasteType, setWasteType] = useState('');
  const [wasteWeight, setWasteWeight] = useState('');
  const [urgency, setUrgency] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Request Submitted!');
    // Uncomment below to log the values
    // console.log({
    //   wasteType,
    //   wasteWeight,
    //   urgency,
    //   location
    // });
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-50'>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className='text-2xl font-bold mb-6 text-center'>Waste Removal Request</h1>
        
        {/* Waste Type */}
        <div className='mb-4'>
          <label htmlFor="wasteType" className="block text-lg font-medium text-gray-700 mb-2">Waste Type</label>
          <select
            id="wasteType"
            className='w-full border border-gray-300 p-2 rounded-md'
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
          >
            <option value="">Select Waste Type</option>
            <option value="Degradable">Degradable</option>
            <option value="Non-BioDegradable">Non-BioDegradable</option>
          </select>
        </div>

        {/* Waste Weight */}
        <div className='mb-4'>
          <label htmlFor="wasteWeight" className="block text-lg font-medium text-gray-700 mb-2">Waste Weight (kg)</label>
          <input
            id="wasteWeight"
            type="number"
            className='w-full border border-gray-300 p-2 rounded-md'
            value={wasteWeight}
            onChange={(e) => setWasteWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>

        {/* Urgency */}
        <div className='mb-4'>
          <label htmlFor="urgency" className="block text-lg font-medium text-gray-700 mb-2">Urgency</label>
          <select
            id="urgency"
            className='w-full border border-gray-300 p-2 rounded-md'
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Location */}
        <div className='mb-6'>
          <label htmlFor="location" className="block text-lg font-medium text-gray-700 mb-2">Location</label>
          <select
            id="location"
            className='w-full border border-gray-300 p-2 rounded-md'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Itahari">Itahari</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Namche Bazaar">Namche Bazaar</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            type="submit"
            className='bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-500'
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestPage;
