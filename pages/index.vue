<template>
    <div class="container mx-auto p-4 orderBook flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Order Book</h1>

        <div class="w-full flex justify-start flex-col gap-1">
            <label for="numItems" class="block text-[18px] font-medium text-gray-700">Number of Items</label>
            <select id="numItems" v-model="numItems" @change="updateNumItems"
                class="mt-1 w-fit pl-3 pr-5 py-2 rounded-md">
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
            </select>
        </div>
        <div class="grid md:grid-cols-1 grid-cols-2 gap-4 mt-4">
            <div>
                <h3 class="mb-4 text-xl">Bids</h3>
                <OrderBookTable :items="bids" title="Bids" />
            </div>
            <div>
                <h3 class="mb-4 text-xl">Asks</h3>
                <OrderBookTable :items="asks" title="Asks" />
            </div>

        </div>


    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import OrderBookTable from '@/components/OrderBookTable.vue';
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
}
</style>
