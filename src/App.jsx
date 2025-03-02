import { useState } from "react";
import ChatInterface from "./components/ChatInterface/ChatInterface";
import StockChart from "./components/StockChart/StockChart";
import "./App.css";

export default function App() {
  const [selectedStock, setSelectedStock] = useState("");
  const [messages, setMessages] = useState([]); // Store chat history

  // Map common stock names to their symbols
  const stockMapping = {
    AAPL: ["AAPL", "APPLE"],
    TSLA: ["TSLA", "TESLA"],
    GOOGL: ["GOOGL", "GOOGLE", "ALPHABET"],
    MSFT: ["MSFT", "MICROSOFT"],
    AMZN: ["AMZN", "AMAZON"],
  };

  const handleQuery = (query) => {
    setMessages((prev) => [...prev, { text: query, sender: "User" }]);

    // Create a single RegEx pattern to match stock names and symbols
    const allNames = Object.values(stockMapping).flat().join("|");
    const stockPattern = new RegExp(`\\b(${allNames})\\b`, "i");

    const stockMatch = query.match(stockPattern);

    if (stockMatch) {
      const matchedName = stockMatch[0].toUpperCase();

      // Find the actual stock symbol from the mapping
      const stockSymbol = Object.keys(stockMapping).find((symbol) =>
        stockMapping[symbol].includes(matchedName)
      );

      setSelectedStock(stockSymbol);
      setMessages((prev) => [
        ...prev,
        {
          text: `Showing chart for ${stockSymbol}`,
          sender: "System",
          stock: stockSymbol,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Invalid stock symbol. Try: " +
            Object.keys(stockMapping).join(", "),
          sender: "System",
        },
      ]);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <ChatInterface
          messages={messages}
          onQuery={handleQuery}
          setSelectedStock={setSelectedStock}
        />
      </div>
      <div className="right-panel">
        <StockChart stock={selectedStock} />
      </div>
    </div>
  );
}
