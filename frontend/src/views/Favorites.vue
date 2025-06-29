<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"
import SidebarCategories from "@/components/SidebarCategories.vue"
import NoteCard from "@/components/NoteCard.vue"

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"]
const selectedMenu = ref("favorites")
const selectedCategory = ref("All")
const notes = ref([])
const loading = ref(true)
const searchQuery = ref("")

const fetchNotes = async () => {
  loading.value = true
  try {
    const res = await axios.get("http://localhost:3001/notes")
    notes.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    notes.value = []
  }
  loading.value = false
}

onMounted(fetchNotes)

const favoriteNotes = computed(() => {
  let arr = notes.value.filter(n => n.favorite && !n.deleted)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    arr = arr.filter(note => {
      const inTitle = note.title?.toLowerCase().includes(q)
      const inContent = note.content?.toLowerCase().includes(q)
      const inTags = Array.isArray(note.tags) && note.tags.some(tag => tag.toLowerCase().includes(q))
      return inTitle || inContent || inTags
    })
  }
  return arr
})

function updateFavorite(updatedNote) {
  const idx = notes.value.findIndex(n => n.id === updatedNote.id)
  if (idx !== -1) {
    notes.value[idx].favorite = updatedNote.favorite
  }
}
function updatePin(updatedNote) {
  const idx = notes.value.findIndex(n => n.id === updatedNote.id)
  if (idx !== -1) {
    notes.value[idx].pinned = updatedNote.pinned
  }
}
function removeNoteFromList(noteId) {
  notes.value = notes.value.filter(n => n.id !== noteId)
}
</script>

<template>
  <div class="flex flex-1 h-full bg-copper-50">
    <SidebarCategories
      :categories="categories"
      :selectedCategory="selectedCategory"
      :selectedMenu="selectedMenu"
      v-model:searchQuery="searchQuery"
    />
    <main class="flex-1 flex flex-col">
      <section class="p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-copper-900">Favoris</h1>
        <div v-if="loading" class="text-copper-700 py-10 text-lg">Chargement…</div>
        <div v-else>
          <div v-if="favoriteNotes.length === 0" class="text-copper-400 mb-4">
            Aucun favori pour l’instant.
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <NoteCard
              v-for="note in favoriteNotes"
              :key="note.id"
              :note="note"
              @favorite-updated="updateFavorite"
              @pin-updated="updatePin"
              @deleted="removeNoteFromList"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
