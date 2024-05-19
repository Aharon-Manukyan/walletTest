// server/middleware/binance-proxy.js
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {

  if (event.node.req.url.startsWith('/api/binance')) {
    const server = createServer();
    const wsServer = new WebSocketServer({ noServer: true });

    wsServer.on('connection', (clientSocket) => {

      const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

      binanceSocket.on('message', (message) => {
        clientSocket.send(message);
      });

      clientSocket.on('message', (message) => {
        binanceSocket.send(message);
      });

      clientSocket.on('close', () => {
        binanceSocket.close();
      });

      binanceSocket.on('close', () => {
        clientSocket.close();
      });
    });

    server.on('upgrade', (request, socket, head) => {
      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
      });
    });

    server.listen(3000);

    return new Promise(() => {}); // Не закрывать соединение
  }
});