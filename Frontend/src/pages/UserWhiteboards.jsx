import React from "react";

const UserWhiteboards = () => {
  return (
    <>
      <div>
        <h1>Whiteboards</h1>
      </div>
        <WhiteboardCard></WhiteboardCard>
        <WhiteboardCard></WhiteboardCard>
      <div></div>
    </>
  );
};

export default UserWhiteboards;

export function WhiteboardCard() {
  return (
    <div className="w-[300px] h-[200px] border rounded-lg  p-4 m-4 border-gray-300 hover:shadow-xl  hover:cursor-pointer">
      <div className="justify-center flex flex-col">
        {/* whiteboard Image Preview  */}
        <div className="w-[200px] h-[140px] rounded-lg bg-orange-200 "></div>
        <div className="py-1">
        {/* Name of whiteboard file */}
          <h1 className="text-xl font-bold">Saved File #0</h1>
        </div>
      </div>
    </div>
  );
}
