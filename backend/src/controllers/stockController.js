import db from '../model/model.js';

//Handle the logic for fetching current stock prices and adding stocks to the watchlist.

const stockController = {};
  
//Method to get the current stock prices
stockController.getCurrentStockPrices = async (req, res, next) => {
  try {
    //Query the database to get the current stock prices
    const queryStr = 'SELECT * FROM watchlist';
    const data = await db.query(queryStr);
    // console.log(data.rows)
    res.locals.stockPrices = data.rows;
    return next();
  }
  catch (err) {
    return next({
      log: 'stockController.getCurrentStockPrices: ERROR: Error getting stock prices from the database',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

//Method to add a stock to the watchlist
stockController.addStockToWatchlist = async (req, res, next) => {
  const { stock_symbol, stock_name } = req.body;

  try {
    //Query the database to insert the new stock into the watchlist
    const queryStr = 'INSERT INTO watchlist (stock_symbol, stock_name) VALUES ($1, $2)';
    const values = [stock_symbol, stock_name];
    const data = await db.query(queryStr, values);
    // console.log(data);
    res.locals.addedStock = `${stock_symbol} added to watchlist`;
    return next();
  }
  catch (err) {
    return next({
      log: 'stockController.addStockToWatchlist: ERROR: Error adding stock to the watchlist',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
}

export default stockController;