import React, { useEffect } from "react";
import Toolbox from "./Toolbox";
import { fabric } from 'fabric';

const Whiteboard = ({ canvasRef, toggleErase, changePenWidth, penWidth, changePenColor, penColor, setFabricCanvas, fabricCanvas, clearCanvas }) => {

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#e5e7eb',
      width: 1920,
      height: 1080,
      isDrawingMode: true,
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasRef, setFabricCanvas]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = penWidth;
      fabricCanvas.freeDrawingBrush.color = penColor;
    }
  }, [penWidth, penColor, fabricCanvas]);

  return (
    <div className="w-full h-screen bg-gray-200 rounded-md">
      <div className="p-4">
        <Toolbox
          changePenWidth={changePenWidth}
          penWidth={penWidth}
          changePenColor={changePenColor}
          penColor={penColor}
          toggleErase={toggleErase} 
          clearCanvas={clearCanvas}
        />
      </div>
      <canvas ref={canvasRef} className=""></canvas>
    </div>
  );
};

export default Whiteboard;
