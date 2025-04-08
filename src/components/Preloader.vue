<template>
  <div class="preloader" :class="{ hidden: !isLoading }">
    <div class="loader-text">ЗАГРУЗКА</div>
  </div>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    document.body.classList.add("preloader-active");

    window.addEventListener("load", this.hide);
    setTimeout(this.hide, 3000); // Фолбэк на случай ошибки
  },
  methods: {
    hide() {
      this.isLoading = false;
      document.body.classList.remove("preloader-active");
    },
  },
  beforeUnmount() {
    document.body.classList.remove("preloader-active");
  },
};
</script>
