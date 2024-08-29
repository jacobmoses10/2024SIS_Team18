import React from 'react';
import { ArrowDownTrayIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';


const Navbar = () => {
  return (
    <div>
      <nav className='p-3 border-solid border-gray-600'>
        <div className='flex items-center justify-between'>

          <div>
            <h1 className='text-xl font-bold'>
              Whiteboard Canvas
            </h1>
          </div>

          <div className='flex space-x-3'>
            <IconWrapper IconComponent={ArrowDownTrayIcon} />
            <IconWrapper IconComponent={ArrowUpCircleIcon} />
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;



const IconWrapper = ({ IconComponent }) => {
  return (
    <div className='h-10 w-10 hover:bg-gray-100 rounded-md p-2 cursor-pointer'>
      <IconComponent className='w-6 h-6' />
    </div>
  );
};