import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
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
import UserCanvases from "./pages/UserWhiteboards";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/init";
import PrivacyPolicy from "./pages/Privacy";

const App = () => {
  // STATE MANAGEMENT:
  // Canvas and related states
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [clearModal, setClearModal] = useState(false);
  const [clipboard, setClipboard] = useState(null);
  const [transformDisabled, setTransformDisabled] = useState(false);
  const defaultBackgroundColor = "white";

  // Toolbox States
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("cursor");
  const [drawingMode, setDrawingMode] = useState(true);
  const [sliderVisible, setSliderVisible] = useState(false);

  // Chatbox States
  const [messages, setMessages] = useState([]);
  const [chatVisible, setChatVisible] = useState(false);
  const [prompt, setPrompt] = useState({
    topic: "Mathematics",
    instruction: prompts.math,
  });
  const [botModal, setBotModal] = useState(false);
  const [chatSession, setChatSession] = useState(null);

  // USER AUTHENTICATION:
  const [user, setUser] = useState(null);

  // CURRENT USER'S WHITEBOARD ID
  const {whiteboardId} = useParams();

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
      setTransformDisabled(false);
    } else if (tool === "pencil") {
      setPenColor(penColor === defaultBackgroundColor ? "#000000" : penColor);
      setDrawingMode(true);
      setTransformDisabled(true);
    } else if (tool === "eraser") {
      setPenColor(defaultBackgroundColor);
      setDrawingMode(true);
      setTransformDisabled(true);
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

  // Function to save the canvas
  const saveWhiteBoard = async () => {
    if (fabricCanvas && user) {
      try {
        // Get the JSON data from the canvas
        let canvasJson = fabricCanvas.toJSON();
  
        // Convert nested arrays in 'path' to strings
        canvasJson.objects = canvasJson.objects.map((object) => {
          if (object.type === "path" && Array.isArray(object.path)) {
            object.path = JSON.stringify(object.path); // Convert path array to string
          }
          return object;
        });
  
        // Get the image data (in base64 format)
        const canvasImage = fabricCanvas.toDataURL("image/png");
  
        // Reference to user's whiteboards collection in Firestore
        const whiteboardsRef = collection(db, "users", user.uid, "whiteboards");
  
        if (whiteboardId) {
          // If whiteboardId exists, update the existing whiteboard
          const whiteboardDocRef = doc(db, "users", user.uid, "whiteboards", whiteboardId);
          await updateDoc(whiteboardDocRef, {
            json: canvasJson,
            image: canvasImage,
            updatedAt: serverTimestamp(),
          });
        } else {
          // If whiteboardId doesn't exist, create a new whiteboard document
          await addDoc(whiteboardsRef, {
            json: canvasJson,
            image: canvasImage,
            createdAt: serverTimestamp(),
          });
        }
  
        toast.success("Whiteboard saved successfully!");
      } catch (error) {
        console.error("Error saving whiteboard:", error);
        toast.error("Failed to save whiteboard.");
      }
    } else {
      toast.error("No canvas to save or user not logged in.");
    }
  };

  // AI FUNCTIONS:
  // Initiate model on start and reset if prompt changes.
  useEffect(() => {
    if (chatSession === null) {
      const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_KEY;
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: prompt.instruction,
      });
      const session = model.startChat();
      setChatSession(session);
      console.log("New Chat Session Started");
    }
  }, [chatSession, prompt]);
  

  // Function to handle AI requests and responses
  const handleAIResponse = async (userInput) => {
    // Create aiRequest array to send.
    const aiRequest = [];

    // Include the current user input
    if (userInput) {
        aiRequest.push({
            text: userInput, // Push the current user input
        });
    }

    // Add uploaded image
    const base64Image = fabricCanvas.toDataURL("image/png").split(",")[1];
    if (base64Image) {
        aiRequest.push({
            inlineData: {
                mimeType: "image/png",
                data: base64Image,
            },
        });
    }

    try {
        // Send user request to AI model and save result
        console.log("Request Sent: ", aiRequest);
        const result = await chatSession.sendMessage(aiRequest);
        
        // AI response
        const aiResponse = await result.response.text();
        console.log("Response Received: ", result.response);

        // Add the AI message to chatbox
        const botMessage = { text: aiResponse, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Show notification if chat is not visible
        if (!chatVisible) toast.success(aiResponse);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage = { text: "Sorry, Google Gemini is currently unavailable. Please refresh your browser and try again.", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  // Changes AI model based on user selection.
  const handleAISelection = (topic) => {
    if (topic === prompt.topic) return;
    if (topic === "Mathematics") setPrompt({"topic": topic, "instruction": prompts.math});
    if (topic === "Physics") setPrompt({"topic": topic, "instruction": prompts.physics});
    if (topic === "Chemistry") setPrompt({"topic": topic, "instruction": prompts.chemistry});
    if (topic === "Coding") setPrompt({"topic": topic, "instruction": prompts.coding});
    if (topic === "Economics") setPrompt({"topic": topic, "instruction": prompts.economics});
    if (topic === "Music Theory") setPrompt({"topic": topic, "instruction": prompts.music});
    if (topic === "Visual Art") setPrompt({"topic": topic, "instruction": prompts.art});
    if (!chatVisible) toast.success(`AI model changed to ${topic}`);
    setChatSession(null);
    setMessages([]);
  }

  // Function to handle user message submission
  const handleSendMessage = (userInput) => {
    const newUserMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    handleAIResponse(userInput); // Call to process AI response and send the image
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
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/userwhiteboards" element={<UserCanvases />} />
          <Route
            // path="/whiteboard/:whiteboardId?"
            path="/whiteboard/:whiteboardId?"
            element={
              user ? (
                <div className="bg-gray-200">
                  <Whiteboard
                    // Pass the necessary props here
                    canvasRef={canvasRef}
                    user={user}
                    drawingMode={drawingMode}
                    transformDisabled={transformDisabled}
                    setTransformDisabled={setTransformDisabled}
                    tool={tool}
                    setTool={setTool}
                    changePenWidth={changePenWidth}
                    penWidth={penWidth}
                    changePenColor={changePenColor}
                    changeFillColor={changeFillColor}
                    penColor={penColor}
                    setFabricCanvas={setFabricCanvas}
                    fabricCanvas={fabricCanvas}
                    addText={addText}
                    addShape={addShape}
                    copy={copy}
                    paste={paste}
                    undo={undo}
                    redo={redo}
                    setClearModal={setClearModal}
                    setBotModal={setBotModal}
                    downloadBoard={downloadBoard}
                    sliderVisible={sliderVisible}
                    setSliderVisible={setSliderVisible}
                    saveWhiteBoard={saveWhiteBoard} // Pass saveWhiteBoard
                  />
                  <div className="fixed bottom-0 right-0">
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
        <ClearModal
          className="bg-black"
          clearModal={clearModal}
          setClearModal={setClearModal}
          clearCanvas={clearCanvas}
        />
        <BotModal
          className="bg-black"
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
