import React, { useEffect } from "react";
import Toolbox from "./Toolbox";
import { fabric } from 'fabric';

const Whiteboard = ({ canvasRef, toggleErase, changePenWidth, penWidth, changePenColor, penColor, setFabricCanvas, fabricCanvas, clearCanvas }) => {

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#e5e7eb',
      width: window.innerWidth,
      height: window.innerHeight,
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
    <div className="relative w-full h-screen rounded-md">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
      <div className="absolute top-4 left-4 bg-white rounded-md z-10 shadow-lg">
        <Toolbox
          changePenWidth={changePenWidth}
          penWidth={penWidth}
          changePenColor={changePenColor}
          penColor={penColor}
          toggleErase={toggleErase}
          clearCanvas={clearCanvas}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
