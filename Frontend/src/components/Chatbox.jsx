import React, {useState} from "react";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";

const Chatbox2 = ({messages, onSendMessage}) => {
  const [input, setInput] = useState("");

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (input.trim() === "") return; // Don't send empty messages
    onSendMessage(input); // Call the passed function to send the message to App
    setInput(""); // Clear the input field after sending
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Display Messages */}
          <div className="space-y-2">
            {messages.map((message, index) => {
              const sender = message.sender.toLowerCase();

              const displayName = sender === "user" ? "You" : "AI";

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
    </>
  );
};

export default Chatbox2;
