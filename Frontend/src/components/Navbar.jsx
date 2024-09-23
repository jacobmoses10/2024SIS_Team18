import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Whiteboard</h1>
          </div>

          <div>
            <ul className="flex justify-evenly items-center ">
              <li className="px-6 font-bold hover:underline cursor-pointer">Home</li>
              <li className="px-6 font-bold hover:underline cursor-pointer">About</li>
            </ul>
          </div>

          <div className="flex justify-between items-center  ">
            <div className="px-3">
              <button
                className="flex space-x-3 border p-2 px-6 rounded-md"
                type="button">
                <p className="">Login</p>
              </button>
            </div>

            <div className="px-3">
              <button
                className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black"
                type="button">
                <p className="">Sign Up</p>
              </button>
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
