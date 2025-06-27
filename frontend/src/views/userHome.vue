<script setup>
import { ref, computed, onMounted } from "vue"
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

const sectionTitle = computed(() => {
  if (selectedMenu.value === "notes") return "Toutes les notes"
  if (selectedMenu.value === "favorites") return "Favoris"
  if (selectedMenu.value === "trash") return "Corbeille"
  if (selectedMenu.value === "category") return selectedCategory.value
  return ""
})

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

function selectCategory(cat) {
  selectedMenu.value = "category"
  selectedCategory.value = cat
}
function showFavorites() {
  selectedMenu.value = "favorites"
}
function showTrash() {
  selectedMenu.value = "trash"
}
function showNotes() {
  selectedMenu.value = "notes"
  selectedCategory.value = "All"
}
function newNote() {
  alert("Nouvelle note (à implémenter)")
}

const filteredNotes = computed(() => {
  if (selectedMenu.value === "notes") {
    return notes.value.filter(note => !note.deleted)
  }
  if (selectedMenu.value === "favorites") {
    return notes.value.filter(note => note.favorite && !note.deleted)
  }
  if (selectedMenu.value === "trash") {
    return notes.value.filter(note => note.deleted)
  }
  if (selectedMenu.value === "category") {
    return notes.value.filter(note => note.category === selectedCategory.value && !note.deleted)
  }
  return []
})

const mainNotes = computed(() =>
  notes.value.filter(
    note =>
      !note.deleted &&
      !["Planner", "TaskList"].includes(note.category)
  )
)
const planningNotes = computed(() =>
  notes.value.filter(
    note =>
      !note.deleted &&
      ["Planner", "TaskList"].includes(note.category)
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

function removeNoteFromList(noteId) {
  notes.value = notes.value.filter(n => n.id !== noteId)
}
</script>

<template>
  <div class="flex flex-1 h-full bg-copper-50">
    <!-- SIDEBAR -->
    <SidebarCategories
      :categories="categories"
      :selectedCategory="selectedCategory"
      :selectedMenu="selectedMenu"
      @select-category="selectCategory"
      @show-favorites="showFavorites"
      @show-trash="showTrash"
      @show-notes="showNotes"
      @new-note="newNote"
    />

    <!-- MAIN -->
   <main class="flex-1 flex flex-col">
      <section class="p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-copper-900">
          {{ sectionTitle }}
        </h1>

        <div v-if="loading" class="text-copper-700 py-10 text-lg">Chargement…</div>

        <!-- CATEGORIES/FAVORIS/CORBEILLE -->
        <template v-if="selectedMenu === 'category' || selectedMenu === 'favorites' || selectedMenu === 'trash'">
          <div>
            <div v-if="filteredNotes.length === 0" class="text-copper-400 mb-4">
              Aucune note trouvée.
            </div>
            <!-- 3 notes par ligne même en corbeille -->
            <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <NoteCard
                v-for="note in filteredNotes"
                :key="note.id"
                :note="note"
                @favorite-updated="updateFavorite"
                @deleted="removeNoteFromList"
              />
            </div>
          </div>
        </template>

        <!-- TOUTES NOTES -->
        <template v-else>
          <div class="mb-7">
            <NotesCarroussel :notes="mainNotes" @favorite-updated="updateFavorite" @deleted="removeNoteFromList" />
          </div>

          <div class="w-full flex items-center my-7">
            <div class="flex-1 border-t border-copper-200"></div>
            <span class="mx-6 text-copper-200 font-bold text-lg select-none">●</span>
            <div class="flex-1 border-t border-copper-200"></div>
          </div>

          <!-- Scratchpad + TaskList/Planner-->
          <div class="flex gap-6 w-full max-w-7xl mx-auto mt-3">
            <!-- Scratch Pad -->
            <div class="max-w-[410px] w-full">
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
                  <div class="flex justify-end text-copper-700 font-bold mt-1">{{ scratchText.length }}/600</div>
                </div>
              </div>
            </div>
            <!-- TaskList/Planner à droite -->
            <div class="max-w-[390px] w-full flex flex-col gap-5">
              <div
                v-for="note in planningNotes"
                :key="note.id"
                class="bg-white rounded-2xl shadow border-l-4 border-copper-400 p-5 mb-3"
              >
                <div class="flex items-center gap-3 mb-1">
                  <span class="text-copper-500 text-xl">
                    {{ note.category === 'TaskList' ? '✅' : '📅' }}
                  </span>
                  <span class="font-bold text-copper-900 text-lg">
                    {{ note.title }}
                  </span>
                  <span class="text-xs text-copper-400 ml-auto">{{ formatDate(note.date) }}</span>
                </div>
                <div class="text-copper-800 mb-2">{{ note.content }}</div>
                <ul v-if="note.category === 'TaskList'" class="pl-3 space-y-1">
                  <li
                    v-for="task in note.taskList"
                    :key="task.id"
                    class="flex items-center gap-2 text-copper-700"
                  >
                    <span
                      class="w-4 h-4 inline-block rounded-full border border-copper-500 mr-1"
                      :class="task.completed ? 'bg-copper-500' : 'bg-white'"
                    ></span>
                    <span :class="task.completed ? 'line-through text-copper-400' : ''">
                      {{ task.content }}
                    </span>
                  </li>
                </ul>
              </div>
              <div v-if="planningNotes.length === 0" class="text-copper-400 px-4 py-8">
                Aucun planning ou liste à afficher.
              </div>
            </div>
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
