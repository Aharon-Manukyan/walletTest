import { defineStore } from 'pinia';
import { useOrderBookStore } from "./orderBook";


export const useSettingsStore = defineStore('settings',{
    state: () => ({
        logs: [],
        ws: null,
    }),
    getters:{
         getLogs: (state) => state.logs
    },
    actions:{
    async changeCurrencyPair(pair) {
      const orderBookStore = useOrderBookStore()
      let exPair = orderBookStore.selectedPair 
      orderBookStore.selectedPair = pair
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
      await orderBookStore.fetchOrderBook()

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
    setLogs() {
      if(localStorage.getItem("settingLogs")){
        this.logs = JSON.parse(localStorage.getItem("settingLogs"))
      }
    },
    }
})