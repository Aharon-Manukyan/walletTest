<template>
    <div>
        <select name="" id="" @change="changeActiveCurrency">
            <option v-for="currency in currencies" :key="currency.name" :value="currency.name"
                :class="{ 'activeCurrency': selectedCurrency === currency.id }">
                {{ currency.name }}
            </option>
        </select>
    </div>
</template>
<script setup>
const currencies = reactive([
    { id: 1, name: 'BTCUSDT' },
    { id: 2, name: 'BNBBTC' },
    { id: 3, name: 'ETHBTC' }
])

const selectedCurrency = ref(1)
const changeActiveCurrency = (e) => {
    selectedCurrency.value = currencies.find((currency) => currency.name === e.target.value).id
}
</script>