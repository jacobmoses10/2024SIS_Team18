import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useMediaQuery } from "react-responsive";
import mainLogo2 from'../assets/inkwise_logo2.png';
import { Bars3Icon } from '@heroicons/react/20/solid';

const Navbar = ({user, logout}) => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const desktopMode = useMediaQuery({ query: '(min-width: 1224px)' });
  const location = useLocation();

  return desktopMode ? (
    <div className="bg-white">
      <nav className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold hover:animate-pulse transition">
              <Link to="/">
                <img className="h-10 w-full" src={mainLogo2} alt=""/>
              </Link>
            </h1>
          </div>

          <div>
            <ul className="flex justify-evenly items-center">
              <Link to="/">
                <li className={`px-4 mx-2 font-bold py-1 rounded-md hover:bg-slate-100 ${location.pathname === '/' && `bg-slate-100`} transition cursor-pointer`}>
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className={`px-4 mx-2 font-bold py-1 rounded-md hover:bg-slate-100 ${location.pathname === '/about' && `bg-slate-100`} transition cursor-pointer`}>
                  About
                </li>
              </Link>
              {user && (
                <Link to="/whiteboard">
                  <li className={`px-4 mx-2 font-bold py-1 rounded-md hover:bg-slate-100 ${location.pathname === '/whiteboard' && `bg-slate-100`} transition cursor-pointer`}>
                    Draw
                  </li>
                </Link>
              )}
              {user && (
                <Link to="/userwhiteboards">
                  <li className={`px-4 mx-2 font-bold py-1 rounded-md hover:bg-slate-100 ${location.pathname === '/userwhiteboards' && `bg-slate-100`} transition cursor-pointer`}>
                  My Whiteboards
                  </li>
                </Link>
              )}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            {user ? (
              <div className="px-3 ">
                <li
                  className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black hover:bg-blue-600 transition cursor-pointer"
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
                      className="flex space-x-3 border p-2 px-6 rounded-md hover:bg-blue-600 hover:text-white transition"
                      type="button">
                      Login
                    </li>
                  </Link>
                </div>

                <div className="px-3">
                  <Link to="/signup">
                    <li
                      className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black hover:bg-blue-600 transition"
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
  ) : (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold hover:animate-pulse transition">
            <Link to="/">
              <img className="h-10" src={mainLogo2} alt=""/>
            </Link>
          </h1>
        </div>
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex space-x-3 border m-3 p-2 rounded-md text-white bg-black hover:bg-blue-600 transition">
          <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
        <MenuItem>
            <Link to="/">
              <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                Home
              </li>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/about">
              <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                About
              </li>
            </Link>
          </MenuItem>
          {user ? (
            <div>
              <MenuItem>
                <Link to="/whiteboard">
                  <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900r">
                    Draw
                  </li>
                </Link>
              </MenuItem>           
              <MenuItem>
                <Link to="/userwhiteboards">
                  <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                    My Whiteboards
                  </li>
                </Link>
              </MenuItem>
              <MenuItem>
                  <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900" onClick={handleLogout}>
                    Logout
                  </li>
              </MenuItem>
            </div>       
          ) : (
            <div>
              <MenuItem>
                <Link to="/login">
                  <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                    Login
                  </li>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup">
                  <li className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                    Sign Up
                  </li>
                </Link>
              </MenuItem>
            </div>
          )}
        </div>
      </MenuItems>
    </Menu>
      </div>
    </div>
  );
};

export default Navbar;
