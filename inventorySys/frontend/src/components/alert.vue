<script setup>

const msgData = defineProps({
    msg: {
        type: Object,
        default: () => ({ msg: '尚無資料', color: '尚無資料' })
    }
})
</script>

<template>
    <div class="alertMessge" :style="{ backgroundColor: msg.color}" 
    @mouseenter="$store.commit('stopTimer')" 
    @mouseleave="$store.commit('startTimer')"
    >
        {{msg.msg}}
    </div>
</template>

<style scoped>
    .alertMessge{
        width: 250px;
        min-height: 50px;
        border-radius: 5px;
        padding: 20px ;
        position: fixed;
        z-index: 999;
        top: 20px;
        right: 20px;
        font-size: 18px;
        font-weight: bolder;
        color: #f0f8ff;
        opacity: 0.9;
        box-shadow: 1px 1px 8px 2px black;
        background-color: #fac45f;
        background-color: #35a065;
    }
</style>
