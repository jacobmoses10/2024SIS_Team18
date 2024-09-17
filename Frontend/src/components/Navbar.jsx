import React from "react";
import {ArrowDownTrayIcon} from "@heroicons/react/24/solid";
import {SparklesIcon} from "@heroicons/react/24/outline";

const Navbar = ({downloadBoard}) => {
  return (
    <div>
      <nav className="p-3 border-solid border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Whiteboard Canvas</h1>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="flex space-x-3 px-2"
              type="button"
              onClick={downloadBoard}>
              <IconWrapper IconComponent={ArrowDownTrayIcon} />
            </button>
            <button
              className="flex space-x-3 px-2"
              type="button"
              onClick={downloadBoard}>
              <IconWrapper IconComponent={SparklesIcon} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const IconWrapper = ({IconComponent}) => {
  return (
    <div className="h-10 w-10 hover:bg-gray-100 rounded-md p-2 ">
      <IconComponent className="w-6 h-6" />
    </div>
  );
};
