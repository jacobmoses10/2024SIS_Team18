import React, { useRef, useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Whiteboard from './components/Whiteboard';
// import { fabric } from 'fabric';

const App = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const defaultBackgroundColor = "#e5e7eb"

  //toolbox states
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("black");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);

  // Selected tool
  useEffect(() => {
    if (tool === "cursor") {
      setDrawingMode(false);
    } else if (tool === "pencil") {
      setDrawingMode(true);
      setPenColor("black");
    } else if (tool === "eraser") {
      setDrawingMode(true);
      setPenColor(defaultBackgroundColor);
    }
  }, [tool]);

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
        
        clearCanvas={clearCanvas} 
      />
    </div>
  );
};

export default App;
