<template>
  <div class="quote-block">
    <blockquote class="quote-text">
      {{ quote }}
      <cite class="quote-author">{{ author }}</cite>
    </blockquote>
  </div>
</template>

<script setup>
defineProps({
  quote: String,
  author: String
})
</script>

<style lang="scss" scoped>
</style>