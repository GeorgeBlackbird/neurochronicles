<template>
  <div 
    class="year-content"
    :class="{ active: isActive }"
    :data-year="year"
    role="tabpanel"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  year: String,
  isActive: Boolean
});
</script>