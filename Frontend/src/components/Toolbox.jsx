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
} from "@heroicons/react/24/solid";

const Toolbox = ({ 
  tool, 
  setTool, 
  changePenWidth, 
  penWidth, 
  changePenColor, 
  penColor, 
  addText, 
  setClearModal, 
  undo, 
  redo 
}) => {

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-2 space-x-4 rounded-md w-[600px] shadow-lg">
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

        {/* Add Text Element to Canvas */}
        <div onClick={() => addText()} className="cursor-pointer">
          <Icons IconComponent={PlusIcon} />
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

        {/* Undo last canvas change */}
        <div onClick={undo} className="cursor-pointer">
          <Icons IconComponent={ArrowUturnLeftIcon} />
        </div>

        {/* Redo last canvas change */}
        <div onClick={redo} className="cursor-pointer">
          <Icons IconComponent={ArrowUturnRightIcon} />
        </div>

        {/* Clear the Canvas */}
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
