const Chip = ({icon, text}) => {
    return (
      <div className="flex flex-wrap bg-gray-900 rounded-lg mx-1 px-2 py-2">
          {icon}
          <span className="text-white ml-2">{text}</span>
      </div>
    );
  };
  export default Chip;