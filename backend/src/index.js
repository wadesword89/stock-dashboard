import express from 'express';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
console.log('In the server...')

app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express server caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});