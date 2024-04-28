import { WebSocketServer } from 'ws';
import { getStockPrices} from './controllers/stockPriceStreamer.js'
const wss = new WebSocketServer({ port:8080 }); //websocket server located at ws://localhost:8080

wss.on('connection', ws => {
  console.log('Client connected to websocket server!');

  ws.on('message', message => { //when the server receives a message from the client
    console.log(`Received message => ${message}`);
  });

  ws.send('Hello! Message from server!'); //send a message to the client when they connect

  const sendStockUpdates = async () => {
      const stockData = await getStockPrices(); //fetch the latest stock data
      ws.send(JSON.stringify({ stockData }));
  };

  const interval = setInterval(sendStockUpdates, 1000); //send stock updates every second

  ws.on('close', () => {
      clearInterval(interval); //stop sending stock updates by clearing the interval
      console.log('Client disconnected from websocket server!');
  });

});
