<template>
  <section class="content-wrapper" :aria-labelledby="id">
    <div v-if="imageFirst && image" class="image-container">
      <img :src="image" :alt="alt" />
    </div>

    <div class="text-content">
      <h1 :id="id">{{ title }}</h1>
      <p>{{ text }}</p>
      <slot></slot>
    </div>

    <div v-if="!imageFirst && image" class="image-container">
      <img :src="image" :alt="alt" />
    </div>
  </section>
</template>

<script setup>
defineProps({
  id: String,
  title: String,
  text: String,
  image: [String, null],
  alt: String,
  imageFirst: Boolean
})
</script>

<style lang="scss" scoped>
</style>