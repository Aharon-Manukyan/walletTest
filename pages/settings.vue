<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Settings</h1>
        <label for="currencyPair" class="block text-sm font-medium text-gray-700">Currency Pair</label>
        <div class="flex justify-start gap-4 mt-4 w-full ">
            <select id="currencyPair" v-model="selectedPair" @change="updateCurrencyPair"
                class="mt-1 w-fit pl-3 pr-5 py-2 text-base rounded-md">
                <option v-for="pair in currencyPairs" :key="pair" :value="pair" :selected="pair === selectedPair">{{
                pair }}</option>
            </select>
        </div>
        <div>
            <h2 class="text-xl font-semibold my-4">Logs {{ logs.length ? logs.length : null }}</h2>
            <div v-if="!logs.length">No result</div>
            <SettingsTable v-else :logs="logs"></SettingsTable>
        </div>

    </div>
</template>
<script setup>
import { useOrderBookStore } from '@/stores/orderBook'
import SettingsTable from '~/components/SettingsTable.vue';

const props = defineProps({
    activeRoute: {
        type: String,
        required: true
    }
})
const store = useOrderBookStore()

const currencyPairs = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
const selectedPair = computed(() => store.selectedPair)
const logs = computed(() => store.logs)
const updateCurrencyPair = async (e) => {
    await store.changeCurrencyPair(e.target.value)
}
</script>
<style>
select {
    border: 1px solid black;
}
</style>