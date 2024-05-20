<template>
    <div class="relative overflow-x-auto tableOrderBook ">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-[#454545] sticky top-0 text-[#fff]">
                <th scope="col"
                    class=" border-r border-[#ffffff] border-solid px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    N</th>
                <th scope="col"
                    class=" border-r border-[#ffffff] border-solid px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    From</th>
                <th scope="col"
                    class=" border-r border-[#ffffff] border-solidpx-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    To</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                    Date</th>
            </thead>
            <tbody class="bg-[#e9e9e9]">
                <tr v-for="log, index in logs" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-center ">{{ index + 1 }}</td>
                    <td class=" px-6 py-4 whitespace-nowrap text-center ">{{ log.from }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">{{ log.to }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">{{ log.timestamp }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    logs: {
        type: Array,
        required: true,
    }
})
</script>
<style scoped>
.tableOrderBook {
    max-height: calc(100vh - 300px) !important;
    overflow-y: auto;
}
</style>