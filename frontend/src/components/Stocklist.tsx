import React, { useState, useEffect} from 'react'

const Stocklist = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.stockData) {
          setStocks(data.stockData);  // Update the state with the new stock data
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error: ', error);
  };

  ws.onclose = () => {
      console.log('Disconnected from WebSocket');
  };

  return () => {
      ws.close();
  };
}, []);

return (
  <div>
      <h1>Stock Prices</h1>
      <ul>
          {stocks.map((stock, index) => (
              <li key={index}>{stock.symbol}: ${stock.price}</li>
          ))}
      </ul>
  </div>
);
};

export default Stocklist