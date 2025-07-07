<template>
  <div class="min-h-screen bg-copper-50 flex items-center justify-center">
    <div class="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-0 overflow-hidden relative">
      <!-- Editor full screen -->
      <div class="p-0">
        <ClientOnly>
          <QuillEditor
            v-model:content="noteContent"
            contentType="html"
            theme="snow"
            toolbar="full"
            class="h-[70vh] min-h-[420px] border-none"
            :placeholder="'Commencez à écrire votre note...'"
          />
        </ClientOnly>
      </div>
      <!-- Ajouter bouton en bas à droite -->
      <button
        class="absolute bottom-8 right-8 bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-3 px-8 rounded-full shadow-xl transition text-lg flex items-center gap-2"
        @click="showStep1 = true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
        Ajouter la note
      </button>
    </div>

    <!-- Etape 1 : Titre + Catégorie -->
    <div v-if="showStep1" class="fixed inset-0 flex items-center justify-center bg-black/30 z-30">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-4">
        <h2 class="font-bold text-xl mb-2 text-copper-900">Complétez votre note</h2>
        <input v-model="noteTitle" placeholder="Titre de la note" class="w-full border-b border-copper-200 py-2 text-lg focus:border-copper-400 focus:outline-none" required />
        <select v-model="noteCategory" class="w-full border-b border-copper-200 py-2 text-base focus:border-copper-400 focus:outline-none" required>
          <option value="" disabled>Sélectionner la catégorie</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <div class="flex justify-end mt-2">
          <button @click="showStep1=false" class="mr-3 text-copper-400 font-semibold">Annuler</button>
          <button
            class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-lg shadow transition"
            :disabled="!noteTitle || !noteCategory"
            @click="showStep2=true"
          >Suivant</button>
        </div>
      </div>
    </div>

    <!-- Etape 2 : Tags optionnels -->
    <div v-if="showStep2" class="fixed inset-0 flex items-center justify-center bg-black/30 z-40">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-4">
        <h2 class="font-bold text-xl mb-2 text-copper-900">Ajouter des tags (optionnel)</h2>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-for="(tag, i) in tags" :key="i" class="bg-copper-100 text-copper-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            {{ tag }}
            <button @click="removeTag(i)" class="ml-1 text-copper-400 hover:text-copper-600">×</button>
          </span>
        </div>
        <input
          v-model="tagInput"
          @keyup.enter.prevent="addTag"
          placeholder="Ajouter un tag puis Entrée"
          class="border-b border-copper-200 py-2 focus:border-copper-400 focus:outline-none"
        />
        <div v-if="noteCategory === 'TaskList'" class="mb-4">
          <h3 class="font-semibold text-copper-900 mb-2">Tâches à réaliser</h3>
          <div class="flex gap-2 mb-2">
            <input v-model="taskInput" @keyup.enter.prevent="addTask" placeholder="Nouvelle tâche" class="border-b border-copper-200 py-2 flex-1 focus:border-copper-400 focus:outline-none" />
            <button @click="addTask" class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold px-4 rounded-lg">Ajouter</button>
          </div>
          <ul>
            <li v-for="(task, i) in taskList" :key="task.id" class="flex items-center gap-2 mb-1">
              <span>{{ task.content }}</span>
              <button @click="removeTask(i)" class="text-copper-400 hover:text-copper-600">×</button>
            </li>
          </ul>
        </div>
        <div class="flex justify-end mt-2">
          <button @click="showStep1=true; showStep2=false" class="mr-3 text-copper-400 font-semibold">Retour</button>
          <button
            class="bg-copper-400 hover:bg-copper-500 text-copper-950 font-bold py-2 px-6 rounded-lg shadow transition"
            @click="submitNote"
          >Ajouter la note</button>
        </div>
        <div v-if="errorMsg" class="text-red-500 text-sm mt-1">{{ errorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from 'vue-router'

const categories = ["Planner", "TaskList", "Thoughts", "Journal", "ClassNotes", "Documents"];
const router = useRouter()

// States éditeur
const noteContent = ref("")
const noteTitle = ref("")
const noteCategory = ref("")
const tags = ref([])
const tagInput = ref("")
const errorMsg = ref("")

// Modal steps
const showStep1 = ref(false)
const showStep2 = ref(false)
const taskList = ref([])
const taskInput = ref("")

// --- GESTION DES TAGS ---
function addTag() {
  const val = tagInput.value.trim()
  if (val && !tags.value.includes(val)) {
    tags.value.push(val)
    tagInput.value = ""
  }
}
function removeTag(i) { tags.value.splice(i, 1) }

// --- GESTION DES TÂCHES ---
function addTask() {
  const val = taskInput.value.trim()
  if (val) {
    taskList.value.push({ id: Date.now(), content: val, completed: false })
    taskInput.value = ""
  }
}
function removeTask(i) { taskList.value.splice(i, 1) }

const userId = localStorage.getItem("userId")

// --- ENVOI ---
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
    // Reset et retour home après 1s
    setTimeout(() => router.push("/"), 900)
  } catch (e) {
    errorMsg.value = "Erreur lors de l'ajout. Réessaie."
  }
}
</script>
