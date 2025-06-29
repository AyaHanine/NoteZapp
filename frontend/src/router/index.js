import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/landing.vue'
import UserHome from '@/views/userHome.vue'
import AddNotePage from '@/views/AddNotePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
      meta: { title: 'Accueil - NoteZapp', showHeaderFooter: true },
    },
    {
      path: '/user-home',
      name: 'userHome',
      component: UserHome,
      meta: { title: 'Your Personal Space - NoteZapp', showHeaderFooter: true },
    },
    {
      path: '/notes/add',
      name: 'add-note',
      component: AddNotePage,
      meta: { title: 'Feel Free - NoteZapp', showHeaderFooter: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: 'Connexion - NoteZapp', showHeaderFooter: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { title: 'Inscription - NoteZapp', showHeaderFooter: true },
    },
  ],
})

export default router
