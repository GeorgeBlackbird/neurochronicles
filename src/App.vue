<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Preloader from './components/Preloader.vue';

const isLoading = ref(true);
const router = useRouter();

onMounted(() => {
  window.addEventListener('load', () => {
    isLoading.value = false;
  });
  
  // Перехват перехода между маршрутами
  router.beforeEach(() => {
    isLoading.value = true;
  });
  
  router.afterEach(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  });
});
</script>

<template>
  <div class="app">
    <Preloader :isLoading="isLoading" />
    <Header />
    <main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  width: 100%;
  padding: 0 0;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
