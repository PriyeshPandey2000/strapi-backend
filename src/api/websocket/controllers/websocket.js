const WebSocket = require('ws');
const PORT = process.env.PORT || 1440;

const wss = new WebSocket.Server( { port: PORT} );

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Echo the received message back to the client
    const stringMessage = message.toString();
    console.log('Received message:', message);
    ws.send(stringMessage);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

module.exports = {
  connect: async (ctx) => {
    ctx.websocket.server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });
  }
};
