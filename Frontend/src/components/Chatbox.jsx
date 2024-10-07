import React, { useState } from 'react';
import './Chatbox.css';  // Optional: Add a CSS file for custom styles

const Chatbox = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (input.trim() === '') return;  // Don't send empty messages
    onSendMessage(input);  // Call the passed function to send the message to App
    setInput('');  // Clear the input field after sending
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area for typing and sending messages */}
      <div className="input-area">
        <input
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}  // Update input value on change
          placeholder="Type a message..."
        />
        <button className="chatbox-send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
