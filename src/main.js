import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

router.onError((error) => {
  console.error('Router error:', error);
});

const app = createApp(App);
app.use(router);
app.config.globalProperties.$isLoading = true;
app.mount('#app');

window.addEventListener('load', () => {
  app.config.globalProperties.$isLoading = false;
});
