<script setup>
import webNavbar from ':@/view/web/CyyWeb/components/webNavbar.vue';
import webFooter from ':@/view/web/CyyWeb/components/webFooter.vue';

import { useStore } from 'vuex';
const store = useStore();
// store.commit('EnterWeb', 'Web');


</script>

<template>
   <webNavbar></webNavbar>
   <router-view></router-view>
   <webFooter></webFooter>
</template>

<style scoped>
</style>
