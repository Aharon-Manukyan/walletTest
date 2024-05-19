export default defineNuxtPlugin((nuxtApp) => {
  const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth');

  socket.onopen = () => {
    // console.log('Connected to Binance proxy');
  };

  socket.onmessage = (event) => {
    // console.log('Message from server:', event.data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    // console.log('Disconnected from Binance proxy');
  };

  nuxtApp.provide('socket', socket);
});