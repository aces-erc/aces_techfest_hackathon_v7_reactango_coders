

const HeroCard = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md max-w-xs ">
      <div className="w-48 h-48 mb-4">
        <img
          src={image}
          className="w-full h-full object-cover rounded-full border-4 border-gray-200"
        />
      </div>
      <h2 className="text-xl font-semibold text-center">{name}</h2>
    </div>
  );
};

export default HeroCard;
