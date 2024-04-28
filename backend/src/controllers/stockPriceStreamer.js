// Simulate stock price data fetching
export async function getStockPrices() {
  return [
      { symbol: "AAPL", price: (Math.random() * 100 + 150).toFixed(2) },
      { symbol: "MSFT", price: (Math.random() * 100 + 200).toFixed(2) },
      { symbol: "GOOGL", price: (Math.random() * 100 + 1200).toFixed(2) },
      { symbol: "NVDA", price: (Math.random() * 100 + 2000).toFixed(2) },
  ];
}
