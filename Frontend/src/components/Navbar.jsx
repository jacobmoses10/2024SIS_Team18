import React from "react";
import {Link} from "react-router-dom";
import mainLogo2 from'../assets/inkwise_logo2.png';

const Navbar = ({user, logout}) => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <nav className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              <Link to="/">
                <img className="h-10 w-full" src={mainLogo2} alt=""/>
              </Link>
            </h1>
          </div>

          <div>
            <ul className="flex justify-evenly items-center">
              <Link to="/">
                <li className="px-6 font-bold hover:underline cursor-pointer">
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className="px-6 font-bold hover:underline cursor-pointer">
                  About
                </li>
              </Link>
              {user && (
                <Link to="/whiteboard">
                  <li className="px-6 font-bold hover:underline cursor-pointer">
                    Whiteboard
                  </li>
                </Link>
              )}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            {user ? (
              <div className="px-3">
                <li
                  className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black cursor-pointer"
                  type="button"
                  onClick={handleLogout}>
                  Logout
                </li>
              </div>
            ) : (
              <>
                <div className="px-3">
                  <Link to="/login">
                    <li
                      className="flex space-x-3 border p-2 px-6 rounded-md"
                      type="button">
                      Login
                    </li>
                  </Link>
                </div>

                <div className="px-3">
                  <Link to="/signup">
                    <li
                      className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black"
                      type="button">
                      Sign Up
                    </li>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
