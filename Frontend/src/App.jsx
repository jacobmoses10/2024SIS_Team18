import React, { useRef, useState } from "react";
import Navbar from './components/Navbar';
import Whiteboard from './components/Whiteboard';
import Chatbox from './components/Chatbox';
import { fabric } from 'fabric';

const App = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const defaultBackgroundColor = "#e5e7eb"

  //toolbox states
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("black");
  const [toggleEraser , setToggleEraser] = useState(false)


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

  const toggleErase = () =>{
    if (fabricCanvas) {
      if(toggleEraser){
        changePenColor("black")
        setToggleEraser(false)
      }
      else{
        changePenColor(defaultBackgroundColor)
        setToggleEraser(true)
      }

    }
  }


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
        
        // for toolbox passing through whiteboard
        changePenWidth={changePenWidth}
        penWidth={penWidth}

        changePenColor={changePenColor}
        penColor={penColor}
        
        setToggleEraser={setToggleEraser}
        toggleErase={toggleErase}

        clearCanvas={clearCanvas} 
      />
     <Chatbox />
    </div>
  );
};

export default App;
