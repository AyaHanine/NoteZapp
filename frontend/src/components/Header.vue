<template>
  <header
    class="w-full bg-copper-900 shadow-md px-6 sm:px-20 py-4 flex justify-between items-center"
  >
    <div class="flex items-center gap-2">
      <span class="text-2xl font-extrabold text-white tracking-tight"
        >NoteZ<span class="text-copper-400">app</span></span
      >
    </div>
    <nav class="flex gap-10 items-center">
      <a href="#features" class="text-copper-100 hover:text-copper-300 font-medium"
        >Fonctionnalités</a
      >
      <a href="#about" class="text-copper-100 hover:text-copper-300 font-medium">À propos</a>
      <a href="#contact" class="text-copper-100 hover:text-copper-300 font-medium">Contact</a>
      <button
        @click="goToHome"
        class="ml-6 bg-copper-400 hover:bg-copper-500 text-copper-950 px-6 py-2 rounded-full font-bold shadow transition"
      >
        Essayer
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user' //  Import du store

const router = useRouter()
const userStore = useUserStore() //  Instance du store

const goToHome = () => {
  if (userStore.user) {
    router.push('/user-home') // Connecté → Page principale
  } else {
    router.push('/login') // Pas connecté → Page de connexion
  }
}
</script>
