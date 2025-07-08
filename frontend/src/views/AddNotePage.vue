<template>
  <div class="flex flex-col min-h-screen bg-copper-50 relative">
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Editeur  -->
      <div
        class="flex-1 relative transition-all duration-300"
        :class="{
          'pointer-events-none blur-[3px] brightness-90 select-none': showCategoryModal,
          'hidden': noteCategory === 'TaskList' || noteCategory === 'Planner'
        }"
      >
        <ClientOnly>
          <QuillEditor
            v-model:content="noteContent"
            contentType="html"
            theme="snow"
            toolbar="full"
            class="w-full h-full min-h-[420px] border-none bg-transparent"
            :placeholder="'Commencez à écrire votre note...'"
          />
        </ClientOnly>
        <!-- Floating bouton ajout -->
        <button
          v-if="['Thoughts','Journal','ClassNotes','Documents'].includes(noteCategory)"
          class="fixed bottom-10 right-10 z-30 bg-copper-500 hover:bg-copper-600 text-copper-950 font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 text-lg flex items-center gap-2 focus:ring-4 focus:ring-copper-300 focus:outline-none active:scale-95"
          @click="showNoteModal = true"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
          Ajouter la note
        </button>
      </div>

      <!-- TaskList UI -->
        <div v-if="noteCategory === 'TaskList'" class="flex flex-col items-center min-h-screen bg-copper-50 py-8">
    <div class="w-full max-w-md bg-white rounded-t-2xl shadow flex flex-col border-x border-t border-copper-100 relative">
      <!-- Header style mobile -->
      <div class="flex items-center justify-center h-20 relative border-b border-copper-100">
        <span class="text-xl font-bold tracking-tight text-copper-900">Task list</span>
        <!-- Bouton flottant + pour ajouter une tâche -->
        <button
          class="absolute right-6 top-1/2 -translate-y-1/2 bg-copper-100 hover:bg-copper-400 text-copper-700 hover:text-copper-950 rounded-full shadow p-2 transition border border-copper-300"
          @click="showAddTask = true"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>

      <!-- Liste des tâches -->
      <ul v-if="taskList.length > 0" class="divide-y divide-copper-100">
        <li
          v-for="(task, i) in taskList"
          :key="task.id"
          class="flex items-center px-6 py-5 group bg-white"
        >
        
          <button
            class="w-6 h-6 flex-shrink-0 rounded border-2 border-copper-300 flex items-center justify-center mr-4 focus:outline-none focus:ring"
            
          >
            <svg v-if="task.completed" class="w-5 h-5 text-copper-500" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          </button>
          <div class="flex-1 min-w-0">
            <span
              class="block text-base leading-tight font-medium transition"
            >
              {{ task.content }}
            </span>
           
          </div>
          <button
            class="ml-2 opacity-80 hover:opacity-100 focus:outline-none transition"
            title="Supprimer"
            @click="removeTask(i)"
          >
            <svg class="w-6 h-6 text-red-500 hover:scale-110 transition" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <path d="M3 6h18M9 6v12m6-12v12M5 6l1 14c.1.8.8 1.4 1.6 1.4h8.8c.8 0 1.5-.6 1.6-1.4l1-14" />
            </svg>
          </button>
        </li>
      </ul>
      <!-- S'il n'y a aucune tâche -->
      <div v-else class="flex flex-col items-center py-16 text-copper-300">
        <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#d1bfa4"/>
          <path d="M9 12h6" stroke="#d1bfa4" stroke-linecap="round"/>
        </svg>
        <span class="mb-6 text-lg font-medium">Aucune tâche pour l’instant</span>
        <button
          class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-full shadow transition flex items-center gap-2 text-base"
          @click="showAddTask = true"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
          Ajouter une tâche
        </button>
      </div>
    </div>

    <!-- Bouton flottant pour enregistrer (titre/tags) -->
    <button
      class="fixed bottom-10 right-10 z-30 bg-copper-500 hover:bg-copper-600 text-copper-950 font-bold py-3 px-8 rounded-full shadow-xl transition text-lg flex items-center gap-2 focus:ring-4 focus:ring-copper-300"
      @click="showNoteModal = true"
      v-if="taskList.length > 0"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
      Enregistrer
    </button>

    <!-- MODALE AJOUT TACHE -->
    <transition name="fade">
      <div v-if="showAddTask" class="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col gap-5 animate-fadein border border-copper-100">
          <h2 class="font-bold text-lg mb-1 text-copper-900 tracking-tight text-center">Nouvelle tâche</h2>
          <input
            v-model="taskInput"
            @keyup.enter.prevent="addTask"
            placeholder="Intitulé de la tâche"
            class="border border-copper-200 rounded-xl py-2 px-4 text-lg focus:border-copper-400 focus:outline-none"
            autofocus
          />
          <div class="flex justify-end gap-2 mt-2">
            <button @click="showAddTask = false" class="text-copper-400 font-semibold hover:underline">Annuler</button>
            <button
              class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-xl shadow transition"
              :disabled="!taskInput.trim()"
              @click="addTask"
            >Ajouter</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- MODALE AJOUT TITRE + TAGS -->
    <transition name="fade">
      <div v-if="showNoteModal" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[1.5px]">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-6 animate-fadein border border-copper-100">
          <h2 class="font-bold text-2xl mb-1 text-copper-900 text-center">Nouvelle liste de tâches</h2>
          <input
            v-model="noteTitle"
            placeholder="Titre de la liste"
            class="w-full border border-copper-200 rounded-xl py-2 px-4 text-lg focus:border-copper-400 focus:outline-none"
            required
          />
          <div class="flex flex-wrap gap-2 items-center">
            <span v-for="(tag, i) in tags" :key="i" class="bg-copper-100 text-copper-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-sm border border-copper-200">
              {{ tag }}
              <button @click="removeTag(i)" type="button" class="ml-1 text-copper-400 hover:text-copper-600 font-bold focus:outline-none">×</button>
            </span>
            <input
              v-model="tagInput"
              @keyup.enter.prevent="addTag"
              placeholder="Ajouter un tag puis Entrée"
              class="border border-copper-200 rounded-xl py-2 px-4 focus:border-copper-400 focus:outline-none max-w-xs"
            />
          </div>
          <div class="flex justify-end gap-2 mt-2">
            <button @click="showNoteModal = false" class="text-copper-400 font-semibold hover:underline">Annuler</button>
            <button
              class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-xl shadow transition"
              :disabled="!noteTitle"
              @click="handleSubmit"
            >Enregistrer</button>
          </div>
          <div v-if="errorMsg" class="text-red-500 text-sm mt-1 text-center">{{ errorMsg }}</div>
        </div>
      </div>
    </transition>
  </div>

      <!-- Planner à venir -->
      <div v-if="noteCategory === 'Planner'" class="flex-1 flex flex-col items-center justify-center py-10 text-copper-400 text-2xl font-semibold">
        <PlannerCalendar />
      </div>

      <!-- MODALE CHOIX CATÉGORIE -->
      <transition name="fade">
        <div v-if="showCategoryModal" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[1.5px]">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-8 animate-fadein border border-copper-100">
            <h2 class="font-bold text-2xl text-copper-900 text-center mb-2">Choisissez une catégorie</h2>
            <div class="flex flex-wrap justify-center gap-4">
              <button
                v-for="cat in categories"
                :key="cat"
                class="bg-copper-50 hover:bg-copper-400 hover:text-copper-950 text-copper-700 px-5 py-2 rounded-xl font-semibold border border-copper-200 shadow transition"
                @click="selectCategory(cat)"
              >
                {{ categoriesLabels[cat] }}
              </button>
            </div>
            <div class="flex justify-center mt-2">
              <button @click="resetCategory" class="text-copper-400 font-semibold hover:underline">Annuler</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- MODALE AJOUT NOTE (titre + tags) : seulement pour notes classiques -->
      <transition name="fade">
        <div v-if="showNoteModal" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-[1.5px]">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-6 animate-fadein border border-copper-100">
            <h2 class="font-bold text-2xl mb-1 text-copper-900 text-center">Nouvelle note</h2>
            <input
              v-model="noteTitle"
              placeholder="Titre de la note"
              class="w-full border border-copper-200 rounded-xl py-2 px-4 text-lg focus:border-copper-400 focus:outline-none"
              required
              autofocus
            />
            <div class="flex flex-wrap gap-2 items-center">
              <span v-for="(tag, i) in tags" :key="i" class="bg-copper-100 text-copper-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-sm border border-copper-200">
                {{ tag }}
                <button @click="removeTag(i)" type="button" class="ml-1 text-copper-400 hover:text-copper-600 font-bold focus:outline-none">×</button>
              </span>
              <input
                v-model="tagInput"
                @keyup.enter.prevent="addTag"
                placeholder="Ajouter un tag puis Entrée"
                class="border border-copper-200 rounded-xl py-2 px-4 focus:border-copper-400 focus:outline-none max-w-xs"
              />
            </div>
            <div class="flex justify-end gap-2 mt-2">
              <button @click="showNoteModal = false" class="text-copper-400 font-semibold hover:underline">Annuler</button>
              <button
                class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-xl shadow transition-all duration-150"
                :disabled="!noteTitle"
                @click="submitNote"
              >Enregistrer</button>
            </div>
            <div v-if="errorMsg" class="text-red-500 text-sm mt-1 text-center">{{ errorMsg }}</div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'
