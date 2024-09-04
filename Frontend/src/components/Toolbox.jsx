import React, { useState } from "react";
import {
  PaintBrushIcon,
  ServerIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const Toolbox = ({ changePenWidth, penWidth, changePenColor, penColor, toggleErase, addText, clearCanvas }) => {
  const [isPencil, setIsPencil] = useState(true); 

  //toggle between pencil and eraser animation
  const handleIconToggle = () => {
    setIsPencil(!isPencil); 
    toggleErase(); 
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-2 space-x-4 rounded-md w-[350px] shadow-lg">
        {/* toggle between pencil and eraser */}
        <div onClick={handleIconToggle} className="cursor-pointer">
          {isPencil ? <Icons IconComponent={PaintBrushIcon} /> : <Icons IconComponent={ServerIcon} />}
        </div>

        {/* Color Chooser */}
        <div className="p-2 cursor-pointer flex justify-center items-center hover:bg-gray-100 rounded-md h-10 w-10 relative">
          <div
            className="w-5 h-5 border-2 border-black rounded relative"
            style={{ backgroundColor: penColor }} // Apply selected pen color
          >
            <input
              type="color"
              onChange={(event) => changePenColor(event.target.value)}
              value={penColor}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Pen Width */}
        <div className="w-full flex">
          <input
            type="range"
            onChange={(event) => changePenWidth(event.target.value)}
            value={penWidth}
            min="1"
            max="30"
            className="w-[100px] appearance-none h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Add Text Element to Canvas */}
        <div onClick={addText} className="cursor-pointer">
          <Icons IconComponent={PlusIcon} />
        </div>

        {/* Clear the Canvas */}
        <div onClick={clearCanvas} className="cursor-pointer">
          <Icons IconComponent={TrashIcon} />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;

const Icons = ({ IconComponent }) => {
  return (
    <div className="h-10 w-10 hover:bg-gray-100 rounded-md p-2">
      <IconComponent className="w-6 h-6" />
    </div>
  );
};
