<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Settings</h1>
        <label for="currencyPair" class="block text-sm font-medium text-gray-700">Currency Pair</label>
        <div class="flex justify-start gap-4 mt-4 w-full ">
            <select id="currencyPair" v-model="selectedPair" @change="updateCurrencyPair"
                class="mt-1 w-fit pl-3 pr-5 py-2 text-base rounded-md">
                <option v-for="pair in currencyPairs" :key="pair" :value="pair">{{ pair }}</option>
            </select>
        </div>
        <div class="mt-4">
            <h2 class="text-xl font-semibold">Logs {{ logs.length ? logs.length : null }}</h2>
            <ul>
                <template v-if="!logs.length">
                    <li>No result</li>
                </template>
                <template v-else>
                    <li v-for="log in logs" :key="log.timestamp">{{ log.message }} - {{ log.timestamp }}
                    </li>
                </template>
            </ul>

        </div>

    </div>
</template>
<script setup>
import { useOrderBookStore } from '@/stores/orderBook'
const store = useOrderBookStore()

const currencyPairs = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
const selectedPair = ref(store.selectedPair)
const logs = computed(() => store.logs)
const selectedCurrency = ref('')
const updateCurrencyPair = async (e) => {
    await store.changeCurrencyPair(e.target.value)
}
</script>
<style>
select {
    border: 1px solid black;
}
</style>