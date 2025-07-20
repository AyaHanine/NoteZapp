<script setup>
import { ref, onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import axios from 'axios'


const route = useRoute()
const router = useRouter()
const note = ref(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`http://localhost:3001/notes/${id}`)
    note.value = res.data
  } catch (e) {
    note.value = null
  }
  loading.value = false
})

function goBack() {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-copper-50 flex flex-col items-center py-12">
    <button @click="goBack" class="mb-6 px-4 py-2 bg-copper-400 text-copper-900 rounded shadow hover:bg-copper-500 transition">← Retour</button>
    <div v-if="loading" class="text-copper-400 text-lg">Chargement…</div>
    <div v-else-if="note" class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
      <h1 class="text-3xl font-bold text-copper-900 mb-4">{{ note.title }}</h1>
      <div class="mb-4 text-copper-700" v-html="note.content"></div>
      <div v-if="note.tags?.length" class="mb-4 flex gap-2">
        <span v-for="tag in note.tags" :key="tag" class="bg-copper-100 text-copper-600 px-2 py-1 rounded text-xs">{{ tag }}</span>
      </div>
      <div class="text-copper-400 text-sm mb-2">Créée le {{ new Date(note.date).toLocaleDateString() }}</div>
      <div v-if="note.category" class="text-copper-500 text-xs">Catégorie : {{ note.category }}</div>
    </div>
    <div v-else class="text-copper-500">Note introuvable.</div>
  </div>
</template>
