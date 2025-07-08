<template>
  <div class="flex flex-col min-h-screen bg-copper-50">
    <!-- MAIN: éditeur en plein écran -->
    <main class="flex-1 relative flex flex-col overflow-hidden">
      <div class="flex-1 relative">
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
          class="fixed bottom-10 right-10 z-30 bg-copper-500 hover:bg-copper-600 text-copper-950 font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 text-lg flex items-center gap-2 focus:ring-4 focus:ring-copper-300 focus:outline-none active:scale-95"
          @click="showStep1 = true"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
          Ajouter la note
        </button>
      </div>

      <!-- MODALES  -->
      <!-- STEP 1: Titre + Catégorie -->
      <transition name="fade">
        <div v-if="showStep1" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-5 animate-fadein border border-copper-100">
            <h2 class="font-bold text-2xl mb-1 text-copper-900 tracking-tight">Complétez votre note</h2>
            <input
              v-model="noteTitle"
              placeholder="Titre de la note"
              class="w-full border border-copper-200 rounded-xl py-2 px-4 text-lg focus:border-copper-400 focus:outline-none focus:ring-2 focus:ring-copper-100 transition"
              required
              autofocus
            />
            <select
              v-model="noteCategory"
              class="w-full border border-copper-200 rounded-xl py-2 px-4 text-base focus:border-copper-400 focus:outline-none focus:ring-2 focus:ring-copper-100 transition"
              required
            >
              <option value="" disabled>Sélectionner la catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <div class="flex justify-end mt-2 gap-2">
              <button @click="showStep1=false" class="text-copper-400 font-semibold hover:underline">Annuler</button>
              <button
                class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-xl shadow transition-all duration-150 disabled:opacity-50"
                :disabled="!noteTitle || !noteCategory"
                @click="showStep2=true"
              >Suivant</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- STEP 2: Tags + Tasks -->
      <transition name="fade">
        <div v-if="showStep2" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-5 animate-fadein border border-copper-100">
            <h2 class="font-bold text-2xl mb-1 text-copper-900 tracking-tight">Ajouter des tags <span class="text-copper-400 text-base">(optionnel)</span></h2>
            <div class="flex flex-wrap gap-2 min-h-[36px]">
              <span v-for="(tag, i) in tags" :key="i" class="bg-copper-100 text-copper-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm shadow-sm border border-copper-200">
                {{ tag }}
                <button @click="removeTag(i)" class="ml-1 text-copper-400 hover:text-copper-600 font-bold focus:outline-none">×</button>
              </span>
            </div>
            <input
              v-model="tagInput"
              @keyup.enter.prevent="addTag"
              placeholder="Ajouter un tag puis Entrée"
              class="border border-copper-200 rounded-xl py-2 px-4 focus:border-copper-400 focus:outline-none focus:ring-2 focus:ring-copper-100 transition"
            />

            <!-- TaskList: Tasks -->
            <div v-if="noteCategory === 'TaskList'" class="mb-2">
              <h3 class="font-semibold text-copper-900 mb-2 text-lg">Tâches à réaliser</h3>
              <div class="flex gap-2 mb-2">
                <input
                  v-model="taskInput"
                  @keyup.enter.prevent="addTask"
                  placeholder="Nouvelle tâche"
                  class="border border-copper-200 rounded-xl py-2 px-4 flex-1 focus:border-copper-400 focus:outline-none focus:ring-2 focus:ring-copper-100 transition"
                />
                <button @click="addTask" class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold px-5 py-2 rounded-xl shadow">Ajouter</button>
              </div>
              <ul class="space-y-1">
                <li v-for="(task, i) in taskList" :key="task.id" class="flex items-center gap-3 py-1">
                  <span class="flex-1 truncate">{{ task.content }}</span>
                  <button @click="removeTask(i)" class="text-copper-400 hover:text-copper-600 font-bold focus:outline-none">×</button>
                </li>
              </ul>
            </div>

            <div class="flex justify-end mt-2 gap-2">
              <button @click="showStep1=true; showStep2=false" class="text-copper-400 font-semibold hover:underline">Retour</button>
              <button
                class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-xl shadow transition-all duration-150"
                @click="submitNote"
              >Ajouter la note</button>
            </div>
            <div v-if="errorMsg" class="text-red-500 text-sm mt-1 text-center">{{ errorMsg }}</div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<style scoped>

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-fadein { animation: fadeInModal .27s cubic-bezier(.4,0,.2,1); }
@keyframes fadeInModal { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }



</style>

<script setup>
import { ref } from "vue"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"];
const router = useRouter()

const noteContent = ref("")
const noteTitle = ref("")
const noteCategory = ref("")
const tags = ref([])
const tagInput = ref("")
const errorMsg = ref("")

const showStep1 = ref(false)
const showStep2 = ref(false)
const taskList = ref([])
const taskInput = ref("")

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
  }
}
function removeTask(i) { taskList.value.splice(i, 1) }

const userId = localStorage.getItem("userId")

async function submitNote() {
  errorMsg.value = ""
  if (!noteTitle.value || !noteCategory.value) {
    errorMsg.value = "Titre et catégorie obligatoires."
    return
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
    showStep1.value = false
    showStep2.value = false
    setTimeout(() => router.push("/"), 900)
  } catch (e) {
    errorMsg.value = "Erreur lors de l'ajout. Réessaie."
  }
}
</script>
