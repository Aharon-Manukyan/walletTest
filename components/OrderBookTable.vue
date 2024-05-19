<template>
    <div class="tableOrderBook">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
                <tr>
                    <th>{{ title }}</th>
                    <th scope="col"
                        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price</th>
                    <th scope="col"
                        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity</th>
                    <th scope="col"
                        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sm:hidden xs:hidden">
                        Total</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item, index in items" :key="item.price">
                    <td class="px-6 py-4 whitespace-nowrap text-right">{{ index + 1 }}</td>
                    <td class=" px-6 py-4 whitespace-nowrap text-right">{{ (+item[0]).toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">{{ (+item[1]).toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right sm:hidden xs:hidden">{{ (+item[0] *
                        +item[1]).toFixed(3) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        title: {
            type: Boolean,
            required: true
        }
    },
};
</script>

<style>
.tableOrderBook {
    max-height: calc(100vh - 300px) !important;
    overflow-y: auto;
}
</style>