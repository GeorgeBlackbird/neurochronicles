<template>
  <header>
    <div class="header-inner">
      <router-link to="/" class="logo" aria-label="На главную Нейрохроники Войны">
        <img 
          src="@/assets/images/logo.png" 
          alt="Нейрохроники Войны" 
          class="logo-image"
        >
        <div class="logo-text">
          <span>НЕЙРОХРОНИКИ</span>
          <span>ВОЙНЫ</span>
        </div>
      </router-link>

      <nav aria-label="Основная навигация">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/catalog" class="nav-link">Фильмы</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function forceReload(event, path) {
  if (router.currentRoute.value.path === path) {
    event.preventDefault();
    router.push('/').then(() => {
      router.push(path);
    });
  }
}
</script>

<style lang="scss" scoped>
</style>