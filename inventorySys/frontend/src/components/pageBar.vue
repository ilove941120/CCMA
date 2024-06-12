<script setup>
import { computed } from "@vue/reactivity";

const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({ ShowNum: 10, Index: 0, TatolNum: 0 })
    }
})

const TotalPag = computed(() => {
    return Array.from({ length: Math.ceil(parseInt(sentObj.sent.TatolNum) / sentObj.sent.ShowNum) }, (_, i) => i + 1);
});

const emit = defineEmits(['change'])

const pageChange = (i) => {
    emit('change', i)
}

// watch(selectedValue, (newData) => {
// })
</script>

<template>
    <div class="pagBar">
        <div class="pageItem" v-for="i in TotalPag" :key="i" @click="pageChange(i)">{{ i }}</div>
    </div>
</template>

<style scoped>
.pagBar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.pageItem {
    border: 1px solid rgba(236, 236, 236, 0.952);
    padding: 6px 12px;
    margin-right: 5px;
    cursor: pointer;
}

.pageItem:hover {
    background-color: #ffc03af3;
    color: #ffffff;
}
</style>
