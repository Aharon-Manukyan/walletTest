<template>
    <div class="p-4 container mx-auto">
        <h1 class="text-2xl font-bold mb-4 mx-4">Settings</h1>
        <div class="flex justify-start flex-col mt-4 w-full mx-4 gap-1">
            <label for="currencyPair" class="block text-[18px] font-medium text-gray-700 ">Currency Pair</label>
            <select id="currencyPair" @change="updateCurrencyPair"
                class="mt-1 w-fit pl-3 pr-5 py-2 text-base rounded-md">
                <option v-for="pair in currencyPairs" :key="pair" :value="pair" :selected="pair === selectedPair">{{
                pair }}</option>
            </select>
        </div>
        <div class="mx-4">
            <h2 class="text-xl  my-4">Logs {{ logs.length ? `( ${logs.length} )` : null }}</h2>
            <div v-if="!logs.length">No result</div>
            <div v-else class="grid grid-cols-1 gap-4 mt-4 container mx-auto">
                <SettingsTable :logs="logs"></SettingsTable>
            </div>
        </div>

    </div>
</template>
<script setup>
import { useOrderBookStore } from '@/stores/orderBook'
import SettingsTable from '~/components/SettingsTable.vue';
import { useSettingsStore } from '~/stores/settings'
const store = useOrderBookStore()
const storeSettings = useSettingsStore()
const currencyPairs = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
const selectedPair = computed(() => store.selectedPair)
const logs = computed(() => storeSettings.logs)
const updateCurrencyPair = async (e) => {
    await storeSettings.changeCurrencyPair(e.target.value)
}
</script>
<style>
select {
    border: 1px solid black;
}
</style>