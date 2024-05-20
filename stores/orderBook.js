import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderBookStore = defineStore('orderBook', {
  state: () => ({
    selectedPair: '',
    bids: [],
    asks: [],
    numItems: 100,
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
  
    setNumItems(numItems) {
      this.numItems = numItems
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