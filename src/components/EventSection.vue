<template>
  <section class="content-section" :aria-labelledby="'event-' + event.id">
    <div class="event-media" v-if="event.imageFirst">
      <img :src="event.image" :alt="event.alt">
    </div>
    
    <div class="event-text">
      <h2 :id="'event-' + event.id">{{ event.date }}</h2>
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
    </div>

    <div class="event-media" v-if="!event.imageFirst">
      <img :src="event.image" :alt="event.alt">
    </div>
  </section>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
});
</script>