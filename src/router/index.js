import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import mapView from '@/components/mapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: mapView,
    },
    {
      path: '/mapa/:id',
      name: 'casa-detalle',
      component: mapView,
      props: true,
    },
  ],
})

export default router
