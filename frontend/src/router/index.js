import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/landing.vue'
import UserHome from '@/views/userHome.vue'
import AddNotePage from '@/views/AddNotePage.vue'
import Trash from '@/views/Trash.vue'
import Favorites from '@/views/Favorites.vue'
import Category from '@/views/Category.vue'


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
    },
    {
      path: '/notes/add',
      name: 'add-note',
      component: AddNotePage,
      meta: { title: 'Feel Free - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/trash',
      name: 'trash',
      component: Trash,
      meta: { title: 'Corbeille - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: { title: 'Favoris - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/category/:name',
      name: 'category',
      component: Category,
      meta: { title: 'Catégorie - NoteZapp', showHeaderFooter: true }
    }

  ],
})

export default router
