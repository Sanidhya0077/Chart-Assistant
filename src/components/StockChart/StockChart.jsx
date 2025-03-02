import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./StockChart.css";

const stockMapping = {
  AAPL: ["AAPL", "APPLE"],
  TSLA: ["TSLA", "TESLA"],
  GOOGL: ["GOOGLE", "GOOGL"],
  MSFT: ["MSFT", "MICROSOFT"],
};
const stockData = {
  AAPL: [140, 152, 192, 155, 158, 160, 162],
  TSLA: [700, 710, 605, 720, 725, 730, 740],
  GOOGL: [2800, 2320, 2795, 2850, 2880, 2900, 2925],
  MSFT: [300, 305, 310, 350, 318, 320, 325],
};

export default function StockChart({ stock }) {
  if (!stock || !stockData[stock]) {
    return (
      <p className="no-stock-message">Enter a stock query to see the chart.</p>
    );
  }

  const data = stockData[stock].map((price, index) => ({
    day: `${index + 1}`,
    price,
  }));

  return (
    <div className="stock-chart-container">
      <ResponsiveContainer width="90%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00c6ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="stock-name">
        <strong>{stock}</strong> Price for 7 Days
      </p>
    </div>
  );
}
