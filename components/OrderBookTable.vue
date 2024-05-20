<template>
    <div class="tableOrderBook">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-[#454545] sticky top-0 text-[#fff]">
                <tr>
                    <th scope="col"
                        class=" border-r border-[#ffffff] border-solid px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                        N</th>
                    <th scope="col"
                        class="border-r border-[#ffffff] border-solid px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                        Price</th>
                    <th scope="col"
                        class="md:hidden border-r border-[#ffffff] border-solid px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                        Quantity</th>
                    <th scope="col"
                        class="border-r border-[#ffffff] border-solidpx-6 py-3 text-center text-xs font-medium  uppercase tracking-wider ">
                        Total</th>
                </tr>
            </thead>
            <tbody class="bg-[#e9e9e9]">
                <tr v-for="item, index in items" :key="item.price">
                    <td class="px-6 py-4 whitespace-nowrap text-center">{{ index + 1 }}</td>
                    <td class=" px-6 py-4 whitespace-nowrap text-center">{{ (+item[0]).toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center md:hidden ">{{ (+item[1]).toFixed(2) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center ">{{ (+item[0] *
                    +item[1]).toFixed(3) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    items: {
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