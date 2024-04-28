import express from 'express';
import cors from 'cors';

import db from './model/model.js';
import stockRouter from './routes/stockRouter.js';

const port = 3000;
const app = express();

db.checkConnection();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/api/stocks', stockRouter)

//Catch all for unknown routes
app.use('*', (req, res) => res.sendStatus(404));

//Global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express server caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

const server = app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});