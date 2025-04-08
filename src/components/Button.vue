<template>
  <div class="centered-btn-container">
    <a :href="link" class="btn">{{ text }}</a>
  </div>
</template>

<script setup>
defineProps({
  link: String,
  text: String
})
</script>

<style lang="scss" scoped>
</style>