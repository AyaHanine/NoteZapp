import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/landing.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
      meta: { title: 'Accueil - NoteZapp', showHeaderFooter: true } 
    }
    
  ],
})

export default router
