import express from 'express';
import { stockController } from '../controllers/stockController';
import e from 'express';
const stockRouter = express.Router();

//Define the RESTful API endpoints.
//Set up routes that link to the stockController methods, like GET /stocks for current prices and POST /stocks to add a new stock to the watchlist.

//route to get the current stock prices
stockRouter.get(
  '/stocks',
  stockController.getCurrentStockPrices,
  (req, res) => {
  res.status(200).send('GET stock prices from watchlist');
  }
);

//route to add a stock to the watchlist
stockRouter.post(
  '/stocks', 
  stockController.addStockToWatchlist,
  (req, res) => {
  res.status(200).send('POST stock prices to watchlist');
  }
);

export default stockRouter;
