<template>
  <main class="movie-main" v-if="movie">
    <!-- Блок с основной информацией о фильме -->
    <section class="movie-header" aria-labelledby="movie-title">
      <div class="movie-header-content">
        <h1 id="movie-title">{{ movie.title }}</h1>
        <div class="movie-meta">
          <span class="movie-year">{{ movie.year }}</span>
          <span class="movie-studio">{{ movie.genre }}</span>
          <span class="movie-director">{{ movie.ageRating }}</span>
        </div>
      </div>
    </section>

    <!-- Основной контент фильма -->
    <section class="movie-content">
      <div class="movie-poster-description">
        <div class="movie-poster-container">
          <img
            :src="movie.poster"
            :alt="'Постер фильма ' + movie.title"
            class="movie-main-poster"
          />
        </div>
        <div class="movie-description">
          <h2>О фильме</h2>
          <p v-for="(paragraph, index) in movie.description" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="tabs-container">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.title }}
          </button>
        </div>

        <div class="tab-content-wrapper">
          <!-- Информация -->
          <div class="tab-content" :class="{ active: activeTab === 'info' }">
            <div class="movie-info-grid">
              <div class="movie-facts">
                <h2>Историческая справка</h2>
                <p>{{ movie.historicalContext }}</p>

                <h3>Интересные факты</h3>
                <ul class="facts-list">
                  <li v-for="(fact, index) in movie.facts" :key="index">
                    {{ fact }}
                  </li>
                </ul>
              </div>

              <div class="movie-cast-crew">
                <h2>В главных ролях</h2>
                <div class="cast-grid">
                  <div
                    v-for="actor in movie.cast"
                    :key="actor.name"
                    class="cast-member"
                  >
                    <img
                      :src="actor.photo"
                      :alt="actor.name"
                      class="cast-photo"
                    />
                    <span class="cast-name">{{ actor.name }}</span>
                    <span class="cast-role">{{ actor.role }}</span>
                  </div>
                </div>

                <div class="crew-info">
                  <h3>Создатели фильма</h3>
                  <ul class="crew-list">
                    <li v-for="(value, role) in movie.crew" :key="role">
                      <strong>{{ role }}:</strong> {{ value }}
                    </li>
                  </ul>

                  <div class="production-info">
                    <p><strong>Дата выхода:</strong> {{ movie.releaseDate }}</p>
                    <p><strong>Премьера:</strong> {{ movie.premiere }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Галерея -->
          <div class="tab-content" :class="{ active: activeTab === 'gallery' }">
            <div class="movie-gallery">
              <h2>Кадры из фильма</h2>
              <div class="gallery-container">
                <div
                  class="gallery-item gallery-item-main"
                  @click="openVideoModal"
                >
                  <video class="video-thumbnail" preload="metadata" muted>
                    <source :src="movie.trailer" type="video/mp4" />
                  </video>
                  <div class="play-icon">▶</div>
                  <span class="gallery-caption">Трейлер фильма</span>
                </div>
                <div
                  v-for="(frame, index) in movie.frames"
                  :key="index"
                  class="gallery-item"
                  :class="{ 'gallery-item-right': index < 2 }"
                  @click="openImageModal(frame)"
                >
                  <img
                    :src="frame.image"
                    :alt="frame.caption"
                    class="gallery-thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Мнения -->
          <div
            class="tab-content"
            :class="{ active: activeTab === 'opinions' }"
          >
            <div class="ai-opinions-container">
              <div class="ai-poster-block">
                <h3 class="ai-poster-title">Видение ChatGPT-4</h3>
                <img
                  :src="movie.aiPoster"
                  :alt="'Альтернативный постер фильма ' + movie.title"
                  class="ai-poster"
                />
                <p class="ai-poster-description">
                  Альтернативный вариант постера, созданный нейросетью
                </p>
              </div>

              <div class="ai-quotes-block">
                <div
                  v-for="(quote, index) in movie.aiQuotes"
                  :key="index"
                  class="ai-quote"
                >
                  <AILogos :ai-name="quote.author" />
                  <div class="quote-block">
                    <blockquote class="quote-text">
                      {{ quote.text }}
                      <cite class="quote-author">{{ quote.author }}</cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Модальные окна -->
    <div
      class="modal-overlay"
      :class="{ active: showImageModal || showVideoModal }"
      @click="closeModals"
    >
      <!-- Навигационные стрелки -->
      <button class="nav-button prev" @click.stop="navigateMedia('prev')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button class="nav-button next" @click.stop="navigateMedia('next')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Модальное окно -->
      <div class="modal-content" @click.stop>
        <!-- Контент модального окна -->
        <div v-if="showVideoModal" class="modal-media">
          <video class="modal-video" controls>
            <source :src="movie.trailer" type="video/mp4" />
          </video>
        </div>

        <div v-if="showImageModal" class="modal-media">
          <img
            :src="currentImage"
            :alt="currentImageCaption"
            class="modal-image"
          />
        </div>
      </div>

      <!-- Кнопка закрытия -->
      <button class="modal-close" @click="closeModals">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Миниатюры -->
      <div class="modal-thumbnails">
        <div
          class="modal-thumbnail"
          :class="{ active: currentIndex === 0 }"
          @click.stop="openVideoModal"
        >
          <video class="video-thumbnail" preload="metadata" muted>
            <source :src="movie.trailer" type="video/mp4" />
          </video>
        </div>
        <div
          v-for="(frame, index) in movie.frames"
          :key="index"
          class="modal-thumbnail"
          :class="{ active: currentIndex === index + 1 }"
          @click.stop="openImageModal(frame)"
        >
          <img :src="frame.image" :alt="frame.caption" />
        </div>
      </div>
    </div>
  </main>
  <div v-else class="loading">Загрузка...</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { moviesData } from "@/assets/data/moviesData.js";
import { yearsData } from "@/assets/data/warData.js";
import { moviePosters } from "@/assets/data/movies/posters.js";
import { movieTrailers } from "@/assets/data/movies/trailers.js";
import { actorPhotos } from "@/assets/data/movies/actors.js";
import AILogos from "@/components/AILogos.vue";

const route = useRoute();
const movie = ref(null);
const activeTab = ref("info");
const showImageModal = ref(false);
const showVideoModal = ref(false);
const currentImage = ref("");
const currentImageCaption = ref("");
const currentIndex = ref(-1);

const tabs = [
  { id: "info", title: "ИНФОРМАЦИЯ" },
  { id: "gallery", title: "ГАЛЕРЕЯ" },
  { id: "opinions", title: "МНЕНИЯ" },
];

// Добавляем наблюдатель за изменением параметра маршрута
watch(
  () => route.params.id,
  (newId) => {
    // Сбрасываем все состояния
    movie.value = null;
    activeTab.value = "info";
    showImageModal.value = false;
    showVideoModal.value = false;
    currentImage.value = "";
    currentImageCaption.value = "";
    currentIndex.value = -1;

    // Загружаем данные для нового фильма
    loadMovieData(newId);
  },
  { immediate: true }
);

// Выносим логику загрузки данных в отдельную функцию
function loadMovieData(movieId) {
  console.log("Searching for movie with ID:", movieId);

  const movieData = moviesData.find((m) => m.id === movieId);
  console.log("Found in moviesData:", movieData);

  if (!movieData) {
    // Если фильм не найден в moviesData, попробуем найти его в yearsData
    const yearData = yearsData.find((year) => {
      return year.films.some((film) => film.id === movieId);
    });
    console.log("Found yearData:", yearData);

    if (yearData) {
      const filmData = yearData.films.find((film) => film.id === movieId);
      console.log("Found filmData:", filmData);

      movie.value = {
        id: filmData.id,
        title: filmData.title,
        year: yearData.year,
        genre: "Драма",
        ageRating: "12+",
        description: [
          `Фильм "${filmData.title}" был снят в ${yearData.year} году.`,
        ],
        historicalContext: `Исторический контекст фильма "${filmData.title}" связан с событиями ${yearData.year} года.`,
        facts: [
          `Фильм был создан в ${yearData.year} году`,
          "Дополнительная информация о фильме отсутствует",
        ],
        cast: [],
        crew: {},
        releaseDate: "Дата выхода неизвестна",
        premiere: "Место премьеры неизвестно",
        poster: moviePosters[filmData.id],
        trailer: "",
        trailerThumbnail: "",
        frames: [],
        aiPoster: "",
        aiQuotes: [],
      };
      console.log("Created movie object:", movie.value);
    }
  } else {
    movie.value = movieData;
  }
}

// Обработчик клавиатуры
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    closeModals();
  } else if (showImageModal.value || showVideoModal.value) {
    if (event.key === "ArrowLeft") {
      navigateMedia("prev");
    } else if (event.key === "ArrowRight") {
      navigateMedia("next");
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function navigateMedia(direction) {
  console.log("Navigating media:", direction);
  const allMedia = [
    { type: "video", src: movie.value.trailer, caption: "Трейлер фильма" },
    ...movie.value.frames.map((f) => ({ type: "image", ...f })),
  ];
  console.log("Current index before navigation:", currentIndex.value);

  if (direction === "next") {
    currentIndex.value = (currentIndex.value + 1) % allMedia.length;
  } else {
    currentIndex.value =
      (currentIndex.value - 1 + allMedia.length) % allMedia.length;
  }
  console.log("Current index after navigation:", currentIndex.value);

  const media = allMedia[currentIndex.value];
  console.log("Selected media:", media);

  if (media.type === "video") {
    showImageModal.value = false;
    showVideoModal.value = true;
    // Останавливаем текущее видео, если оно есть
    const currentVideo = document.querySelector(".modal-video");
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
  } else {
    showImageModal.value = true;
    showVideoModal.value = false;
    currentImage.value = media.image;
    currentImageCaption.value = media.caption;
  }
}

function openImageModal(frame) {
  console.log("Opening image modal for frame:", frame);
  const allMedia = [
    { type: "video", src: movie.value.trailer, caption: "Трейлер фильма" },
    ...movie.value.frames.map((f) => ({ type: "image", ...f })),
  ];
  console.log("All media:", allMedia);

  // Находим индекс текущего изображения в массиве frames
  const frameIndex = movie.value.frames.findIndex(
    (f) => f.image === frame.image
  );
  console.log("Frame index:", frameIndex);

  // Добавляем 1, так как первый элемент - это видео
  currentIndex.value = frameIndex + 1;
  console.log("Current index:", currentIndex.value);

  currentImage.value = frame.image;
  currentImageCaption.value = frame.caption;
  showImageModal.value = true;
  showVideoModal.value = false;
  document.body.classList.add("modal-open");
}

function openVideoModal() {
  console.log("Opening video modal");
  const allMedia = [
    { type: "video", src: movie.value.trailer, caption: "Трейлер фильма" },
  ];
  currentIndex.value = 0;
  showVideoModal.value = true;
  showImageModal.value = false;
  // Останавливаем текущее видео, если оно есть
  const currentVideo = document.querySelector(".modal-video");
  if (currentVideo) {
    currentVideo.pause();
    currentVideo.currentTime = 0;
  }
  document.body.classList.add("modal-open");
}

function closeModals() {
  showImageModal.value = false;
  showVideoModal.value = false;
  const video = document.querySelector(".modal-video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  document.body.classList.remove("modal-open");
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: var(--text-color);
}

.movie-main {
  padding: 3rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.movie-content {
  margin-top: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  padding: 60px 60px 120px;
  overflow: hidden;
  z-index: 1000;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Удаляем глобальный стиль для body */
:global(body.modal-open) {
  overflow: hidden;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: calc(100vh - 180px); /* Учитываем отступы */
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
}

.modal-media {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  overflow: hidden;
  padding: 0;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: auto;
  height: auto;
  border: none;
}

.modal-video {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border: none;
}

.modal-caption {
  margin-top: 1rem;
  text-align: center;
  color: var(--text-color);
  font-size: 0.9rem;
}

.nav-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 20;
  opacity: 0.5;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.nav-button svg {
  width: 24px;
  height: 24px;
}

.nav-button.prev {
  left: 1rem;
}

.nav-button.next {
  right: 1rem;
}

.modal-thumbnails {
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  z-index: 20;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  height: 90px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.modal-thumbnails:hover {
  opacity: 1;
}

.modal-thumbnail {
  width: 120px;
  height: 67.5px;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.7;
}

.modal-thumbnail.active {
  transform: scale(1.1);
  opacity: 1;
  box-shadow: 0 0 0 2px var(--primary-color);
}

.modal-thumbnail::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-thumbnail:hover::after {
  opacity: 1;
}

.modal-thumbnail.active::after {
  opacity: 0;
}

.modal-thumbnail img,
.modal-thumbnail video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-thumbnail video {
  background: #000;
}

.modal-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 20;
  opacity: 0.5;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
  transform: scale(1.1);
}

.modal-close svg {
  width: 24px;
  height: 24px;
}

.movie-gallery {
  h2 {
    margin-bottom: 2rem;
  }
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.gallery-item-main {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  aspect-ratio: 16/9;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  &:hover .play-icon {
    opacity: 1;
  }

  .gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    font-size: 0.9rem;
  }
}

.gallery-item {
  aspect-ratio: 16/9;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 100%;
  height: 100%;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Для первых двух кадров (справа от трейлера) */
.gallery-item:nth-child(2) {
  grid-column: 3;
  grid-row: 1;
}

.gallery-item:nth-child(3) {
  grid-column: 4;
  grid-row: 1;
}

.gallery-item:nth-child(4) {
  grid-column: 3;
  grid-row: 2;
}

.gallery-item:nth-child(5) {
  grid-column: 4;
  grid-row: 2;
}

/* Остальные кадры (под трейлером) */
.gallery-item:nth-child(n + 6) {
  grid-column: auto;
  grid-row: auto;
}
</style>
