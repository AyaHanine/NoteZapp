<template>
  <div class="note-card-fixed relative bg-white rounded-2xl shadow p-6 flex flex-col">
    <!-- Étoile favoris en haut à droite -->
    <button
      class="absolute top-4 right-4 focus:outline-none"
      @click.stop="toggleFavorite"
      :aria-label="note.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    >
      <svg
        class="w-7 h-7 transition"
        :class="note.favorite ? 'text-yellow-400' : 'text-copper-300 hover:text-yellow-400'"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path :d="starPath" />
      </svg>
    </button>

    <!-- Contenu note -->
    <h3 class="font-bold text-xl mb-2 text-copper-900 truncate" :title="note.title">{{ note.title }}</h3>
    <div class="text-copper-700 text-sm mb-3">{{ formatDate(note.date) }}</div>
    <div class="flex-1 text-copper-900 note-content" v-html="note.content"></div>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="bg-copper-100 text-copper-700 rounded-xl px-3 py-1 text-xs font-semibold"
      >
        #{{ tag }}
      </span>
    </div>

    <!-- Bouton poubelle en bas à droite -->
    <button
      class="absolute bottom-4 right-4 focus:outline-none"
      @click.stop="deleteNote"
      aria-label="Supprimer la note"
    >
      <svg class="w-6 h-6 text-copper-300 hover:text-red-400 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import axios from "axios"
const props = defineProps(["note"])
const emit = defineEmits(["favorite-updated", "deleted"])

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short"
  })
}

const starPath =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.539 1.118l-3.384-2.46a1 1 0 00-1.175 0l-3.384 2.46c-.783.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118l-3.384-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"

async function toggleFavorite() {
  try {
    const updatedNote = { ...props.note, favorite: !props.note.favorite }
    await axios.patch(`http://localhost:3001/notes/${props.note.id}`, {
      favorite: updatedNote.favorite,
    })
    emit("favorite-updated", updatedNote)
  } catch (e) {
    alert("Erreur lors de la mise à jour du favori")
  }
}

async function deleteNote() {
  
  if (confirm("Supprimer cette note ?")) {
    try {
      await axios.patch(`http://localhost:3001/notes/${props.note.id}`, { deleted: true })
      emit("deleted", props.note.id)
    } catch (e) {
      alert("Erreur lors de la suppression de la note")
    }
  }
}
</script>

<style scoped>
.note-card-fixed {
  width: 370px;
  min-width: 370px;
  max-width: 370px;
  height: 270px;
  min-height: 270px;
  max-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}
.note-content {
  flex: 1 1 auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
