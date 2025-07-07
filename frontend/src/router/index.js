import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/landing.vue'
import UserHome from '@/views/userHome.vue'
import AddNotePage from '@/views/AddNotePage.vue'
import Trash from '@/views/Trash.vue'
import Favorites from '@/views/Favorites.vue'
import Category from '@/views/Category.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import UserProfile from '@/views/UserProfile.vue'
import EditNotePage from '@/views/EditNotePage.vue'

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
      meta: { title: 'Your Personal Space - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
    {
      path: '/notes/add',
      name: 'add-note',
      component: AddNotePage,
      meta: { title: 'Feel Free - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
    {
      path: '/trash',
      name: 'trash',
      component: Trash,
      meta: { title: 'Corbeille - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
      meta: { title: 'Favoris - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
    {
      path: '/category/:name',
      name: 'category',
      component: Category,
      meta: { title: 'Catégorie - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Connexion - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { title: 'Inscription - NoteZapp', showHeaderFooter: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: { title: 'Mon Profil - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
    {
      path: '/notes/edit/:id',
      name: 'EditNote',
      component: EditNotePage,
      meta: { title: 'Modifier la note - NoteZapp', showHeaderFooter: true, requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("userId")
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
