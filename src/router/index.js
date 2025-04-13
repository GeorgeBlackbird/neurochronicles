import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import MoviePage from '../views/Movie.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/movie/:id', name: 'Movie Page', component: MoviePage, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router