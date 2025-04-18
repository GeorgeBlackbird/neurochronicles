<template>
  <div class="preloader" :class="{ hidden: !isLoading }">
    <div class="loader-text">ЗАГРУЗКА</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});

onMounted(() => {
  document.body.classList.add("preloader-active");
});

onUnmounted(() => {
  document.body.classList.remove("preloader-active");
});
</script>
