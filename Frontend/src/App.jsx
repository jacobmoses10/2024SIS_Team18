import React, { useRef, useState } from "react";
import Navbar from './components/Navbar';
import Whiteboard from './components/Whiteboard';
import Chatbox from './components/Chatbox';
import { fabric } from 'fabric';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const defaultBackgroundColor = "#e5e7eb";

  // toolbox states
  const [penWidth, setPenWidth] = useState(1);
  const [penColor, setPenColor] = useState("black");
  const [toggleEraser, setToggleEraser] = useState(false);

  // Chatbox messages state (to manage both user and AI messages)
  const [messages, setMessages] = useState([]);

  // Function to handle user message submission
  const handleSendMessage = (userInput) => {
    const newUserMessage = { text: userInput, sender: "user" };  // Create a new message object
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);  // Add it to the messages array
    handleAIClick(newUserMessage.text);
  };

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

  const toggleErase = () => {
    if (fabricCanvas) {
      if (toggleEraser) {
        changePenColor("black");
        setToggleEraser(false);
      } else {
        changePenColor(defaultBackgroundColor);
        setToggleEraser(true);
      }
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = defaultBackgroundColor;
      fabricCanvas.renderAll();
    }
  };

  // Handle AI click (this simulates the AI response and routes it to the chatbox)
  const handleAIClick = async (message) => {
    const prompt = (!(message === null) ? message : "give me a hint to solve this");
    const systemInstruction = "I want you to be an expert tutor on Maths up to an Australian Year 12 level, and I want you to guide my questions and working. Do not give me the answer unless what I have written is correct, instead assess my working and provide hints and explanations on what I should do instead. If \"Find x\" or a similar question is asked, do not give the answer, instead provide guidance on steps to follow, one by one. If values are provided, make sure they are substituted correctly. You should work like a tutor would guiding students to an answer rather than giving it to them directly. Provide one hint then stop and allow me to try again. Repeat this process until I get the correct answer or I move onto a new question.";
    const base64Image = fabricCanvas.toDataURL("image/png").split(",")[1];

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

  return (
    <div>
      <Navbar downloadBoard={downloadBoard} />
      <Whiteboard
        canvasRef={canvasRef}
        setFabricCanvas={setFabricCanvas}
        fabricCanvas={fabricCanvas}
        changePenWidth={changePenWidth}
        penWidth={penWidth}
        changePenColor={changePenColor}
        penColor={penColor}
        setToggleEraser={setToggleEraser}
        toggleErase={toggleErase}
        clearCanvas={clearCanvas}
        handleAIClick={() => handleAIClick(null)}
      />
      {/* Pass the messages and the sendMessage handler to the Chatbox */}
      <div className="absolute bottom-0 right-0 z-50">
        <Chatbox messages={messages} onSendMessage={handleSendMessage} />
      </div>   
    </div>
  );
};

export default App;
