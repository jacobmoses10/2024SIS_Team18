import React, { useState } from "react";
import {
  PaintBrushIcon,
  PencilIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

export function Icons({ IconComponent }) {
  return (
    <div className="h-10 w-10 hover:bg-gray-100 rounded-md p-2 cursor-pointer">
      <IconComponent className="w-6 h-6" />
    </div>
  );
}

const Toolbox = () => {
  return (
    <div className="flex bg-white p-2 items-center justify-between space-x-4 rounded-md w-[300px] shadow-lg">
     
    {/* icons  */}
      <Icons IconComponent={PaintBrushIcon} />
      <Icons IconComponent={PencilIcon} />
      <Icons IconComponent={ServerIcon} />

      <div className="w-full">
  <input
    type="range"
    min="0"
    max="100"
    className="w-[100px] appearance-none h-2 bg-gray-200 rounded-lg cursor-pointer"
  />
</div>

    </div>
  );
};

export default Toolbox;
