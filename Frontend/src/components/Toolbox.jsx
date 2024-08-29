import React, { useState } from "react";
import {
  PaintBrushIcon,
  PencilIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

// Icons Component
export function Icons({ IconComponent }) {
  return (
    <div className="h-10 w-10 hover:bg-gray-100 rounded-md p-2 cursor-pointer">
      <IconComponent className="w-6 h-6" />
    </div>
  );
}

// Toolbox Component
const Toolbox = () => {
  return (
    <div className="flex bg-white p-2 items-center justify-between space-x-4 rounded-md w-[300px] shadow-lg">
      {/* Pass Icon Components as props */}
      <Icons IconComponent={PaintBrushIcon} />
      <Icons IconComponent={PencilIcon} />
      <Icons IconComponent={ServerIcon} />

      <div className="w-full">
        <input
          type="range"
          min="0"
          max="100"
          className="w-[100px]"
        />
      </div>
    </div>
  );
};

export default Toolbox;
