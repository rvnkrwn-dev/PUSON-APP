<template>
  <div>
    <button @click="showToast">Click me to show Toast</button>
  </div>
</template>

<script setup lang="ts">
const toast = useNuxtApp().$toast;

const showToast = () => {
  toast('This is a normal toast', 'normal');
  toast('This is a success toast', 'success');
  toast('This is an error toast', 'error');
  toast('This is a warning toast', 'warning');
};
</script>

<style scoped>
/* Anda bisa menambahkan gaya sesuai kebutuhan */
</style>
