import React from 'react'
import Toolbox from './Toolbox'

const Whiteboard = () => {
  return (
    <div className=''>

        <div className='bg-gray-200 rounded-md w-full h-screen'>
            <div className='p-4'>
                <Toolbox ></Toolbox>
            </div>
        </div>
    </div>
  )
}

export default Whiteboard