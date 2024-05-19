<template>
    <div class="container mx-auto p-4 orderBook">
        <h1 class="text-2xl font-bold mb-4">Order Book</h1>
        <label for="numItems" class="block text-sm font-medium text-gray-700">Number of Items</label>

        <div>Count : {{ store.numItems > 0 ? store.numItems : 0 }}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <OrderBookTable :items="bids" title="Bids" />
            <OrderBookTable :items="asks" title="Asks" />
        </div>
        <div class="w-full flex justify-end">
            <select id="numItems" v-model="numItems" @change="updateNumItems" class="mt-1 w-fit pl-3 pr-10 py-2">
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
            </select>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import OrderBookTable from '@/components/OrderBookTable.vue';
import { useNuxtApp } from '#app';
import { useOrderBookStore } from '@/stores/orderBook'

const store = useOrderBookStore()
const numItems = ref(100)

const updateNumItems = async () => {
    store.setNumItems(numItems.value)
    await store.fetchOrderBook()
    bids.value = store.getBids;
    asks.value = store.getAsks;
}
const bids = ref([]);
const asks = ref([]);



onMounted(async () => {
    await store.fetchOrderBook()
    bids.value = store.getBids;
    asks.value = store.getAsks;
});
</script>
<style>
.orderBook {
    max-height: calc(100vh - 64px) !important;
    /* overflow: hidden; */
}
</style>
