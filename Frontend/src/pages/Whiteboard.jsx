import React, { useEffect } from "react";
import Toolbox from "../components/Toolbox";
import { fabric } from "fabric";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";

const Whiteboard = ({
  canvasRef,
  user,
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
  setBotModal,
  downloadBoard,
  sliderVisible,
  setSliderVisible,
  saveWhiteBoard,
}) => {
  const { whiteboardId } = useParams();

  // Initialize the fabric canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
      width: 1600,
      height: 800,
      isDrawingMode: true,
    });
    setFabricCanvas(canvas);
    
    // Handle palm rejection using PointerEvent
    const handlePointerDown = (event) => {
      if (event.pointerType === 'pen') {
        // Enable drawing for pen input
        canvas.isDrawingMode = true;
      } else if (event.pointerType === 'touch') {
        // Disable drawing for touch input (palm rejection)
        canvas.isDrawingMode = false;
      }
    };

    // Add event listener to the canvas DOM element
    canvasRef.current.addEventListener("pointerdown", handlePointerDown);

    return () => {
      canvas.dispose();
      // Cleanup event listener
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [canvasRef, setFabricCanvas]);

  // Load whiteboard if whiteboardId exists
  useEffect(() => {
    if (fabricCanvas && user && whiteboardId) {
      const loadWhiteboard = async () => {
        try {
          const whiteboardRef = doc(db, "users", user.uid, "whiteboards", whiteboardId);
          const whiteboardSnap = await getDoc(whiteboardRef);

          if (whiteboardSnap.exists()) {
            const whiteboardData = whiteboardSnap.data();
            console.log("Whiteboard data fetched:", whiteboardData); // Log the fetched data

            // Ensure the whiteboard has valid JSON data
            if (whiteboardData.json) {
              console.log("Loading JSON into fabric canvas:", whiteboardData.json);
              
              // Log if the loadFromJSON is called
              fabricCanvas.loadFromJSON(whiteboardData.json, () => {
                console.log("Canvas loaded successfully"); // Log on successful load
                fabricCanvas.renderAll();
              });
            } else {
              console.error("No valid JSON data found in the whiteboard.");
            }
          } else {
            console.error("No such whiteboard exists!");
          }
        } catch (error) {
          console.error("Error loading whiteboard:", error);
        }
      };

      loadWhiteboard();
    }
  }, [fabricCanvas, user, whiteboardId]);

  // Set the drawing tool settings based on user selection
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = penWidth;
      fabricCanvas.freeDrawingBrush.color = penColor;
    }
  }, [penWidth, penColor, fabricCanvas]);

  // Update drawing mode based on selected tool.
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.isDrawingMode = drawingMode;
    }
  }, [drawingMode, fabricCanvas]);

  // Handle keyboard shortcuts for actions like undo/redo/copy/paste
  const handleKeyDown = (e) => {
    // Backspace or Delete Key = delete
    if (e.key === "Backspace" || e.key === "Delete") {
      fabricCanvas.getActiveObjects().forEach((object) => {
        fabricCanvas.remove(object);
      });
      fabricCanvas.discardActiveObject();
    }
    if (e.ctrlKey && e.key === "z") undo();
    if (e.ctrlKey && e.key === "y") redo();
    if (e.ctrlKey && e.key === "c") copy();
    if (e.ctrlKey && e.key === "v") paste();
  };

  return (
    <div
      className="flex justify-center bg-slate-200 h-screen w-screen"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="fixed shadow-lg m-5" />

      <div className="fixed top-20 left-4 bg-fixed rounded-md z-10 shadow-lg">
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
          setBotModal={setBotModal}
          undo={undo}
          redo={redo}
          sliderVisible={sliderVisible}
          setSliderVisible={setSliderVisible}
          saveWhiteBoard={saveWhiteBoard}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
