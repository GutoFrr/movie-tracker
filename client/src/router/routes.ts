import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Movie from '../views/Movie.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id/:title', component: Movie },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
