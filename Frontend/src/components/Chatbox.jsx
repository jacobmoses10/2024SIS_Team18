import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AiIcon from "../assets/ai_icon.png";

const Chatbox = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (input.trim() === "") return; // Don't send empty messages
    onSendMessage(input); // Call the passed function to send the message to App
    setInput(""); // Clear the input field after sending
  };

  // Scroll to the bottom of the chatbox whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full bg-white text-black h-10 flex items-center px-4 p-6">
          <div className="flex items-center justify-center">
            <img className="h-7 w-7" src={AiIcon} alt="" />
            <h1 className="px-4 font-bold">InkWise AI</h1>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
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
            className="flex-grow border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a hint..."
          />

          <button
            onClick={handleSendMessage}
            className="h-10 w-10 bg-gray-100 p-2 rounded-full flex items-center justify-center">
            <PaperAirplaneIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;