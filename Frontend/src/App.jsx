import React, {useRef, useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Whiteboard from "./pages/Whiteboard";
import ClearModal from "./components/ClearModal";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import {fabric} from "fabric";
import {auth} from "./firebase/init";
import {signOutUser} from "./firebase/auth";

const App = () => {
  // User Auth
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      console.log("User state changed:", newUser);
      setUser(newUser);
    });
    // delete subscription
    return () => unsubscribe();
  }, []);

  // Canvas and related states
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [clearModal, setClearModal] = useState(false);
  const defaultBackgroundColor = "#e5e7eb";
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);

  // Handle tool changes
  useEffect(() => {
    if (tool === "cursor") {
      setPenColor(penColor === defaultBackgroundColor ? "#000000" : penColor);
      setDrawingMode(false);
    } else if (tool === "pencil" || tool === "eraser") {
      setPenColor(tool === "eraser" ? defaultBackgroundColor : penColor);
      setDrawingMode(true);
    }
  }, [tool, penColor, defaultBackgroundColor]);

  // Canvas functions
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
      downloadLink.href = pngData;
      downloadLink.download = `whiteBoard-session-${Math.random()
        .toString()
        .replace(".", "")}.png`;
      downloadLink.click();
    }
  };

  const addText = () => {
    if (fabricCanvas) {
      const text = new fabric.IText("Text", {
        left: 100,
        top: 200,
        fill: penColor === defaultBackgroundColor ? "#000000" : penColor,
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
    <Router>
      <div>
        <Navbar user={user} logout={signOutUser} setUser={setUser} />
        <Routes>
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/whiteboard"
            element={
              user ? (
                <Whiteboard
                  downloadBoard={downloadBoard}
                  canvasRef={canvasRef}
                  setFabricCanvas={setFabricCanvas}
                  fabricCanvas={fabricCanvas}
                  drawingMode={drawingMode}
                  tool={tool}
                  setTool={setTool}
                  changePenWidth={changePenWidth}
                  penWidth={penWidth}
                  changePenColor={changePenColor}
                  penColor={penColor}
                  addText={addText}
                  setClearModal={setClearModal}
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>{" "}
        <ClearModal
          clearModal={clearModal}
          setClearModal={setClearModal}
          clearCanvas={clearCanvas}
        />{" "}
      </div>{" "}
    </Router>
  );
};

export default App;
