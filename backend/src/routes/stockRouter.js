import express from 'express';
import stockController from '../controllers/stockController.js';
const stockRouter = express.Router();

//Set up routes that link to the stockController methods to GET current prices and POST to add a new stock to the watchlist.

//Route to get the current stock prices
stockRouter.get('/',
  stockController.getCurrentStockPrices,
  (req, res) => {
  res.status(200).send(res.locals.stockPrices);
  }
);

// Route to add a stock to the watchlist
stockRouter.post(
  '/', 
  stockController.addStockToWatchlist,
  (req, res) => {
  res.status(200).send(res.locals.addedStock);
  }
);

export default stockRouter;
