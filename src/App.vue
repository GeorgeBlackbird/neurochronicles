<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Header from "./components/Common/Header.vue";
import Footer from "./components/Common/Footer.vue";
import Preloader from "./components/Common/Preloader.vue";

const isLoading = ref(true);
const router = useRouter();
const mainContent = ref(null);

// Функция для проверки загрузки всех изображений
const checkImagesLoaded = () => {
  return new Promise((resolve) => {
    const images = document.querySelectorAll("img");
    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const imageLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener("load", imageLoaded);
        img.addEventListener("error", imageLoaded);
      }
    });
  });
};

// Функция для проверки загрузки всех iframe
const checkIframesLoaded = () => {
  return new Promise((resolve) => {
    const iframes = document.querySelectorAll("iframe");
    if (iframes.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalIframes = iframes.length;

    const iframeLoaded = () => {
      loadedCount++;
      if (loadedCount === totalIframes) {
        resolve();
      }
    };

    iframes.forEach((iframe) => {
      if (iframe.contentWindow.document.readyState === "complete") {
        iframeLoaded();
      } else {
        iframe.addEventListener("load", iframeLoaded);
        iframe.addEventListener("error", iframeLoaded);
      }
    });
  });
};

// Функция для проверки загрузки всего контента
const checkContentLoaded = async () => {
  try {
    await Promise.all([
      checkImagesLoaded(),
      checkIframesLoaded(),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 300));
    isLoading.value = false;
    // Удаляем класс и восстанавливаем прокрутку
    document.body.classList.remove("content-hidden");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    // Прокручиваем к началу страницы
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Error checking content load:", error);
    isLoading.value = false;
    document.body.classList.remove("content-hidden");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    // Прокручиваем к началу страницы даже в случае ошибки
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

// Отслеживаем изменения маршрута
router.beforeEach((to, from, next) => {
  // Сразу показываем прелоадер и скрываем контент
  isLoading.value = true;
  document.body.classList.add("content-hidden");
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
  next();
});

// Используем beforeResolve для гарантии, что прелоадер появился
router.beforeResolve((to, from, next) => {
  // Ждем следующего тика для гарантии, что прелоадер начал появляться
  setTimeout(() => {
    next();
  }, 100);
});

router.afterEach(() => {
  // Ждем, пока DOM обновится
  setTimeout(() => {
    checkContentLoaded();
  }, 0);
});

onMounted(() => {
  isLoading.value = true;
  document.body.classList.add("content-hidden");
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
  window.addEventListener("load", () => {
    checkContentLoaded();
  });
});
</script>

<template>
  <div class="app">
    <Preloader :isLoading="isLoading" />
    <Header />
    <main ref="mainContent">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <Footer />
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
