import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderBookStore = defineStore('orderBook', {
  state: () => ({
    selectedPair: 'BTCUSDT',
    logs: [],
    bids: [],
    asks: [],
    numItems: 100,
    ws: null,
  }),
  getters: {
    getAsks : (state) => state.asks,
    getBids:(state) => state.bids,
  },

  actions: {
    async fetchOrderBook() {
       const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${this.selectedPair}&limit=${this.numItems}`)       
        this.bids = response.data.bids
        this.asks = response.data.asks      
    },
    changeCurrencyPair(pair) {
      this.selectedPair = pair
      const log = {
        message: `Changed currency pair to ${pair}`,
        timestamp: new Date().toISOString(),
      }
      this.logs.push(log)
      this.fetchOrderBook()

      // Set up WebSocket connection
      if (this.ws) {
        this.ws.close()
      }
      this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@depth`)
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.bids = data.b
        this.asks = data.a
      }
    },
    setNumItems(numItems) {
      this.numItems = numItems
    },
  },
})