<template>
  <header>
    <nav class="flex justify-between px-3 bg-black py-5">
      <div class="">
        <img src="./assets/logo.svg" alt="logo">
      </div>
      <ul class="flex flex-row justify-center gap-4">

        <li class="text-[#fff] hover:text-[#fcd535]">
          <NuxtLink to="/settings">Settings</NuxtLink>
        </li>
        <li class="text-[#fff] hover:text-[#fcd535]">
          <NuxtLink to="/">Order Book</NuxtLink>
        </li>
      </ul>
      <div></div>
    </nav>
  </header>
  <div class="w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useOrderBookStore } from '@/stores/orderBook'
const store = useOrderBookStore()
onMounted(() => {
  store.setSelectedPair();
  store.setLogs();
})
</script>
