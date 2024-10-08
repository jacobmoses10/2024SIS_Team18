import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Whiteboard from "./pages/Whiteboard";
import ClearModal from "./components/ClearModal";
import BotModal from "./components/BotModal";
import Chatbox from "./components/Chatbox";
import prompts from "./assets/prompts.json";
import { fabric } from "fabric";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import { auth } from "./firebase/init";
import { signOutUser } from "./firebase/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "fabric-history";


const App = () => {
  // STATE MANAGEMENT:
  // Canvas and related states
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [clearModal, setClearModal] = useState(false);
  const [clipboard, setClipboard] = useState(null);
  const defaultBackgroundColor = "#e5e7eb"
  
  // Toolbox States
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);
  const [sliderVisible, setSliderVisible] = useState(false);

  // Chatbox States
  const [messages, setMessages] = useState([]);
  const [chatVisible, setChatVisible] = useState(false);
  const [prompt, setPrompt] = useState({"topic": "Mathematics", "instruction": prompts.math});
  const [botModal, setBotModal] = useState(false);
  

  // USER AUTHENTICATION:
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      console.log("User state changed:", newUser);
      setUser(newUser);
    });
    return () => unsubscribe(); // delete subscription
  }, []);
  

  // TOOLBOX FUNCTIONS:
  // Selected Tool
  useEffect(() => {
    if (tool === "cursor") {
      setPenColor(penColor === defaultBackgroundColor ? "#000000" : penColor);
      setDrawingMode(false);
    } else if (tool === "pencil") {
      setPenColor(penColor === defaultBackgroundColor ? "#000000" : penColor);
      setDrawingMode(true);
    } else if (tool === "eraser") {
      setPenColor(defaultBackgroundColor);
      setDrawingMode(true);
    }
  }, [tool, penColor, defaultBackgroundColor]);

  // Canvas functions
  const changePenWidth = (width) => {
    if (fabricCanvas) {
      const parsedWidth = parseInt(width, 10);

      // Change stroke width of selected shapes.
      if (fabricCanvas.getActiveObjects()) {
        fabricCanvas.getActiveObjects().forEach((object) => {
          if (!(object.type === "i-text")) {
            object.set("strokeWidth", parsedWidth);
          }
        });
      }

      fabricCanvas.freeDrawingBrush.width = parsedWidth;
      setPenWidth(parsedWidth);
      fabricCanvas.renderAll();
    }
  };

  const changePenColor = (color) => {
    if (fabricCanvas) {
      // Change object colour if selected.
      if (fabricCanvas.getActiveObjects()) {
        fabricCanvas.getActiveObjects().forEach((object) => {
          if (object.type === "i-text") {
            object.set("fill", color);
          } else {
            object.set("stroke", color);
          }
        });
      }
      fabricCanvas.freeDrawingBrush.color = color;
      setPenColor(color);
      fabricCanvas.renderAll();
    }
  };

  // Change object fill colour.
  const changeFillColor = () => {
    if (fabricCanvas.getActiveObjects()) {
      fabricCanvas.getActiveObjects().forEach((object) => {
        object.set("fill", penColor);
      });
      fabricCanvas.renderAll();
    }
  };

  // Download png screenshot of whiteboard.
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

  // Add text to canvas.
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

  // Add square, circle or triangle objects.
  const addShape = (shape) => {
    if (fabricCanvas) {
      if (shape === "square") {
        const rect = new fabric.Rect({
          left: 100,
          top: 200,
          width: 200,
          height: 200,
          fill: null,
          stroke: penColor,
          strokeWidth: penWidth,
        });
        fabricCanvas.add(rect);
      }
      if (shape === "circle") {
        const circle = new fabric.Circle({
          left: 100,
          top: 200,
          radius: 100,
          fill: null,
          stroke: penColor,
          strokeWidth: penWidth,
        });
        fabricCanvas.add(circle);
      }
      if (shape === "triangle") {
        const triangle = new fabric.Triangle({
          top: 200,
          left: 100,
          width: 200,
          height: 180,
          fill: null,
          stroke: penColor,
          strokeWidth: penWidth,
        });
        fabricCanvas.add(triangle);
      }
    }
  };

  // Remove all objects from canvas.
  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = defaultBackgroundColor;
      fabricCanvas.renderAll();
    }
  };

  // Copy Object to Clipboard.
  const copy = () => {
    if (fabricCanvas.getActiveObject()) {
      fabricCanvas.getActiveObject().clone(function (cloned) {
        setClipboard(cloned);
      });
    }
  };

  // Paste Object from Clipboard.
  const paste = () => {
    if (clipboard) {
      clipboard.clone(function (clonedObj) {
        fabricCanvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });

        // Paste multiple objects.
        if (clonedObj.type === "activeSelection") {
          clonedObj.canvas = fabricCanvas;
          clonedObj.forEachObject(function (obj) {
            fabricCanvas.add(obj);
          });
          clonedObj.setCoords();
        } else {
          fabricCanvas.add(clonedObj);
        }

        // Move next paste coords
        var current = clipboard;
        current.top += 10;
        current.left += 10;
        setClipboard(current);

        fabricCanvas.setActiveObject(clonedObj);
        fabricCanvas.requestRenderAll();
      });
    }
  };

  // Handle Undo/Redo with fabric-history.
  const undo = () => fabricCanvas.undo();
  const redo = () => fabricCanvas.redo();


  // AI CHATBOT FUNCTIONS:
  // Function to handle AI response
  const handleAIResponse = async (input) => {
    const message = input || "give me a hint to solve this";
    const base64Image = fabricCanvas.toDataURL("image/png").split(",")[1];
    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;
    const requestBody = {
      contents: [
        {
          role: "model",
          parts: [
            {
              text: prompt.instruction,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: message,
            },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(requestBody);

      // AI response
      const aiResponse = await result.response.text();

      // Add the AI message to chatbox
      const botMessage = { text: aiResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      if (!chatVisible) toast.success(aiResponse); // This the notifications of the AI
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  // Changes AI model based on user selection.
  const handleAISelection = (topic) => {
    if (topic === "Mathematics") setPrompt({"topic": topic, "instruction": prompts.math});
    if (topic === "Physics") setPrompt({"topic": topic, "instruction": prompts.physics});
    if (topic === "Chemistry") setPrompt({"topic": topic, "instruction": prompts.chemistry});
    if (topic === "Coding") setPrompt({"topic": topic, "instruction": prompts.coding});
    if (!chatVisible) toast.success(`AI model changed to ${topic}`);
  }

  // Function to handle user message submission
  const handleSendMessage = (userInput) => {
    const newUserMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    handleAIResponse(userInput);
  };

  // Function to toggle chat visibility
  const toggleChatVisibility = () => {
    setChatVisible((prevVisible) => !prevVisible);
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
                <div>
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
                    changeFillColor={changeFillColor}
                    penColor={penColor}
                    addText={addText}
                    addShape={addShape}
                    copy={copy}
                    paste={paste}
                    undo={undo}
                    redo={redo}
                    setClearModal={setClearModal}
                    setBotModal={setBotModal}
                    sliderVisible={sliderVisible}
                    setSliderVisible={setSliderVisible}
                  />
                    <div className="fixed bottom-0 right-0" >
                      <Chatbox
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        topic={prompt.topic}
                        setBotModal={setBotModal}
                        chatVisible={chatVisible}
                        toggleChatVisibility={toggleChatVisibility}
                      />
                    </div>
                </div>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
        <ClearModal className="bg-black"
          clearModal={clearModal}
          setClearModal={setClearModal}
          clearCanvas={clearCanvas}
        />
        <BotModal className="bg-black"
          botModal={botModal}
          setBotModal={setBotModal}
          handleAISelection={handleAISelection}
          topic={prompt.topic}
        />
      </div>
    </Router>
  );
};
export default App;
