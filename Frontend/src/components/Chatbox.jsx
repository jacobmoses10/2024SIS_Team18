import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon, ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/outline";
import AiIcon from "../assets/ai_icon.png";

const Chatbox = ({ messages, onSendMessage, topic, chatVisible, toggleChatVisibility, setBotModal }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (input.trim() === "") return; // Don't send empty messages
    onSendMessage(input); // Call the passed function to send the message to App
    setInput(""); // Clear the input field after sending
  };

  const getBadgeStyle = () => {
    if (topic === "Chemistry") return `bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded cursor-pointer`;
    if (topic === "Physics") return `bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded cursor-pointer`;
    if (topic === "Coding") return `bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded cursor-pointer`;
    return `bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded cursor-pointer`;
  }

  // Scroll to the bottom of the chatbox whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return chatVisible ? (
    <div className="p-4">
      <div className="w-min mx-auto bg-slate-100 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-slate-100 text-black h-10 flex items-center px-4 p-6">
          <div className="flex items-center">
            <img className="h-7 w-7" src={AiIcon} alt="" />
            <h1 className="px-2 font-bold">InkWise AI</h1>
            <span className={getBadgeStyle(topic)} onClick={() => setBotModal(true)}>{topic}</span>
            <ChevronDownIcon className="absolute w-6 right-6 cursor-pointer hover:text-slate-500" onClick={toggleChatVisibility}/>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-96 bg-white overflow-y-auto">
          {/* Display Messages */}
          <div className="space-y-2">
            {messages.map((message, index) => {
              const sender = message.sender.toLowerCase();

              const displayName = sender === "user" ? "You" : "InkWise";

              return (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    sender === "ai" ||
                    sender === "bot" ||
                    sender === "assistant"
                      ? "bg-gray-100"
                      : "bg-blue-500 text-white"
                  }`}>
                  <p className="text-sm font-semibold">{displayName}:</p>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input of your Message  */}
        <div className="p-4 border-t flex items-center space-x-2">
          <input
            className="flex-grow bg-slate-100 border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
          />

          <button
            onClick={handleSendMessage}
            className="h-10 w-10 p-2 rounded-full flex items-center justify-center">
            <PaperAirplaneIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div 
      onClick={toggleChatVisibility} 
      className="m-4 flex flex-shrink-0 items-center shadow=lg justify-center rounded-full bg-black h-16 w-16 hover:bg-blue-600 cursor-pointer">
      <SparklesIcon
        aria-hidden="true"
        className="h-10 w-10 text-white"
      />
    </div>
  )
};

export default Chatbox;