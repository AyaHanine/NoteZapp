<template>
  <aside class="w-64 min-h-screen flex flex-col bg-copper-900 shadow-lg border-r border-copper-800">
    <!-- Profil utilisateur dynamique -->
    <div class="flex items-center px-6 py-7 border-b border-copper-800">
      <div
        class="rounded-full bg-copper-400 text-copper-950 w-10 h-10 flex items-center justify-center text-lg font-bold shadow-inner"
      >
        {{ userStore.user?.username?.charAt(0)?.toUpperCase() || 'U' }}
      </div>
      <div class="ml-3">
        <div class="font-bold text-copper-100 text-base">
          {{ userStore.user?.username || 'Utilisateur' }}
        </div>
        <div class="text-xs text-copper-400">
          {{ userStore.user?.email || 'email@notezapp.com' }}
        </div>
      </div>
    </div>

    <!-- Search bar -->
    <div class="px-6 pt-5 pb-2">
      <input
        v-if="selectedMenu !== 'notes'"
        type="text"
        :value="searchQuery"
        @input="e => $emit('update:searchQuery', e.target.value)"
        placeholder="Rechercher…"
        class="w-full rounded-lg border border-copper-700 px-3 py-2 text-sm bg-copper-800 text-copper-100 placeholder-copper-400 focus:outline-none focus:ring-2 focus:ring-copper-400 transition"
      />
    </div>

    <!-- New note -->
    <button
      class="mx-6 mb-4 mt-2 flex items-center justify-center gap-2 px-0 py-3 rounded-lg font-bold bg-gradient-to-r from-copper-400 to-copper-500 text-copper-950 shadow-md hover:from-copper-500 hover:to-copper-600 transition"
      @click="goToAddNote">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4"/>
      </svg>
      Nouvelle note
    </button>

    <!-- Menu principal -->
    <nav class="flex flex-col gap-1 px-3 mt-1 font-semibold text-copper-100">
      <SidebarItem
        label="Notes"
        icon="mdi-note-multiple-outline"
        :active="selectedMenu==='notes'"
        @click="goToNotes"
      />
      <SidebarItem
        label="Favoris"
        icon="mdi-star-outline"
        :active="selectedMenu==='favorites'"
        @click="goToFavorites"
      />
      <SidebarItem
        label="Corbeille"
        icon="mdi-trash-can-outline"
        :active="selectedMenu==='trash'"
        :danger="true"
        @click="goToTrash"
      />

      <div class="mt-6 mb-2 px-2 text-xs text-copper-400 font-bold uppercase tracking-wide">Catégories</div>
      <div>
        <SidebarItem
          v-for="cat in categories"
          :key="cat"
          :label="cat"
          icon="mdi-folder-outline"
          :active="selectedMenu==='category' && selectedCategory===cat"
          @click="goToCategory(cat)"
        />
      </div>
    </nav>
    <!-- Bouton Déconnexion -->
    <div class="mt-auto px-6 py-4 border-t border-copper-800">
      <button
        @click="logout"
        class="w-full text-sm font-semibold text-copper-100 bg-copper-700 py-2 rounded hover:bg-copper-600 transition"
      >
        Se déconnecter
      </button>
    </div>
  </aside>
</template>

<script setup>

import SidebarItem from "@/components/SidebarItem.vue";
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

defineProps(['categories', 'selectedCategory', 'selectedMenu', 'searchQuery']);
defineEmits(['update:searchQuery'])

const router = useRouter()

function goToNotes() {
  router.push('/user-home')
}

function goToAddNote() {
  router.push('/notes/add')
}

function goToTrash() {
  router.push('/trash')
}

function goToFavorites() {
  router.push('/favorites')
}

function goToCategory(cat) {
  router.push(`/category/${cat}`)
}
function logout() {
  userStore.logout()
  router.push('/') // redirige vers la page d'accueil
}
</script>
