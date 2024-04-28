import React, { useState, useEffect } from 'react'

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/stocks')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setStocks(data)
      })
      .catch(error=>console.error('Error fetching data:', error))
  }, [])

  const allStocks = stocks.map((stock, index) => {
    return <div key={index}>{stock.stock_symbol}</div>
  })
  
  return (
    <>
      <h1>Stock Dashboard</h1>
      {allStocks}
    </>

  )
}

export default StockDashboard