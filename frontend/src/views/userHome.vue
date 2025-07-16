<script setup>
import PlannerCalendar from "@/components/PlannerCalendar.vue"
import { ref, computed, onMounted, watch } from "vue"
import axios from "axios"
import SidebarCategories from "@/components/SidebarCategories.vue"
import NoteCard from "@/components/NoteCard.vue"
import NotesCarroussel from "@/components/NotesCarroussel.vue"

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"]
const selectedMenu = ref("notes")
const selectedCategory = ref("All")
const notes = ref([])
const loading = ref(true)
const scratchText = ref("")
const searchQuery = ref("")

defineProps({ note: Object })

const sectionTitle = computed(() => {
  if (selectedMenu.value === "notes") return "Toutes les notes"
  if (selectedMenu.value === "favorites") return "Favoris"
  if (selectedMenu.value === "category") return selectedCategory.value
  return ""
})

async function toggleTask(note, task) {
  const updatedTaskList = note.taskList.map(t =>
    t.id === task.id ? { ...t, completed: !t.completed } : t
  )
  try {
    await axios.patch(`http://localhost:3001/notes/${note.id}`, {
      taskList: updatedTaskList
    })
    task.completed = !task.completed
  } catch (e) {
    console.error("Erreur lors de la mise à jour de la tâche :", e)
  }
}

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

onMounted(() => {
  fetchNotes()
  const saved = localStorage.getItem("scratchpad_text")
  if (saved) {
    scratchText.value = saved
  }
})

watch(scratchText, (newValue) => {
  localStorage.setItem("scratchpad_text", newValue)
})

function showNotes() {
  selectedMenu.value = "notes"
  selectedCategory.value = "All"
}
function newNote() {
  alert("Nouvelle note (à implémenter)")
}

const userId = localStorage.getItem("userId")

const filteredNotes = computed(() => {
  let arr = []
  if (selectedMenu.value === "notes") {
    arr = notes.value.filter(note => !note.deleted && note.userId === userId)
  }
  if (selectedMenu.value === "favorites") {
    arr = notes.value.filter(note => note.favorite && !note.deleted && note.userId === userId)
  }
if (selectedMenu.value === "category") {
  arr = notes.value.filter(
    note => note.category === selectedCategory.value && !note.deleted && note.userId === userId
  )
}
  if (searchQuery.value && arr.length) {
    const q = searchQuery.value.toLowerCase()
    arr = arr.filter(note => {
      const inTitle = note.title?.toLowerCase().includes(q)
      const inContent = note.content?.toLowerCase().includes(q)
      const inTags = Array.isArray(note.tags) && note.tags.some(tag => tag.toLowerCase().includes(q))
      return inTitle || inContent || inTags
    })
  }
  return arr.slice().sort((a, b) => {
    if ((a.pinned || false) === (b.pinned || false)) {
      return new Date(b.date) - new Date(a.date)
    }
    return (b.pinned || false) - (a.pinned || false)
  })
})

const mainNotes = computed(() =>
  notes.value
    .filter(
      note =>
        !note.deleted &&
        !["Planner", "TaskList"].includes(note.category) &&
        note.userId === userId
    )
    .slice().sort((a, b) => {
    if ((a.pinned || false) === (b.pinned || false)) {
      return new Date(b.date) - new Date(a.date)
    }
    return (b.pinned || false) - (a.pinned || false)
  })
)

const plannerNotes = computed(() =>
  notes.value.filter(
    note => !note.deleted && note.category === "Planner" && note.userId === userId
  )
)

const taskListNotes = computed(() =>
  notes.value.filter(
    note => !note.deleted && note.category === "TaskList" && note.userId === userId
  )
)

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: undefined
  })
}

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
      @show-notes="showNotes"
      @new-note="newNote"
    />

    <main class="flex-1 flex flex-col">
      <section class="p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-copper-900">
          {{ sectionTitle }}
        </h1>

        <div v-if="loading" class="text-copper-700 py-10 text-lg">Chargement…</div>

        <template v-if="selectedMenu === 'category' || selectedMenu === 'favorites'">
          <div>
            <div v-if="filteredNotes.length === 0" class="text-copper-400 mb-4">
              Aucune note trouvée.
            </div>
            <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <NoteCard
                v-for="note in filteredNotes"
                :key="note.id"
                :note="note"
                @favorite-updated="updateFavorite"
                @pin-updated="updatePin"
                @deleted="removeNoteFromList"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <div class="mb-7">
            <NotesCarroussel
              :notes="mainNotes"
              @favorite-updated="updateFavorite"
              @pin-updated="updatePin"
              @deleted="removeNoteFromList"
            />
          </div>

          <div class="w-full flex items-center my-7">
            <div class="flex-1 border-t border-copper-200"></div>
            <span class="mx-6 text-copper-200 font-bold text-lg select-none">●</span>
            <div class="flex-1 border-t border-copper-200"></div>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
            <!-- 📝 SCRATCH PAD -->
            <div class="xl:col-span-1">
              <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-3">
                <div class="bg-white px-7 pt-5 pb-2 flex items-center justify-between">
                  <span class="text-xl font-bold text-copper-900">Scratch Pad</span>
                  <span class="inline-flex items-center justify-center w-7 h-7 rounded-full text-copper-400 text-xl bg-copper-50 border border-copper-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>
                  </span>
                </div>
                <div class="bg-copper-400/60 px-7 pb-6 pt-3">
                  <textarea
                    class="w-full bg-transparent text-copper-800 font-semibold text-lg border-none focus:ring-0 placeholder-copper-700/70 resize-none outline-none"
                    rows="5"
                    maxlength="600"
                    placeholder="Écrivez une idée, un rappel rapide…"
                    v-model="scratchText"
                  ></textarea>
                  <div class="flex justify-end mt-2 text-copper-700 font-bold">
                    {{ scratchText.length }}/600
                  </div>
                </div>
              </div>
            </div>

            <!-- TASKLIST -->
            <div class="xl:col-span-1">
              <div class="flex flex-col gap-3">
                <h2 class="text-xl font-bold text-copper-800">Listes de tâches</h2>
                <div v-for="note in taskListNotes" :key="note.id" class="bg-white rounded-2xl shadow border-l-4 border-copper-400 p-5">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-bold text-copper-900 text-lg">{{ note.title }}</span>
                        <span class="text-xs text-copper-400 ml-auto">{{ formatDate(note.date) }}</span>
                      </div>
                      <div class="text-copper-800 mb-2">{{ note.content }}</div>
                        <ul class="pl-3 space-y-1">
                          <li v-for="task in note.taskList" :key="task.id" class="flex items-center gap-2 text-copper-700">
                            <input type="checkbox" :checked="task.completed" @change="toggleTask(note, task)" class="accent-copper-500 w-4 h-4" />
                            <span :class="task.completed ? 'line-through text-copper-400' : ''">{{ task.content }}</span>
                          </li>
                        </ul>
                </div>   
              </div>
           </div>
            <!-- PLANNER -->
              <div class="xl:col-span-1">
                <div class="flex flex-col gap-3">
                  <h2 class="text-xl font-bold text-copper-800">Plannings</h2>
                  <div class="bg-white rounded-xl shadow overflow-hidden p-3">
                        <PlannerCalendar :hide-form="true" :mini="true" :scrollable="true" />
                  </div>
                </div>
              </div>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
