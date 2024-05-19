import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderBookStore = defineStore('orderBook', {
  state: () => ({
    selectedPair: '',
    logs: [],
    bids: [],
    asks: [],
    numItems: 100,
    ws: null,
  }),
  getters: {
    getAsks : (state) => state.asks,
    getBids:(state) => state.bids,
    getLogs: (state) => state.logs
  },

  actions: {
    async fetchOrderBook() {
       const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${this.selectedPair}&limit=${this.numItems}`)       
        this.bids = response.data.bids
        this.asks = response.data.asks      
    },
    async changeCurrencyPair(pair) {
      let exPair = this.selectedPair 
      this.selectedPair = pair
      localStorage.setItem('selectedPair', pair)
      const log = {
        message: `Changed currency pair from ${exPair} to ${pair}`,
        from:exPair,
        to:pair,
        timestamp: new Date().toISOString(),
      }
      if(!localStorage.getItem("settingLogs")){
        let localLogs = []
        localLogs.unshift(log)
        localStorage.setItem("settingLogs",JSON.stringify(localLogs))
      }else{
        let logInStorage = JSON.parse(localStorage.getItem("settingLogs"))
        logInStorage.unshift(log)
        localStorage.setItem("settingLogs", JSON.stringify(logInStorage))
      }
      this.logs.unshift(log)
      await this.fetchOrderBook()

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
    setLogs() {
      if(localStorage.getItem("settingLogs")){
        this.logs = JSON.parse(localStorage.getItem("settingLogs"))
      }
    },
    setSelectedPair(pair){
      if(localStorage.getItem("selectedPair")){
        this.selectedPair = localStorage.getItem("selectedPair")
      }else{
        this.selectedPair = "BTCUSDT"
        localStorage.setItem('selectedPair',pair)
      }
    }
  },
})