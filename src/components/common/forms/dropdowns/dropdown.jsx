import React, { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import useOutsideClick from "../../../../hooks/useOutsideClick";

const CustomDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left"
      >
        <span className="block truncate">{value}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FiChevronDown className="h-5 w-5 text-gray-400" />
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg top-10 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option}
              className={`${
                option === value ? "bg-blue-100 text-blue-900" : "text-gray-900"
              } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50`}
              onClick={() => {
                onChange({ target: { value: option } });
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
