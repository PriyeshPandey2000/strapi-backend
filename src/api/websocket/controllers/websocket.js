const WebSocket = require('ws');
let WSServer = WebSocket.Server;
let server = require('http').createServer();
let strapiApp = require('strapi').server(); // Import the Strapi server instance

let wss = new WSServer({
  server: server,
  perMessageDeflate: false
});

server.on('request', strapiApp.callback()); // Mount the Strapi app on the server

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);
    ws.send(message); // Echo the received message back to the client
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(2828, () => {
  console.log('WebSocket server listening on port 2828');
});
