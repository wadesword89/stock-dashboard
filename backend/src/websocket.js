import { WebSocketServer } from 'ws';
import { getStockPrices} from './controllers/stockPriceStreamer.js'

const wss = new WebSocketServer({ port:8080 }); //websocket server located at ws://localhost:8080

wss.on('connection', ws => {
  console.log('Client connected to websocket server!');

  ws.on('message', message => { //when the server receives a message from the client
    console.log(`Received message => ${message}`);
  });

  const sendStockUpdates = async () => {
    try {
      const stockData = await getStockPrices(); //fetch the latest stock data
      ws.send(JSON.stringify({ stockData }));
    }
    catch (err) {
      console.error('Failed to fetch or send stock data:', err);
        ws.send(JSON.stringify({ error: 'Failed to fetch stock data' }));
    }
  };

  const interval = setInterval(sendStockUpdates, 3000); //send stock updates every 3 seconds

  ws.on('close', () => {
      clearInterval(interval); //stop sending stock updates by clearing the interval
      console.log('Client disconnected from websocket server!');
  });

});
