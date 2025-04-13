<template>
  <section class="films-row" :aria-label="'Фильмы ' + year + ' года'">
    <router-link
      v-for="film in films"
      :key="film.id"
      :to="{ name: 'Movie Page', params: { id: film.id } }"
      class="film-card"
    >
      <img
        :src="film.poster"
        class="movie-poster"
        :alt="'Постер фильма ' + film.title"
      />
      <div class="movie-info">
        <h3 class="movie-title">{{ film.title }}</h3>
      </div>
    </router-link>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  films: {
    type: Array,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});
</script>