import PlannerCalendar from "@/components/PlannerCalendar.vue";

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"];
const categoriesLabels = {
  Planner: "Planner",
  TaskList: "TaskList",
  Thoughts: "Thoughts",
  Journal: "Journal",
  ClassNotes: "Class Notes",
  Documents: "Documents"
};
const router = useRouter()

const noteContent = ref("")
const noteTitle = ref("")
const noteCategory = ref("")
const tags = ref([])
const tagInput = ref("")
const errorMsg = ref("")
const taskList = ref([])
const taskInput = ref("")
const showAddTask = ref(false)


const showCategoryModal = ref(true)
const showNoteModal = ref(false)

function resetCategory() {
  noteCategory.value = ""
  showCategoryModal.value = false
  noteTitle.value = ""
  tags.value = []
  tagInput.value = ""
  noteContent.value = ""
  taskList.value = []
  taskInput.value = ""
}
function selectCategory(cat) {
  noteCategory.value = cat
  showCategoryModal.value = false
  noteTitle.value = ""
  tags.value = []
  tagInput.value = ""
  noteContent.value = ""
  taskList.value = []
  taskInput.value = ""
}

function addTag() {
  const val = tagInput.value.trim()
  if (val && !tags.value.includes(val)) {
    tags.value.push(val)
    tagInput.value = ""
    
  }
}

