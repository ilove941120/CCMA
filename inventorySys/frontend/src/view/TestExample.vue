<template>
    <button @click="isOpen = !isOpen">Toggle</button>
    <transition name="expand">
      <div v-if="isOpen" class="box">
        Content goes here.
      </div>
    </transition>
  </template>
  
  <script>
  import { ref } from 'vue'
  export default {
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    }
  }
  </script>
  
  <style scoped>
  .box {
    overflow: hidden;
  }
  
  .expand-enter-active {
    transition: max-height 0.5s ease-in-out;
  }
  
  .expand-leave-active {
    transition: max-height 0.5s ease-in-out;
  }
  
  .expand-enter, .expand-leave-to {
    max-height: 0;
  }
  
  .expand-leave, .expand-enter-to {
    max-height: 500px; /* 这个值需要根据你的内容大小设定 */
  }
  </style>