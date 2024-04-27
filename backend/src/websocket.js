import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port:8080 }); //websocket server located at ws://localhost:8080

wss.on('connection', ws => { //when a client connects to the server then run the following code
  ws.on('message', message => { //when the server receives a message from the client
    console.log(`Received message => ${message}`); //log the message to the console 
  });

  ws.send('Hello! Message from server!'); //send a message to the client when they connect
});



//     wss.on('connection', ws => {
//         console.log('Client connected');

//         const sendStockUpdates = () => {
//             ws.send(JSON.stringify({ /* latest stock data */ }));
//         };

//         const interval = setInterval(sendStockUpdates, 1000);

//         ws.on('close', () => {
//             clearInterval(interval);
//             console.log('Client disconnected');
//         });
//     });
// }
