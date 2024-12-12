import React from 'react';

const HeroCard = ({ 
  imageUrl, 
  name, 
  alt = "Hero image" 
}) => {
  return (
    <div className="h-52 flex flex-col items-center p-4 rounded-lg shadow-md max-w-xs mb-20">
      <div className="w-48 h-48 mb-4">
        <img 
          src={imageUrl} 
          alt={alt}
          className="w-full h-full object-cover rounded-full border-4 border-gray-200"
        />
      </div>
      <h2 className="text-xl font-semibold text-center">
        {name}
      </h2>
    </div>
  );
};

export default HeroCard;