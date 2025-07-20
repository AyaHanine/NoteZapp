<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import SidebarCategories from "@/components/SidebarCategories.vue"
import PlannerCalendar from "@/components/PlannerCalendar.vue"

const route = useRoute()
const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"]
const selectedMenu = ref("category")
const selectedCategory = ref(route.params.name)
const notes = ref([])
const loading = ref(true)

import { useRouter } from "vue-router"
const router = useRouter()
function openNote(id) {
  router.push(`/notes/${id}`)
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

onMounted(fetchNotes)

watch(
  () => route.params.name,
  (newName) => {
    selectedCategory.value = newName
    fetchNotes()
  }
)

const userId = localStorage.getItem("userId")

const categoryNotes = computed(() =>
  notes.value.filter(
    n => n.category === selectedCategory.value && !n.deleted && n.userId === userId
  )
)

// Fonction pour cocher/décocher une tâche
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
</script>

<template>
  <div class="flex flex-1 h-full bg-copper-50">
    <SidebarCategories
      :categories="categories"
      :selectedCategory="selectedCategory"
      :selectedMenu="selectedMenu"
    />
    <main class="flex-1 flex flex-col">
      <section class="p-8 max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-copper-900">{{ selectedCategory }}</h1>

        <div v-if="loading" class="text-copper-700 py-10 text-lg">Chargement…</div>

        <div v-else>
          <!-- Affichage spécifique pour Planner -->
            <PlannerCalendar v-if="selectedCategory === 'Planner'" :hide-form="true" />

          <!-- Affichage standard pour les autres catégories -->
          <div v-else>
            <div v-if="categoryNotes.length === 0" class="text-copper-400 mb-4">
              Aucune note dans cette catégorie.
            </div>
            <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div
                v-for="note in categoryNotes"
                :key="note.id"
                :class="[
                  'bg-white rounded-2xl shadow border-l-4 p-5',
                  note.category === 'Planner' ? 'border-copper-400' : 'border-copper-400'
                ]"
                @click="note.category !== 'TaskList' && openNote(note.id)"
              >
                <div class="flex items-center gap-3 mb-1">
                  
                  <span class="font-bold text-copper-900 text-lg">{{ note.title }}</span>
                  <span class="text-xs text-copper-400 ml-auto">{{ note.date }}</span>
                </div>

                <div class="text-copper-800 mb-2" v-html="note.content"></div>

                <ul
                  v-if="note.category === 'TaskList' && Array.isArray(note.taskList)"
                  class="pl-3 space-y-1"
                >
                  <li
                    v-for="task in note.taskList"
                    :key="task.id"
                    class="flex items-center gap-2 text-copper-700"
                  >
                    <input
                      type="checkbox"
                      :checked="task.completed"
                      @change="toggleTask(note, task)"
                      class="accent-copper-500 w-4 h-4"
                    />
                    <span :class="task.completed ? 'line-through text-copper-400' : ''">
                      {{ task.content }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
