import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chatbot", {
        message: userInput,
      });
      const botMessage = {
        sender: "bot",
        text: response.data.response,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "Error: Unable to get a response from the chatbot.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <h3 className="chatbot-header">Chatbot</h3>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
        />
        <button onClick={sendMessage} className="chatbot-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
