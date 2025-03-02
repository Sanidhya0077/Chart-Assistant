import { useState } from "react";
import "./ChatInterface.css";

export default function ChatInterface({ messages, onQuery, setSelectedStock }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query);
      setQuery("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat Assistant</h2>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "User" ? "user" : "system"
            } ${msg.stock ? "clickable" : ""}`}
            onClick={() => msg.stock && setSelectedStock(msg.stock)}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask about a stock (e.g., 'Show AAPL prices')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="chat-button">
          ➤
        </button>
      </form>
    </div>
  );
}
