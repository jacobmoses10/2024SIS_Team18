import React, { useEffect } from "react";
import Toolbox from "../components/Toolbox";
import { fabric } from "fabric";

const Whiteboard = ({ 
  canvasRef, 
  drawingMode, 
  tool, 
  setTool,  
  changePenWidth, 
  penWidth, 
  changePenColor, 
  changeFillColor,
  penColor, 
  setFabricCanvas, 
  fabricCanvas, 
  addText,
  addShape,
  copy,
  paste, 
  undo,
  redo,
  setClearModal,
  downloadBoard,
  toggleChatVisibility,
  handleAISelection
}) => {
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#e5e7eb",
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
  }, [penWidth, penColor, fabricCanvas, tool]);

  // Change drawing mode based on selected tool.
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = drawingMode;
    }
  }, [drawingMode, fabricCanvas]);

  // Handle all keyboard shortcuts.
  const handleKeyDown = (e) => {
    // Backspace key = delete or Delete Key = delete
    if (e.key === "Backspace" || e.key === "Delete") {
      fabricCanvas.getActiveObjects().forEach((object) => {
        fabricCanvas.remove(object);
      });
      fabricCanvas.discardActiveObject();
    }
    // Ctrl + Z = Undo
    if (e.ctrlKey && e.key === "z") undo();
    // Ctrl + Y = Redo
    if (e.ctrlKey && e.key === "y") redo();
    // Ctrl + C = Copy
    if (e.ctrlKey && e.key === "c") copy();
    // Ctrl + V = Paste
    if (e.ctrlKey && e.key === "v") paste();
  }

  return (
    <div
      className="relative w-full h-screen rounded-md"
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={0}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
           
      <div className="absolute top-4 left-4 bg-white rounded-md z-10 shadow-lg">
        <Toolbox
          downloadBoard={downloadBoard}
          tool={tool}
          setTool={setTool}
          changePenWidth={changePenWidth}
          penWidth={penWidth}
          changePenColor={changePenColor}
          changeFillColor={changeFillColor}
          penColor={penColor}
          addText={addText}
          addShape={addShape}
          setClearModal={setClearModal}
          undo={undo}
          redo={redo}
          toggleChatVisibility={toggleChatVisibility}
          handleAISelection={handleAISelection}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
