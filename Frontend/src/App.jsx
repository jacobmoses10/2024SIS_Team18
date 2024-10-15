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
import Chatbox from "./components/Chatbox";
import { fabric } from "fabric";
import "fabric-history";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import {auth} from "./firebase/init";
import {signOutUser} from "./firebase/auth";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [clipboard, setClipboard] = useState(null);
  const defaultBackgroundColor = "#e5e7eb"

  // Toolbox States
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);

  // Chatbox messages state (to manage both user and AI messages)
  const [messages, setMessages] = useState([]);

  // Selected Tool
  useEffect(() => {
    if (tool === "cursor") {
      setPenColor(penColor === defaultBackgroundColor ? "#000000" : penColor);
      setDrawingMode(false);
    } else if (tool === "pencil" || tool === "eraser") {
      setPenColor(tool === "eraser" ? defaultBackgroundColor : penColor);
      setDrawingMode(true);
    }
  }, [tool, penColor, defaultBackgroundColor]);

  // Function to handle user message submission
  const handleSendMessage = (userInput) => {
    const newUserMessage = { text: userInput, sender: "user" };  // Create a new message object
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);  // Add it to the messages array
    handleAIClick(newUserMessage.text);
  }

  // Canvas functions
  const changePenWidth = (width) => {
    if (fabricCanvas) {
      const parsedWidth = parseInt(width, 10);

      // Change stroke width of selected shapes.
      if (fabricCanvas.getActiveObjects()) {
        fabricCanvas.getActiveObjects().forEach(object => {
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
        fabricCanvas.getActiveObjects().forEach(object => {
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
      fabricCanvas.getActiveObjects().forEach(object => {
          object.set("fill", penColor);
      });
      fabricCanvas.renderAll();
    }       
  }

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
          strokeWidth: penWidth
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
          strokeWidth: penWidth
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
          strokeWidth: penWidth
       })
       fabricCanvas.add(triangle);
      }
    }
  }

  // Remove all objects from canvas.
  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = defaultBackgroundColor;
      fabricCanvas.renderAll();
    }
  };
  
  
  const handleAISelection = async (message) => {}


  // Handle AI click (this simulates the AI response and routes it to the chatbox)
  const handleAIClick = async (message) => {
    //Prompt that is send to Gemini
    const prompt = (!(message === null) ? message : "give me a hint to solve this");
    //Instructions to gemini that is being used to train the AI model to give answers that are relevant to the usecase of the whiteboard
    const systemInstruction = "I want you to be an expert tutor on Maths up to an Australian Year 12 level, and I want you to guide my questions and working. Do not give me the answer unless what I have written is correct, instead assess my working and provide hints and explanations on what I should do instead. If \"Find x\" or a similar question is asked, do not give the answer, instead provide guidance on steps to follow, one by one. If values are provided, make sure they are substituted correctly. You should work like a tutor would guiding students to an answer rather than giving it to them directly. Provide one hint then stop and allow me to try again. Repeat this process until I get the correct answer or I move onto a new question.";
   //Converts the image (which is the whiteboard) to base64 so that it can be passed to gemini through the API
    const base64Image = fabricCanvas.toDataURL("image/png").split(",")[1];
    //Uses REACT .env to pull the API key for gemini, according to my research, this shouldn't be the best place to store secret keys.
    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;
    const requestBody = {
      contents: [
        {
          role: "model",
          parts: [
            {
              text: systemInstruction,
            }
          ]
        },
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Image,
              }
            }
          ]
        }
      ]
    };

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(requestBody);

      // AI response
      const aiResponse = result.response.text();
      
      // Add the AI message to chatbox
      const botMessage = { text: aiResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      toast.success(aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  
        

  // Copy Object to Clipboard.
  const copy = () => {
    fabricCanvas.getActiveObject().clone(function(cloned) {
      setClipboard(cloned);
    });
  }

  // Paste Object from Clipboard.
  const paste = () => {
    clipboard.clone(function(clonedObj) {
      fabricCanvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      // Paste multiple objects.
      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = fabricCanvas;
        clonedObj.forEachObject(function(obj) {
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

  // Handle Undo/Redo with fabric-history.
  const undo = () => fabricCanvas.undo();
  const redo = () => fabricCanvas.redo();

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
                    handleAIClick={() => handleAIClick(null)}
                  />
                  <div className="absolute bottom-0 right-0 z-50">
                    <Chatbox messages={messages} onSendMessage={handleSendMessage} />
                  </div>
                </div>                
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