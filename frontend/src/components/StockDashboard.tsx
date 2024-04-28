import React, { useState, useEffect } from 'react'

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [stocksWs, setStocksWs] = useState([]);
  const [newStock, setNewStock] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/api/stocks')
      .then(res => res.json())
      .then(data => {
        // console.log('fetched stock data:', data)
        setStocks(data)
      })
      .catch(error=>console.error('Error fetching data:', error))


    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.stockData) {
        // console.log('WS Stock data:',data.stockData)
        setStocksWs(data.stockData);
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

  }, [])

  const allStocks = stocks.map((stock: { stock_symbol: string }, index: number) => {
    const matchingWsStock = stocksWs.find((ws: { symbol: string }) => ws.symbol === stock.stock_symbol);
    return (
      <h4 key={index}>
        {stock.stock_symbol} : {matchingWsStock ? matchingWsStock.price : 'No live data available'}
      </h4>
    )
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setNewStock(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check newStock is not an empty
    if (!newStock.length) {
      console.error("Stock symbol is required");
      return;
    }
    
    fetch('http://localhost:3000/api/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stock_symbol: newStock })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Successfully posted new stock:', data);
      setStocks(prevStocks => [...prevStocks, data]);
      setNewStock('');
    })
    .catch(error => {
      console.error('Error posting stock:', error);
    });
  };
  
  
  return (
    <>
      <h1>Stock Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        value={newStock}
        onChange={handleInputChange}
        placeholder='Enter stock symbol'
        />
        <button>Add Stock</button>
      </form>
      {allStocks}
    </>

  )
}

export default StockDashboard