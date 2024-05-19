<template>
    <div class="tableOrderBook">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N</th>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From</th>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To</th>
                <th scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date</th>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="log, index in logs" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-right">{{ index + 1 }}</td>
                    <td class=" px-6 py-4 whitespace-nowrap text-right">{{ log.from }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">{{ log.to }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">{{ log.timestamp }}
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
<style>
.tableOrderBook {
    max-height: calc(100vh - 300px) !important;
    overflow-y: auto;
}
</style>