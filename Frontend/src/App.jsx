import React, { useRef, useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Whiteboard from './components/Whiteboard';
import ClearModal from "./components/ClearModal";
import { fabric } from 'fabric';

const App = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [clearModal, setClearModal] = useState(false);
  const defaultBackgroundColor = "#e5e7eb"

  //toolbox states
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);

  // Selected tool
  useEffect(() => {
    if (tool === "cursor") {
      if (penColor === defaultBackgroundColor) {
        setPenColor("#000000");
      }
      setDrawingMode(false);
    }
    if (tool === "pencil") {
      if (penColor === defaultBackgroundColor) {
        setPenColor("#000000");
      }
      setDrawingMode(true);
    }
    if (tool === "eraser") {
      setPenColor(defaultBackgroundColor);
      setDrawingMode(true);
    }
  }, [tool, penColor]);

  const changePenWidth = (width) => {
    if (fabricCanvas) {
      const parsedWidth = parseInt(width, 10);
      fabricCanvas.freeDrawingBrush.width = parsedWidth;
      setPenWidth(parsedWidth);
      fabricCanvas.renderAll();
    }
  };

  const changePenColor = (color) => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = color;
      setPenColor(color);
      fabricCanvas.renderAll();
    }
  };

  const downloadBoard = () => {
    if (fabricCanvas) {
      const pngData = fabricCanvas.toDataURL("png");
      const downloadLink = document.createElement("a");
      const fileName = `whiteBoard-session-${Math.random().toString().replace(".", "")}.png`;

      downloadLink.href = pngData;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  const addText = () => {
    if (fabricCanvas) {
      const text = new fabric.IText("Text", {
        left: 100,
        top: 200,
        fill: penColor === defaultBackgroundColor ? "#000000" : penColor
      });
      fabricCanvas.add(text);
      setTool("cursor");
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = defaultBackgroundColor; 
      fabricCanvas.renderAll();
    }
  };

  return (
    <div>
      <Navbar downloadBoard={downloadBoard} />
      <ClearModal clearModal={clearModal} setClearModal={setClearModal} clearCanvas={clearCanvas}/>
      <Whiteboard
        // for canvas
        canvasRef={canvasRef}
        setFabricCanvas={setFabricCanvas}
        fabricCanvas={fabricCanvas}

        drawingMode={drawingMode}
        
        // for toolbox passing through whiteboard
        tool={tool}
        setTool={setTool}

        changePenWidth={changePenWidth}
        penWidth={penWidth}

        changePenColor={changePenColor}
        penColor={penColor}

        addText={addText}
        
        setClearModal={setClearModal} 
      />
    </div>
  );
};

export default App;