function removeTag(i) { tags.value.splice(i, 1) }

function addTask() {
  const val = taskInput.value.trim()
  if (val) {
    taskList.value.push({ id: Date.now(), content: val, completed: false })
    taskInput.value = ""
    showAddTask.value = false
  }
}

function removeTask(i) { taskList.value.splice(i, 1) }

const userId = localStorage.getItem("userId")

async function submitNote() {
  errorMsg.value = ""
  // Pour TaskList : tous les champs
  if (noteCategory.value === "TaskList") {
    if (!noteTitle.value || taskList.value.length === 0) {
      errorMsg.value = "Tous les champs sont obligatoires."
      return
    }
  }
  // Pour notes classiques
  if (["Thoughts", "Journal", "ClassNotes", "Documents"].includes(noteCategory.value)) {
    if (!noteTitle.value || !noteContent.value) {
      errorMsg.value = "Tous les champs sont obligatoires."
      return
    }
  }
  try {
    await fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: noteTitle.value,
        category: noteCategory.value,
        content: noteContent.value,
        tags: tags.value,
        date: new Date().toISOString(),
        userId: userId,
        ...(noteCategory.value === "TaskList" ? { taskList: taskList.value } : {})
      })
    });
    noteContent.value = ""
    noteTitle.value = ""
    noteCategory.value = ""
    tags.value = []
    tagInput.value = ""
    taskList.value = []
    taskInput.value = ""
    showNoteModal.value = false
    showCategoryModal.value = true
    setTimeout(() => router.push("/"), 900)
  } catch (e) {
    errorMsg.value = "Erreur lors de l'ajout. Réessaie."
  }
}

// Réinitialise le contenu de l'éditeur si on change de catégorie
watch(noteCategory, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    noteContent.value = ""
    noteTitle.value = ""
    tags.value = []
    tagInput.value = ""
    taskList.value = []
    taskInput.value = ""
    showNoteModal.value = false
    errorMsg.value = ""
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fadein { animation: fadeInModal .27s cubic-bezier(.4,0,.2,1); }
@keyframes fadeInModal { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }
</style>
