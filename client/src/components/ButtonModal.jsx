const ButtonModal = ({ data, selectedOptions, handleChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 ">
      {data.map((option, i) => (
        <div
          key={i}
          className="p-2 bg-gray-100 shadow-md rounded-lg hover:shadow-lg hover:scale-105 transition duration-300"
        >
          <button
            onClick={() => handleChange(option)}
            className={`w-full h-full p-4 rounded lg ${selectedOptions.includes(option) ? "bg-green-500" : "bg-gray-100"}`}
          >
            <p className="text-lg font-semibold mb-2">{option.name || option.count}</p>
            {option.image && (
              <img className="h-24 w-auto mx-auto mb-2" src={option.image} alt="" />
            )}
            {option.people && <p className="text-sm text-gray-700 mb-2">{option.people}</p>}
            <p className="text-sm text-gray-700">${option.price}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ButtonModal;
