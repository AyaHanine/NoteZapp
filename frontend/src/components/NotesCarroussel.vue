<template>
  <div class="relative flex items-center justify-center w-full">
    <!-- Flèche gauche -->
    <button
      @click="prev"
      class="absolute left-[-32px] z-10 bg-copper-50 hover:bg-copper-200 transition rounded-full shadow flex items-center justify-center w-10 h-10"
      :disabled="currentStart === 0"
      :class="{ 'opacity-50 cursor-not-allowed': currentStart === 0 }"
      aria-label="Précédent"
    >
      <span class="text-2xl text-copper-400">&lsaquo;</span>
    </button>

    <!-- Les cartes de notes -->
    <div class="flex gap-6 w-full justify-center transition-all duration-200">
      <NoteCard
        v-for="note in visibleNotes"
        :key="note.id"
        :note="note"
        class="flex-shrink-0"
        style="width:370px; min-height:230px;"
      />
    </div>

    <!-- Flèche droite -->
    <button
      @click="next"
      class="absolute right-[-32px] z-10 bg-copper-50 hover:bg-copper-200 transition rounded-full shadow flex items-center justify-center w-10 h-10"
      :disabled="currentStart + maxVisible >= notes.length"
      :class="{ 'opacity-50 cursor-not-allowed': currentStart + maxVisible >= notes.length }"
      aria-label="Suivant"
    >
      <span class="text-2xl text-copper-400">&rsaquo;</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import NoteCard from './NoteCard.vue'

const props = defineProps({
  notes: { type: Array, default: () => [] },
  maxVisible: { type: Number, default: 3 }
})

const currentStart = ref(0)

const visibleNotes = computed(() =>
  props.notes.slice(currentStart.value, currentStart.value + props.maxVisible)
)

function prev() {
  if (currentStart.value > 0) currentStart.value--
}
function next() {
  if (currentStart.value + props.maxVisible < props.notes.length) currentStart.value++
}


watch(() => props.notes, () => { currentStart.value = 0 })
</script>
