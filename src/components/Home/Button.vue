<template>
  <div class="centered-btn-container">
    <router-link :to="link" class="btn">{{ text }}</router-link>
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