import React from "react";
import {
  PaintBrushIcon,
  ServerIcon,
  TrashIcon,
  PlusIcon,
  CursorArrowRaysIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon
} from "@heroicons/react/24/outline";
import {
  PaintBrushIcon as PaintBrushIconSolid,
  ServerIcon as ServerIconSolid,
  CursorArrowRaysIcon as CursorArrowRaysIconSolid,
  BeakerIcon as BeakerIconSolid
} from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Toolbox = ({ 
  tool, 
  setTool, 
  changePenWidth, 
  penWidth, 
  changePenColor,
  changeFillColor, 
  penColor, 
  addText,
  addShape, 
  setClearModal, 
  undo, 
  redo 
}) => {

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-2 space-x-4 rounded-md w-[650px] shadow-lg">
        {/* Switch to regular cursor/move function */}
        <div onClick={() => setTool("cursor")} className="cursor-pointer">
          <Icons IconComponent={tool === "cursor" ? CursorArrowRaysIconSolid : CursorArrowRaysIcon} />
        </div>
        
        {/* Set Tool to Pencil */}
        <div onClick={() => setTool("pencil")} className="cursor-pointer">
          <Icons IconComponent={tool === "pencil" ? PaintBrushIconSolid : PaintBrushIcon}/>
        </div>

        {/* Set Tool to Eraser */}
        <div onClick={() => setTool("eraser")} className="cursor-pointer">
          <Icons IconComponent={tool === "eraser" ? ServerIconSolid : ServerIcon}/>
        </div>

        {/* Add Object Drop-Down Menu */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="mt-1">
              <Icons IconComponent={PlusIcon} />
            </MenuButton>
          </div>
          <MenuItems
        transition
        className="absolute z-10 mt-3 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {/* Add Text Element to Canvas */}
          <MenuItem>
            <div 
              onClick={() => addText()}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
            >
              Text
            </div> 
          </MenuItem>
          
          {/* Add Square to Canvas */}
          <MenuItem>
            <div
              onClick={() => addShape("square")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
            >
              □ Square
            </div>
          </MenuItem>
          
          {/* Add Circle to Canvas */}
          <MenuItem>
            <div
              onClick={() => addShape("circle")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
            >
              ○ Circle
            </div>
          </MenuItem>
          
          {/* Add Triangle to Canvas */}
          <MenuItem>
            <div
              onClick={() => addShape("triangle")}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
            >
              △ Triangle
            </div>
          </MenuItem>
        </div>
      </MenuItems>
        </Menu>

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

        {/* Change Fill Colour */}
        <div onClick={() => changeFillColor()} className="h-10 w-10 hover:bg-gray-100 rounded-md p-2 cursor-pointer">
          <BeakerIconSolid className="w-6 h-6" color={penColor} />
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

        {/* Undo last canvas change */}
        <div onClick={undo} className="cursor-pointer">
          <Icons IconComponent={ArrowUturnLeftIcon} />
        </div>

        {/* Redo last canvas change */}
        <div onClick={redo} className="cursor-pointer">
          <Icons IconComponent={ArrowUturnRightIcon} />
        </div>

        {/* Clear the canvas */}
        <div onClick={() => setClearModal(true)} className="cursor-pointer">
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
