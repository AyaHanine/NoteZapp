<template>
  <div>
    <template v-if="groupByCategory">
      <div v-for="cat in categories" :key="cat" class="mb-10">
        <h3 class="text-xl font-bold mb-4 ml-2 mt-8 text-[#6366f1] flex items-center gap-2">
          <span v-if="categoryIcon[cat]" v-html="categoryIcon[cat]" class="inline-block w-7 h-7"></span>
          {{ cat }}
        </h3>
        <div v-if="notesByCategory(cat).length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <NoteCard v-for="note in notesByCategory(cat)" :key="note.id" :note="note" @favorite-updated="updateFavorite" @deleted="removeNoteFromList"/>
        </div>
        <div v-else class="text-gray-400 text-sm ml-3">Aucune note.</div>
      </div>
    </template>
    <template v-else>
      <!-- grilles toujours sur 3 colonnes -->
      <div v-if="notes.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <NoteCard v-for="note in notes" :key="note.id" :note="note" @favorite-updated="updateFavorite" @deleted="removeNoteFromList"/>
      </div>
      <div v-else class="text-gray-400 text-lg mt-16 text-center">
        Aucune note pour cette catégorie.
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NoteCard from "@/components/NoteCard.vue";
const props = defineProps(['notes', 'categories', 'groupByCategory']);
const notes = ref(props.notes || []);

const categoryIcon = {
  Thoughts: `<svg fill="none" stroke="#f59e42" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
  Documents: `<svg fill="none" stroke="#334155" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>`,
  Planner: `<svg fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/></svg>`,
  TaskList: `<svg fill="none" stroke="#22c55e" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3"/></svg>`,
  Journal: `<svg fill="none" stroke="#bb8c7a" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>`,
  ClassNotes: `<svg fill="none" stroke="#6366f1" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7h16M4 11h16M4 15h16"/></svg>`
};

function notesByCategory(cat) {
  return Array.isArray(props.notes)
    ? props.notes.filter(n => n.category === cat)
    : [];
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