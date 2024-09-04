import React, { useState } from 'react';
import './Chatbox.css';  // Optional: Add a CSS file for custom styles

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user's message
    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Clear input field
    setInput('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = { text: "This is a bot response!", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
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
      <div className="input-area">
        <input
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
