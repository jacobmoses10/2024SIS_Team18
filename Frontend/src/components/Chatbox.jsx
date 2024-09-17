import React, { useState } from 'react';
import './Chatbox.css';  // Optional: Add a CSS file for custom styles

const Chatbox = () => {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');

  // const handleSendMessage = () => {
  //   if (input.trim() === '') return;

  //   // Add user's message
  //   const newMessage = { text: input, sender: 'user' };
  //   setMessages([...messages, newMessage]);

  //   // Clear input field
  //   setInput('');

  //   // Simulate bot response after a delay
  //   setTimeout(() => {
  //     const botMessage = { text: "This is a bot response!", sender: 'bot' };
  //     setMessages((prevMessages) => [...prevMessages, botMessage]);
  //   }, 1000);

  //BENS SECTION STARTS HERE
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to send message to backend and get AI response
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user's message to the chat
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Clear the input field
    setInput('');

    // Send user input to the backend to get the AI response
    try {
      const response = await fetch('http://localhost:5000/ai', {  // Adjust the API endpoint if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();

      // Add the AI response to the chat
      const aiMessage = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = { text: 'Error: Could not get a response.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };
//BENS SECTION ENDS HERE
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
