<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"
import SidebarCategories from "@/components/SidebarCategories.vue"

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"]
const selectedMenu = ref("trash")
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

function getDaysRemaining(deletionDate) {
  if (!deletionDate) return null
  const deletion = new Date(deletionDate)
  const expiryDate = new Date(deletion)
  expiryDate.setDate(expiryDate.getDate() + 14)
  const now = new Date()
  const diffTime = expiryDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

async function restoreNote(note) {
  try {
    await axios.patch(`http://localhost:3001/notes/${note.id}`, {
      deleted: false,
      deletionDate: null
    })
    notes.value = notes.value.filter(n => n.id !== note.id)
  } catch (e) {
    console.error("Erreur lors de la restauration :", e)
  }
}

const trashNotes = computed(() => {
  let arr = notes.value.filter(n => {
    if (!n.deleted) return false
    if (!n.deletionDate) return true
    const deletion = new Date(n.deletionDate)
    const expiry = new Date(deletion)
    expiry.setDate(expiry.getDate() + 14)
    return expiry > new Date()
  })
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
</script>

<template>
  <div class="flex flex-1 h-full bg-copper-50">
    <!-- Sidebar -->
    <SidebarCategories
      :categories="categories"
      :selectedCategory="selectedCategory"
      :selectedMenu="selectedMenu"
      v-model:searchQuery="searchQuery"
    />

    <!-- Main content -->
    <main class="flex-1 flex flex-col">
      <section class="p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-copper-900">Corbeille</h1>
        <div v-if="loading" class="text-copper-700 py-10 text-lg">Chargement…</div>
        <div v-else>
          <div v-if="trashNotes.length === 0" class="text-copper-400 mb-4">
            La corbeille est vide.
          </div>
          <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="note in trashNotes"
              :key="note.id"
              class="bg-white rounded-2xl shadow border-l-4 border-copper-400 p-5 relative"
            >
              <div class="flex items-center gap-3 mb-1">
                <span class="font-bold text-copper-900 text-lg">{{ note.title }}</span>
                <span class="text-xs text-copper-400 ml-auto">{{ note.date }}</span>
              </div>
              <div class="text-copper-800 mb-2" v-html="note.content"></div>
              <div class="mt-3 text-sm font-medium text-red-500">
                Suppression définitive dans {{ getDaysRemaining(note.deletionDate) }} jours
              </div>
              <button
                @click="restoreNote(note)"
                class="mt-2 px-3 py-1 bg-copper-400 hover:bg-copper-500 text-white rounded-lg text-sm font-medium"
              >
                Restaurer
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
