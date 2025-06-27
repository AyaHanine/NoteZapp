import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/landing.vue'
import UserHome from '@/views/userHome.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
      meta: { title: 'Accueil - NoteZapp', showHeaderFooter: true } 
    },
    {
      path: '/user-home',
      name: 'userHome',
      component: UserHome,
      meta: { title: 'Your Personal Space - NoteZapp', showHeaderFooter: true } 
    }

    
  ],
})

export default router
