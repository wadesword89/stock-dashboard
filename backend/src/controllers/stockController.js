import db from '../model/model.js';

//Handle the logic for fetching current stocks and adding stocks to the watchlist.

const stockController = {};
  
//Method to get the current stocks
stockController.getCurrentStocks = async (req, res, next) => {
  try {
    //Query the database to get the current stocks in watchlist
    const queryStr = 'SELECT * FROM watchlist';
    const data = await db.query(queryStr);
    res.locals.stocks = data.rows;
    return next();
  }
  catch (err) {
    return next({
      log: 'stockController.getCurrentStocks: ERROR: Error getting stock from the database',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
};

//Method to add a stock to the watchlist
stockController.addStockToWatchlist = async (req, res, next) => {
  const { stock_symbol } = req.body;

  try {
    if (!stock_symbol) { //check if input includes stock symbol and stock name
      return next({
        log: 'stockController.addStockToWatchlist: ERROR: Invalid input',
        status: 400,
        message: { err: 'Invalid input' },
      });
    }
    //Query the database to insert the new stock into the watchlist
    const queryStr = 'INSERT INTO watchlist (stock_symbol) VALUES ($1)';
    const values = [stock_symbol];
    const data = await db.query(queryStr, values);
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