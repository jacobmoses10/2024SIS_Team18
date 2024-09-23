import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              <Link to="/">WhiteBoard</Link>
            </h1>
          </div>

          <div>
            <ul className="flex justify-evenly items-center ">
              <li className="px-6 font-bold hover:underline cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="px-6 font-bold hover:underline cursor-pointer">
                <Link to="/about">About</Link>
              </li>

              {/* Temporary reason for testing get rid of it after  */}
              <li className="px-6 font-bold hover:underline cursor-pointer">
                <Link to="/whiteboard">Whiteboard</Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-between items-center  ">
            <div className="px-3">
              <li
                className="flex space-x-3 border p-2 px-6 rounded-md"
                type="button">
                <Link to="/login" className="">
                  Login
                </Link>
              </li>
            </div>

            <div className="px-3">
              <li
                className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black"
                type="button">
                <Link to="/signup" className="">
                  Sign Up
                </Link>
              </li>
            </div>
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
