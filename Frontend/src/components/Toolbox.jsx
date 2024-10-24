import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowClockwise, ArrowCounterClockwise, CaretDown, CaretUp, Download, Eraser, FloppyDisk, HandGrabbing, PaintBrush, PaintBucket, Robot, Shapes, Trash } from "@phosphor-icons/react";

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
  setBotModal,
  undo,
  redo,
  downloadBoard,
  sliderVisible,
  setSliderVisible,
  saveWhiteBoard
}) => {
  const [toolbarVisible, setToolbarVisible] = useState(true);

  return toolbarVisible ? (
    <div>
      <div className="items-center bg-white p-2 rounded-md shadow-lg">
        <div onClick={() => setToolbarVisible(!toolbarVisible)} title="Hide Toolbar" 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}>
        <CaretUp size={32} />
        </div>
        
        {/* Switch to regular cursor/move function */}
        <div onClick={() => setTool("cursor")}
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center ${tool === "cursor" && "bg-slate-200"} hover:bg-slate-100`}
        title="Move Tool">
          <HandGrabbing size={32} />
        </div>

        {/* Set Tool to Pencil */}
        <div onClick={() => setTool("pencil")}
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center ${tool === "pencil" && "bg-slate-200"} hover:bg-slate-100`}
        title="Drawing Tool">
        <PaintBrush size={32} />
        </div>

        {/* Set Tool to Eraser */}
        <div onClick={() => setTool("eraser")} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center ${tool === "eraser" && "bg-slate-200"} hover:bg-slate-100`}
        title="Eraser">
        <Eraser size={32} />
        </div>

        {/* Pen Width */}
        <div onClick={() => setSliderVisible(!sliderVisible)}
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Change Size">
        <b className="text-2xl font-normal leading-none">{penWidth}</b>
        </div>
        <div className="w-0 h-0" hidden={!sliderVisible}>
          <input
            type="range"
            onChange={(event) => changePenWidth(event.target.value)}
            value={penWidth}
            min="1"
            max="50"
            className="appearance-none bg-gray-300 -rotate-90 rounded-lg cursor-pointer"
          />
        </div>

        {/* Add Object Drop-Down Menu */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
            title="Add Object">
            <Shapes size={32} />
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
            title="Change Colour"
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
        <div
          onClick={() => changeFillColor()}
          className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
          title="Fill Selected">
          <PaintBucket size={32} />
        </div>

        {/* Undo last canvas change */}
        <div onClick={undo} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Undo">
        <ArrowCounterClockwise size={32} />
        </div>

        {/* Redo last canvas change */}
        <div onClick={redo} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Redo">
        <ArrowClockwise size={32} />
        </div>

        {/* Select AI Model */}
        <div onClick={() => setBotModal(true)} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Change AI Model">
        <Robot size={32} />
        </div>
        
        {/* Download Board*/}
        <div onClick={() => downloadBoard()} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Download">
        <Download size={32} />
        </div>

        {/* Save Whiteboard*/}
        <div onClick={() => saveWhiteBoard(true)} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Save">
        <FloppyDisk size={32} />
        </div>

        {/* Clear the canvas */}
        <div onClick={() => setClearModal(true)} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Clear All">
        <Trash size={32} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="items-center bg-white p-2 rounded-md shadow-lg">
        <div onClick={() => setToolbarVisible(!toolbarVisible)} 
        className={`cursor-pointer p-2 rounded-md h-10 w-10 flex justify-center items-center hover:bg-slate-100`}
        title="Show Toolbar">
        <CaretDown size={32} />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;