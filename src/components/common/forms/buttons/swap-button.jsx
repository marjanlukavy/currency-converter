import React from "react";
import { FiRefreshCw } from "react-icons/fi";

const SwapButton = ({ onClick }) => {
  return (
    <div className="flex justify-center group">
      <button
        onClick={onClick}
        className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all duration-200 transform hover:scale-110 active:scale-95"
      >
        <FiRefreshCw className={`h-6 w-6 `} />
      </button>
    </div>
  );
};

export default SwapButton;
