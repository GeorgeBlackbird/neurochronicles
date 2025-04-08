<template>
  <section class="films-row" :aria-label="'Фильмы ' + year + ' года'">
    <a 
      v-for="film in films"
      :key="film.id"
      :href="film.link"
      class="film-card"
    >
      <img :src="film.poster" class="movie-poster" :alt="'Постер фильма ' + film.title">
      <div class="movie-info">
        <h3 class="movie-title">{{ film.title }}</h3>
      </div>
    </a>
  </section>
</template>

<script setup>
defineProps({
  films: {
    type: Array,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});
</script>